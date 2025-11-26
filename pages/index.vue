<template>
  <div :class="isMuseumMode ? 'w-full min-h-screen p-4 pt-20' : 'container'">
    <!-- Overlay when filters are shown in museum mode (for mobile/tablet) -->
    <div
      v-if="isMuseumMode && showFiltersInMuseum"
      @click="showFiltersInMuseum = false"
      class="fixed inset-0 bg-black/50 z-30 md:hidden"
    ></div>

    <!-- Museum Mode Controls - Floating -->
    <div v-if="isMuseumMode" class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 md:gap-6 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg px-3 md:px-6 py-3 shadow-2xl animate-in fade-in duration-300 max-w-[95vw] overflow-x-auto">
      <!-- Left Side: Filter, Zoom, Quality -->
      <div class="flex items-center gap-2 md:gap-4">
        <!-- Filters Toggle Button -->
        <button
          @click="showFiltersInMuseum = !showFiltersInMuseum"
          class="rounded-md p-2 transition-colors border"
          :class="showFiltersInMuseum ? 'text-white hover:text-white hover:bg-white/20 border-white/40' : 'text-white/70 hover:text-white hover:bg-white/10 border-white/20'"
          :title="showFiltersInMuseum ? 'Hide Filters' : 'Show Filters'"
        >
          <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <!-- Filter Icon -->
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>

        <!-- Zoom Slider -->
        <div class="flex items-center gap-2 md:gap-3">
          <label class="text-sm text-white/70 whitespace-nowrap hidden md:inline">Zoom</label>
          <input
            type="range"
            v-model.number="zoomLevel"
            min="0"
            max="100"
            step="5"
            class="w-24 md:w-48 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
          />
          <span class="text-xs text-white/50 w-8 md:w-10">{{ zoomLevel }}%</span>
        </div>

        <!-- Quality Toggle Button -->
        <button
          @click="toggleQuality"
          class="rounded-md px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 border border-white/20 transition-colors whitespace-nowrap"
          :title="`Quality: ${qualityLabel} (click to change)`"
        >
          {{ qualityLabel }}
        </button>
      </div>

      <!-- Divider -->
      <div class="h-8 w-px bg-white/20"></div>

      <!-- Right Side: Easter Egg, Exit -->
      <div class="flex items-center gap-2 md:gap-4">
        <!-- Easter Egg Toggle Button -->
        <button
          @click="toggleEasterEgg"
          class="rounded-md p-2 transition-colors"
          :class="easterEggActive ? 'text-purple-400 hover:text-purple-300 hover:bg-purple-500/10' : 'text-white/30 hover:text-white/50 hover:bg-white/5'"
          :title="easterEggActive ? '✨ Hover Mode: Active' : '✨ Hover Mode: Inactive'"
        >
          <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <!-- Magic Wand / Sparkles Icon -->
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </button>

        <!-- Exit Museum Mode Button -->
        <button
          @click="toggleMuseumMode(false)"
          class="rounded-md p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          title="Exit Museum Mode & Fullscreen"
        >
          <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Control Bar - Sticky to top (above both filters and grid) -->
    <div v-show="!isMuseumMode" class="sticky top-0 z-30 mb-4 flex items-center justify-between gap-2 md:gap-4 bg-black/95 backdrop-blur-sm py-3 px-2 md:px-4 border-b border-white/10 overflow-x-auto">
      <!-- Left Side: Filter, Zoom, Quality -->
      <div class="flex items-center gap-2 md:gap-4">
        <!-- Filters Toggle Button -->
        <button
          @click="showFiltersInNormal = !showFiltersInNormal"
          class="rounded-md p-2 transition-colors border hidden md:flex"
          :class="showFiltersInNormal ? 'text-white hover:text-white hover:bg-white/20 border-white/40' : 'text-white/70 hover:text-white hover:bg-white/10 border-white/20'"
          :title="showFiltersInNormal ? 'Hide Filters' : 'Show Filters'"
        >
          <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <!-- Filter Icon -->
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>

        <!-- Zoom Slider -->
        <div class="flex items-center gap-2 md:gap-3 min-w-[120px] md:min-w-[200px]">
          <label class="text-sm text-white/70 whitespace-nowrap hidden md:inline">Zoom</label>
          <input
            type="range"
            v-model.number="zoomLevel"
            min="0"
            max="100"
            step="5"
            class="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
          />
          <span class="text-xs text-white/50 w-8 md:w-10">{{ zoomLevel }}%</span>
        </div>

        <!-- Quality Toggle Button -->
        <button
          @click="toggleQuality"
          class="rounded-md px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 border border-white/10 transition-colors whitespace-nowrap"
          :title="`Quality: ${qualityLabel} (click to change)`"
        >
          {{ qualityLabel }}
        </button>
      </div>

      <!-- Right Side: Easter Egg, Fullscreen, Sort -->
      <div class="flex items-center gap-2 md:gap-4">
        <!-- Easter Egg Toggle Button -->
        <button
          @click="toggleEasterEgg"
          class="rounded-md p-2 border transition-colors"
          :class="easterEggActive ? 'text-purple-400 border-purple-400/50 hover:text-purple-300 hover:bg-purple-500/10 hover:border-purple-400' : 'text-white/30 border-white/10 hover:text-white/50 hover:bg-white/5'"
          :title="easterEggActive ? '✨ Hover Mode: Active (click to disable)' : '✨ Hover Mode: Inactive (click to enable)'"
        >
          <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <!-- Magic Wand / Sparkles Icon -->
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </button>

        <!-- Museum Mode Toggle Button -->
        <button
          @click="toggleMuseumMode(true)"
          class="rounded-md p-2 text-white/70 hover:text-white hover:bg-white/10 border border-white/10 transition-colors"
          title="Enter Museum Mode & Fullscreen"
        >
          <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <!-- Expand/Fullscreen Icon -->
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>

        <!-- Sort Dropdown -->
        <select
          v-model="filters.sortOrder"
          class="rounded-md border border-white/10 bg-neutral-900 px-3 py-2 text-sm text-white/70 focus:border-white/30 focus:outline-none"
          @change="handleFiltersUpdate(filters)"
        >
          <option value="random">rand</option>
          <option value="asc">asc</option>
          <option value="desc">desc</option>
        </select>
      </div>
    </div>

    <div class="relative flex flex-col md:flex-row">
      <!-- Filter Sidebar -->
      <div
        class="shrink-0 border-white/10 p-4 transition-all duration-300 ease-in-out"
        :class="{
          // Width classes
          'w-64': !isMuseumMode,
          'w-80': isMuseumMode && showFiltersInMuseum,
          // Museum mode styles - higher z-index to be above overlay, wider sidebar
          'fixed inset-y-0 left-0 z-40 overflow-y-auto bg-black/95 backdrop-blur-sm border-r border-white/20 shadow-2xl': isMuseumMode && showFiltersInMuseum,
          // Normal mode mobile styles - show when mobile menu is open
          'fixed inset-y-0 left-0 z-50 w-full max-w-xs overflow-y-auto bg-black': !isMuseumMode && isMobileMenuOpen,
          // Normal mode desktop styles - static positioned
          'md:static md:inset-auto md:z-auto md:max-w-none md:bg-transparent': !isMuseumMode,
          // Visibility: hidden on mobile unless menu open, on desktop respects showFiltersInNormal
          'hidden': (!isMuseumMode && !isMobileMenuOpen) || (isMuseumMode && !showFiltersInMuseum),
          'md:block': !isMuseumMode && showFiltersInNormal,
          'md:hidden': !isMuseumMode && !showFiltersInNormal,
        }"
      >
        <!-- Close button for mobile in normal mode -->
        <button
          v-if="!isMuseumMode"
          @click="closeMobileMenu"
          class="absolute right-4 top-4 rounded-md p-2 text-white hover:bg-gray-700 focus:outline-none md:hidden"
        >
          <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Close button for museum mode -->
        <button
          v-if="isMuseumMode && showFiltersInMuseum"
          @click="showFiltersInMuseum = false"
          class="absolute right-4 top-4 rounded-md p-2 text-white/70 hover:text-white hover:bg-white/10 focus:outline-none"
        >
          <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <FilterSidebar
          @update:filters="handleFiltersUpdate"
          :filters="filters"
          :unique-traits="uniqueTraits"
        />
      </div>

      <div
        class="flex-1 transition-all duration-300"
        :class="{
          'w-full': isMuseumMode && !showFiltersInMuseum,
          'w-full pl-80': isMuseumMode && showFiltersInMuseum,
          'md:pl-8': !isMuseumMode && showFiltersInNormal,
          'md:pl-0': !isMuseumMode && !showFiltersInNormal,
        }"
      >
        <!-- Loading State -->
        <div v-if="isLoadingTokens" class="grid gap-3" :style="{ gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))` }">
          <div v-for="i in 20" :key="i" class="rounded-md border border-white/10 p-3">
            <div class="aspect-square w-full animate-pulse rounded bg-white/5"></div>
            <div class="mt-2 h-4 animate-pulse rounded bg-white/5"></div>
          </div>
        </div>

        <!-- Loaded Data -->
        <div v-else class="grid gap-3" :style="{ gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))` }">
          <div
            v-for="token in filteredTokens"
            :key="token.id"
            class="relative group"
          >
            <NuxtLink
              :to="`/${token.id}`"
              class="block cursor-pointer rounded-md border border-white/10 p-3 transition-all hover:scale-105 hover:shadow-lg"
              :class="{ 'border-purple-500/50 shadow-purple-500/20': easterEggActive && characterOnlyIds.has(token.id) }"
            >
              <div
                @mouseenter="easterEggActive ? toggleCharacterOnly(token.id) : null"
                :class="{ 'cursor-help': easterEggActive }"
              >
                <img
                  :src="getThumbnailUrl(token, characterOnlyIds.has(token.id))"
                  height="264"
                  width="264"
                  alt="DeCC0 Preview"
                  class="aspect-square w-full rounded object-cover transition-all duration-300"
                  loading="lazy"
                />
              </div>
              <h3 class="mt-2 text-center text-xs font-bold">
                #{{ token.id }}{{ getTokenName(token) ? ` - ${getTokenName(token)}` : '' }}
              </h3>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInfiniteQuery } from "@tanstack/vue-query";
