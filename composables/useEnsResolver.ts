import { ref, computed } from 'vue';
import { createPublicClient, http, type Address, fallback } from 'viem';
import { mainnet } from 'viem/chains';

// Get custom RPC URL from runtime config if available
const getTransport = () => {
  // Check if running in Nuxt context
  if (import.meta.client && typeof window !== 'undefined') {
    // Try to get custom RPC from window config (can be set via nuxt.config.ts)
    const customRpc = (window as any).__NUXT__?.config?.public?.ethRpcUrl;
    
    if (customRpc) {
      console.log('🔗 Using custom RPC endpoint for ENS resolution');
      return http(customRpc, {
        batch: {
          multicall: {
            batchSize: 100,
            wait: 100,
          },
        },
      });
    }
  }
  
  // Fallback to multiple public CORS-friendly RPC endpoints
  // Viem will automatically try the next endpoint if one fails
  return fallback([
    http('https://rpc.ankr.com/eth'),
    http('https://ethereum-rpc.publicnode.com'),
    http('https://eth.llamarpc.com'),
    http('https://cloudflare-eth.com'),
  ], {
    rank: false, // Try in order
  });
};

// Multiple CORS-friendly RPC endpoints with fallback
// Viem will automatically try the next endpoint if one fails
const publicClient = createPublicClient({
  chain: mainnet,
  transport: getTransport(),
  batch: {
    multicall: {
      batchSize: 100,
      wait: 100,
    },
  },
});

// Cache for resolved ENS names: address -> ENS name
const ensCache = ref<Record<string, string | null>>({});

// Loading state for batch resolution
const isResolving = ref(false);

// Stats for debugging
const stats = ref({
  resolved: 0,
  failed: 0,
  cached: 0,
  total: 0,
});

/**
 * Resolve ENS names for a batch of addresses
 * This function leverages viem's automatic multicall batching
 * Addresses should be pre-sorted by priority (e.g., by holder count)
 * to ensure visible addresses resolve first
 */
export async function resolveBatchEns(addresses: string[]): Promise<void> {
  if (!addresses || addresses.length === 0) return;

  // Filter out addresses we've already checked
  const uncachedAddresses = addresses.filter(addr => {
    const normalized = addr.toLowerCase();
    return !(normalized in ensCache.value);
  });

  if (uncachedAddresses.length === 0) return;

  isResolving.value = true;
  stats.value.total += uncachedAddresses.length;

  // Process in batches of 100 to maintain order and provide progress
  const batchSize = 100;
  const batches = [];
  
  for (let i = 0; i < uncachedAddresses.length; i += batchSize) {
    batches.push(uncachedAddresses.slice(i, i + batchSize));
  }

  console.log(`🔍 Resolving ENS names for ${uncachedAddresses.length} unique addresses (${batches.length} batches)...`);

  try {
    // Process batches sequentially to maintain priority order
    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];
      console.log(`  ⏳ Batch ${batchIndex + 1}/${batches.length}: Resolving ${batch.length} addresses...`);
      
      // Create promises for this batch
      const batchPromises = batch.map(async (address) => {
        const normalized = address.toLowerCase();
        
        try {
          // viem will batch these calls automatically via multicall
          const ensName = await publicClient.getEnsName({ 
            address: normalized as Address 
          });
          
          ensCache.value[normalized] = ensName;
          
          if (ensName) {
            stats.value.resolved++;
          } else {
            stats.value.failed++;
          }
        } catch (error: any) {
          // No ENS name or error - cache as null
          ensCache.value[normalized] = null;
          stats.value.failed++;
          
          // Log CORS errors more prominently (but only once per batch)
          if (batchIndex === 0 && (error.message?.includes('CORS') || error.message?.includes('fetch'))) {
            console.error('🚨 RPC CORS Error - ENS resolution may not work:', error.message);
            console.info('💡 See RPC_CONFIGURATION.md for solutions');
          }
        }
      });

      // Wait for this batch to complete before starting next
      await Promise.all(batchPromises);
      
      const resolvedInBatch = batch.filter(addr => ensCache.value[addr.toLowerCase()] !== null).length;
      console.log(`  ✓ Batch ${batchIndex + 1}/${batches.length} complete (${resolvedInBatch} ENS names found)`);
    }
    
    console.log(`✓ ENS resolution complete (${stats.value.resolved} ENS names total)`);
  } finally {
    isResolving.value = false;
  }
}

/**
 * Get ENS name for a single address (uses cache)
 */
export function getEnsName(address: string | null | undefined): string | null {
  if (!address) return null;
  const normalized = address.toLowerCase();
  return ensCache.value[normalized] ?? null;
}

/**
 * Check if an address has a cached ENS name
 */
export function hasEnsName(address: string | null | undefined): boolean {
  if (!address) return false;
  const normalized = address.toLowerCase();
  return ensCache.value[normalized] !== null && ensCache.value[normalized] !== undefined;
}

/**
 * Shorten an Ethereum address for display
 */
export function shortenAddress(address: string): string {
  if (!address) return '';
  if (address.length < 13) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Get display name: ENS if available, otherwise shortened address
 */
export function getDisplayName(address: string | null | undefined): string {
  if (!address) return '';
  
  const ensName = getEnsName(address);
  if (ensName) return ensName;
  
  return shortenAddress(address);
}

/**
 * Check if a string matches an address (partial match for filtering)
 */
export function matchesAddress(address: string, searchTerm: string): boolean {
  if (!address || !searchTerm) return false;
  
  const normalized = address.toLowerCase();
  const search = searchTerm.toLowerCase().trim();
  
  // Check if address matches
  if (normalized.includes(search)) return true;
  
  // Check if ENS name matches
  const ensName = getEnsName(address);
  if (ensName && ensName.toLowerCase().includes(search)) return true;
  
  return false;
}

/**
 * Sort addresses with ENS names first, then by address
 */
export function sortAddressesByEns(addresses: string[]): string[] {
  return [...addresses].sort((a, b) => {
    const ensA = getEnsName(a);
    const ensB = getEnsName(b);
    
    // ENS names come first
    if (ensA && !ensB) return -1;
    if (!ensA && ensB) return 1;
    
    // Both have ENS: sort alphabetically by ENS name
    if (ensA && ensB) {
      return ensA.localeCompare(ensB);
    }
    
    // Neither has ENS: sort by address
    return a.localeCompare(b);
  });
}

/**
 * Clear the ENS cache (useful for testing)
 */
export function clearEnsCache(): void {
  ensCache.value = {};
  stats.value = {
    resolved: 0,
    failed: 0,
    cached: 0,
    total: 0,
  };
}

/**
 * Composable hook for ENS resolution
 */
export function useEnsResolver() {
  return {
    ensCache: computed(() => ensCache.value),
    isResolving: computed(() => isResolving.value),
    stats: computed(() => stats.value),
    resolveBatchEns,
    getEnsName,
    hasEnsName,
    shortenAddress,
    getDisplayName,
    matchesAddress,
    sortAddressesByEns,
    clearEnsCache,
  };
}