import axios from "axios";
import FilterSidebar from "~/components/filters/FilterSidebar.vue";
import uniqueTraitsData from "~/assets/data/unique-traits.json";

const { public: { config } } = useRuntimeConfig();

const isMobileMenuOpen = useState("isMobileMenuOpen", () => false);

function unlockScroll() {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
  document.documentElement.style.overflow = "";
  document.documentElement.style.paddingRight = "";
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
  unlockScroll();
}

const filters = reactive({
  search: "",
  background: "",
  backgroundTexture: "",
  character: "",
  mood: "",
  dnaLineage: "",
  dnaMemetic: "",
  dnaArtistSelfPortrait: "",
  dnaMOCACollection: "",
  sortOrder: "asc" as "asc" | "desc" | "random",
});

const uniqueTraits = reactive({
  backgrounds: [] as string[],
  backgroundTextures: [] as string[],
  characters: [] as string[],
  moods: [] as string[],
  dnaLineages: [] as string[],
  dnaMemetics: [] as string[],
  dnaArtistSelfPortraits: [] as string[],
  dnaMOCACollections: [] as string[],
});

const page = ref(1);
const searchDebounceTimer = ref<NodeJS.Timeout | null>(null);
const scrollThrottleTimer = ref<NodeJS.Timeout | null>(null);

const filtersRef = ref({ ...filters });

// Zoom level state (0% = smallest, 100% = largest)
// Starting at 85% on mobile (fewer columns), 55% on desktop (5 columns per row)
const zoomLevel = ref(typeof window !== 'undefined' && window.innerWidth < 768 ? 85 : 55);

// Museum mode state (shared with layout)
const isMuseumMode = useState("isMuseumMode", () => false);

// Museum mode filters visibility
const showFiltersInMuseum = ref(false);

// Normal mode filters visibility (for desktop)
const showFiltersInNormal = ref(false);

// Function to enter browser fullscreen
async function enterFullscreen() {
  try {
    if (document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen();
    }
  } catch (error) {
    console.log('Fullscreen request failed:', error);
  }
}

// Function to exit browser fullscreen
async function exitFullscreen() {
  try {
    if (document.fullscreenElement && document.exitFullscreen) {
      await document.exitFullscreen();
    }
  } catch (error) {
    console.log('Exit fullscreen failed:', error);
  }
}

// Store the zoom level before entering museum mode
const zoomBeforeMuseum = ref<number | null>(null);

// Function to toggle museum mode with fullscreen
async function toggleMuseumMode(enable: boolean) {
  // Apply 3 second cooldown to hover feature to reduce confusion during transition
  hoverCooldown.value = true;
  setTimeout(() => {
    hoverCooldown.value = false;
  }, 3000);

  if (enable) {
    // Store current zoom level
    zoomBeforeMuseum.value = zoomLevel.value;

    // Calculate viewport width increase when going fullscreen
    // Normal mode has container + sidebar constraints, museum mode is full width
    // Typical ratio is about 1.5x wider (accounting for sidebar and container margins)
    // We need to increase columns to maintain same physical size
    const currentColumns = gridColumns.value;
    const estimatedNewColumns = Math.min(10, Math.round(currentColumns * 1.6));

    // Calculate the zoom percentage that gives us the desired number of columns
    // Formula: columns = 10 - (zoom / 100) * 9
    // Solving for zoom: zoom = (10 - columns) * 100 / 9
    const newZoom = Math.max(0, Math.min(100, Math.round((10 - estimatedNewColumns) * 100 / 9)));

    zoomLevel.value = newZoom;
    isMuseumMode.value = enable;
    await enterFullscreen();
  } else {
    // Just deactivate - zoom restoration is handled by watcher
    isMuseumMode.value = enable;
    await exitFullscreen();
  }
}

// Quality mode state: 'low' (256px), 'high' (1024px), '4k' (full IPFS)
const qualityMode = ref<'low' | 'high' | '4k'>('low');

// Function to cycle through quality modes
function toggleQuality() {
  const modes: Array<'low' | 'high' | '4k'> = ['low', 'high', '4k'];
  const currentIndex = modes.indexOf(qualityMode.value);
  const nextIndex = (currentIndex + 1) % modes.length;
  qualityMode.value = modes[nextIndex];
}

// Get quality label for display
const qualityLabel = computed(() => {
  switch (qualityMode.value) {
    case 'low': return '256p';
    case 'high': return '1024p';
    case '4k': return '4K';
    default: return '256p';
  }
});

// Easter egg state - controls hover-to-swap feature (activates after 30 seconds)
const easterEggActive = ref(false);

// Cooldown state for hover feature (prevents confusion during fullscreen transitions)
const hoverCooldown = ref(false);

// Track which tokens are in "character only" mode
const characterOnlyIds = ref(new Set<number>());

// Function to toggle between full composite and character-only mode on hover
function toggleCharacterOnly(tokenId: number) {
  // Only allow toggling if easter egg is active and not in cooldown
  if (!easterEggActive.value || hoverCooldown.value) return;

  if (characterOnlyIds.value.has(tokenId)) {
    // If already in character-only mode, swap back to full composite
    characterOnlyIds.value.delete(tokenId);
  } else {
    // If in full composite mode, swap to character-only
    characterOnlyIds.value.add(tokenId);
  }
  // Trigger reactivity
  characterOnlyIds.value = new Set(characterOnlyIds.value);
}

// Toggle easter egg mode
function toggleEasterEgg() {
  easterEggActive.value = !easterEggActive.value;

  // When deactivating, clear all character-only states
  if (!easterEggActive.value) {
    characterOnlyIds.value.clear();
    characterOnlyIds.value = new Set(characterOnlyIds.value);
  }
}

interface CodexToken {
  id: number;
  name: any;
  description: string;
  thumbnail: any;
  thumbnail_character: any;
  thumbnail_background: any;
  background_category: string;
  background_texture: string;
  mood: string;
  decc0_type: string;
  dna1: string;
  dna2: string;
  dna3: string;
  dna4: string;
  ipfs_final: string;
  ipfs_character: string;
  ipfs_background: string;
}

const { data: tokens, isLoading: isLoadingTokens, fetchNextPage, isFetchingNextPage, suspense: suspenseTokens, refetch } = useInfiniteQuery<CodexToken[]>({
  queryKey: [ "tokens", filtersRef.value ],
  queryFn: async ({ pageParam = 0 }) => {
    // Fetch ALL records upfront for better UX
    // This enables instant infinite scrolling without API delays
    const isTextSearch = filtersRef.value.search && !/^\d+$/.test(filtersRef.value.search.trim());

    // Only fetch on first page load (pageParam = 0)
    if (pageParam !== 0) {
      return []; // No more API calls after initial load
    }

    const limit = 10000; // Always fetch all items
    const offset = 0;

    // Build filter object for Directus
    const filterObj: any = {};

    // Only filter by ID on server-side (for exact ID searches)
    if (filtersRef.value.search) {
      const searchValue = filtersRef.value.search.trim();

      // If it's a number, search by exact ID on server-side
      if (/^\d+$/.test(searchValue)) {
        filterObj.id = { _eq: parseInt(searchValue) };
      }
    }

    // All other filters (traits, name search) are applied client-side
    // This allows us to fetch all data once and filter instantly

    // Build query params
    const params: any = {
      limit,
      offset,
      fields: 'id,name,description,thumbnail.*,thumbnail_character.*,thumbnail_background.*,background_category,background_texture,mood,decc0_type,dna1,dna2,dna3,dna4,ipfs_final,ipfs_character,ipfs_background',
    };

    // Add filter if we have any (only ID filter)
    if (Object.keys(filterObj).length > 0) {
      params.filter = JSON.stringify(filterObj);
    }

    // Sort order
    if (filtersRef.value.sortOrder === "asc") {
      params.sort = 'id';
    } else if (filtersRef.value.sortOrder === "desc") {
      params.sort = '-id';
    } else if (filtersRef.value.sortOrder === "random") {
      // For random, use normal ID sort and shuffle client-side
      // We'll use a random starting point for each batch
      params.sort = 'id';
    }

    const { data } = await axios.get('https://api.decc0s.com/items/codex', { params });

    let items = data.data as CodexToken[];

    // For random sort, shuffle the results client-side for additional randomness
    if (filtersRef.value.sortOrder === 'random' && items.length > 0) {
      // Fisher-Yates shuffle algorithm
      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }
    }

    return items;
  },
  initialPageParam: 0,
  getNextPageParam: () => {
    // We fetch all items at once, so no more pages needed
    return undefined;
  },
});

uniqueTraits.backgrounds = uniqueTraitsData.backgrounds;
uniqueTraits.backgroundTextures = uniqueTraitsData.backgroundTextures;
uniqueTraits.characters = uniqueTraitsData.characters;
uniqueTraits.moods = uniqueTraitsData.moods;
uniqueTraits.dnaLineages = uniqueTraitsData.dnaLineages;
uniqueTraits.dnaMemetics = uniqueTraitsData.dnaMemetics;
uniqueTraits.dnaArtistSelfPortraits = uniqueTraitsData.dnaArtistSelfPortraits;
uniqueTraits.dnaMOCACollections = uniqueTraitsData.dnaMOCACollections;

// Don't block page render - let data load in background
// await suspenseTokens(); // Removed to improve initial load time

// Track how many items to display (virtual pagination)
const displayCount = ref(36);

const allTokens = computed(() => {
  const allItems: CodexToken[] = [];

  tokens.value?.pages.forEach((page) => {
    allItems.push(...page);
  });

  return allItems;
});

const filteredTokens = computed(() => {
  let results = [ ...allTokens.value ];

  // Apply trait filters client-side
  if (filters.character) {
    // Special case: Alien and Ape are stored in background_category field
    // but we show them in the character dropdown because they're rare and special
    if (filters.character === 'Alien' || filters.character === 'Ape') {
      results = results.filter(token => token.background_category === filters.character);
    } else {
      results = results.filter(token => token.decc0_type === filters.character);
    }
  }
  if (filters.mood) {
    results = results.filter(token => token.mood === filters.mood);
  }
  if (filters.background) {
    results = results.filter(token => token.background_category === filters.background);
  }
  if (filters.backgroundTexture) {
    results = results.filter(token => token.background_texture === filters.backgroundTexture);
  }
  if (filters.dnaLineage) {
    results = results.filter(token => token.dna1 === filters.dnaLineage);
  }
  if (filters.dnaMemetic) {
    results = results.filter(token => token.dna2 === filters.dnaMemetic);
  }
  if (filters.dnaArtistSelfPortrait) {
    results = results.filter(token => token.dna3 === filters.dnaArtistSelfPortrait);
  }
  if (filters.dnaMOCACollection) {
    results = results.filter(token => token.dna4 === filters.dnaMOCACollection);
  }

  // If there's a text search (not a number), filter client-side to only show name matches
  if (filters.search && !/^\d+$/.test(filters.search.trim())) {
    const searchLower = filters.search.trim().toLowerCase();
    results = results.filter(token => {
      // Check if name contains the search term
      if (token.name) {
        // Handle both array and string formats
        const names = Array.isArray(token.name) ? token.name : [token.name];
        return names.some(name =>
          name && name.toLowerCase().includes(searchLower)
        );
      }
      return false;
    });
  }

  // Always use virtual pagination for smooth performance
  // Display only the amount specified by displayCount
  results = results.slice(0, displayCount.value);

  return results;
});

// Calculate grid columns based on zoom level
// 0% zoom = 10 columns (smallest), 100% zoom = 1 column (largest)
const gridColumns = computed(() => {
  // Linear interpolation from 10 columns (0%) to 1 column (100%)
  const columns = Math.max(1, Math.round(10 - (zoomLevel.value / 100) * 9));
  return columns;
});

// Helper to get token name from the name field
function getTokenName(token: CodexToken) {
  if (!token.name) return '';
  if (Array.isArray(token.name)) {
    return token.name[0] || '';
  }
  return token.name;
}

  // Helper to get thumbnail URL using the new asset endpoint
  function getThumbnailUrl(token: CodexToken, characterOnly: boolean = false) {
    // Determine quality key based on current quality mode
    let qualityKey = '';
    let useIPFS = false;

    switch (qualityMode.value) {
      case 'low':
        qualityKey = 's256';
        break;
      case 'high':
        qualityKey = 's1024';
        break;
      case '4k':
        // For 4K mode, use full IPFS images
        useIPFS = true;
        break;
    }

  // If 4K mode, use IPFS URLs directly
  if (useIPFS) {
    if (characterOnly && token.ipfs_character) {
      return `${config.ipfs.gateway}${token.ipfs_character}`;
    }
    if (token.ipfs_final) {
      return `${config.ipfs.gateway}${token.ipfs_final}`;
    }
  }

  // If character-only mode is active and we have the character image, use it
  if (characterOnly && token.thumbnail_character?.id) {
    return `https://api.decc0s.com/assets/${token.thumbnail_character.id}?key=${qualityKey}`;
  }

  // Otherwise use the full composite
  if (token.thumbnail?.id) {
    return `https://api.decc0s.com/assets/${token.thumbnail.id}?key=${qualityKey}`;
  }

  // Fallback to IPFS if no thumbnail
  if (token.ipfs_final) {
    return `${config.ipfs.gateway}${token.ipfs_final}`;
  }

  return '';
}

function handleSearchDebounced() {
  if (searchDebounceTimer.value) {
    clearTimeout(searchDebounceTimer.value);
  }

  searchDebounceTimer.value = setTimeout(() => {
    performIdSearch();
  }, 500); // Increased from 300ms to 500ms for better debouncing
}

function performIdSearch() {
  page.value = 1;
  refetch();
}

function handleFiltersUpdate(newFilters: typeof filters) {
  Object.assign(filters, newFilters);
  filtersRef.value = { ...newFilters };

  // Always debounce to prevent flooding
  handleSearchDebounced();
}

// Store initial zoom level for responsive behavior
const initialZoomSet = ref(false);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  checkContentHeight();

  // Listen for fullscreen changes (ESC key or browser UI)
  document.addEventListener('fullscreenchange', () => {
    // If user exits fullscreen but museum mode is still active, deactivate it
    // The watcher will handle zoom restoration
    if (!document.fullscreenElement && isMuseumMode.value) {
      isMuseumMode.value = false;
    }
  });

  // Handle viewport resize for responsive zoom
  const handleResize = () => {
    // Only auto-adjust zoom if user hasn't manually changed it
    if (!initialZoomSet.value) {
      const isMobile = window.innerWidth < 768;
      const newZoom = isMobile ? 85 : 55;
      if (zoomLevel.value !== newZoom) {
        zoomLevel.value = newZoom;
      }
    }
  };

  window.addEventListener('resize', handleResize);

  // Activate easter egg (hover mode) after 30 seconds
  setTimeout(() => {
    easterEggActive.value = true;
  }, 30000);

  // Clean up resize listener
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  if (searchDebounceTimer.value) {
    clearTimeout(searchDebounceTimer.value);
  }
  if (scrollThrottleTimer.value) {
    clearTimeout(scrollThrottleTimer.value);
  }

  // Exit fullscreen if still active
  if (document.fullscreenElement) {
    exitFullscreen();
  }
});

function handleScroll() {
  if (scrollThrottleTimer.value) {
    return;
  }

  scrollThrottleTimer.value = setTimeout(() => {
    scrollThrottleTimer.value = null;

    if (isLoadingTokens.value) {
      return;
    }

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
      // Increase display count (virtual pagination) for all modes
      if (displayCount.value < allTokens.value.length) {
        displayCount.value += 36;
      }
    }
  }, 200);
}

function checkContentHeight() {
  if (isLoadingTokens.value) {
    return;
  }

  if (document.body.offsetHeight <= window.innerHeight) {
    // Increase display count for virtual pagination
    if (displayCount.value < allTokens.value.length) {
      displayCount.value += 36;
      // Recursively check again after items are added
      setTimeout(checkContentHeight, 100);
    }
  }
}

// Watch for any filter changes and reset display count
watch(filters, () => {
  displayCount.value = 36;
});

// Watch for museum mode changes to handle zoom restoration on navigation
watch(() => isMuseumMode.value, (newValue) => {
  // If museum mode is deactivated and we have a stored zoom, restore it
  if (!newValue) {
    if (zoomBeforeMuseum.value !== null) {
      zoomLevel.value = zoomBeforeMuseum.value;
      zoomBeforeMuseum.value = null;
    }
    // Also hide filters in museum mode when exiting
    showFiltersInMuseum.value = false;
  }
});

// Watch zoom level changes to track user manual adjustments
watch(zoomLevel, () => {
  // Mark that user has manually adjusted zoom
  initialZoomSet.value = true;
});
</script>
