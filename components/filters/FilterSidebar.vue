<template>
  <div class="w-full border-white/10 p-4">
    <!-- Total Results Counter -->
    <div class="mb-6 rounded-md border border-white/20 bg-neutral-800/50 p-3 text-center">
      <div class="text-xs uppercase tracking-wide text-white/50">DeCC0s</div>
      <div 
        class="mt-1 text-2xl font-bold tabular-nums transition-colors duration-200"
        :class="countTextColor"
      >
        {{ displayedCount.toLocaleString() }}
      </div>
      <div class="mt-1 text-xs text-white/40">of 10k total</div>
    </div>

    <!-- Combined Search by Token ID or Name -->
    <div class="mb-6">
      <label class="mb-2 block text-sm font-medium">Find any Art DeCC0</label>
      <Input
        v-model="localFilters.search"
        placeholder="Type id or name .."
        class="w-full rounded-md border border-white/10 bg-neutral-900 p-2 text-white placeholder:text-gray-400"
        @input="handleFilterChange"
      />
    </div>

    <!-- Trait Filters -->
    <div class="space-y-4">


      <div class="rounded-md border border-white/10 bg-neutral-900/50">
        <button
          @click="toggleAccordion('character')"
          class="flex w-full items-center justify-between px-3 py-2.5 text-left transition-colors hover:bg-white/5"
        >
          <h3 class="text-sm font-medium">
            Character
            <span v-if="localFilters.character.length > 0" class="ml-1 text-xs text-white/50">
              ({{ localFilters.character.length }} selected)
            </span>
          </h3>
          <ChevronDown 
            class="h-4 w-4 transition-transform duration-200"
            :class="{ 'rotate-180': accordionState.character }"
          />
        </button>
        <div 
          v-show="accordionState.character"
          class="max-h-48 overflow-y-auto border-t border-white/10 p-2"
        >
          <label
            v-for="character in sortedCharacters"
            :key="character"
            class="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-white/5"
          >
            <input
              type="checkbox"
              :value="character"
              :checked="localFilters.character.includes(character)"
              @change="toggleFilter('character', character)"
              class="h-4 w-4 rounded border-white/30 bg-neutral-800 text-white accent-white focus:ring-2 focus:ring-white/50 focus:ring-offset-0"
            />
            <span class="flex-1 text-sm">
              {{ character }}
              <span class="text-xs text-white/40">({{ traitCounts.characters[character] || 0 }})</span>
            </span>
          </label>
        </div>
      </div>

      <div class="rounded-md border border-white/10 bg-neutral-900/50">
        <button
          @click="toggleAccordion('dnaLineage')"
          class="flex w-full items-center justify-between px-3 py-2.5 text-left transition-colors hover:bg-white/5"
        >
          <h3 class="text-sm font-medium">
            DNA Lineage
            <span v-if="localFilters.dnaLineage.length > 0" class="ml-1 text-xs text-white/50">
              ({{ localFilters.dnaLineage.length }} selected)
            </span>
          </h3>
          <ChevronDown 
            class="h-4 w-4 transition-transform duration-200"
            :class="{ 'rotate-180': accordionState.dnaLineage }"
          />
        </button>
        <div 
          v-show="accordionState.dnaLineage"
          class="max-h-48 overflow-y-auto border-t border-white/10 p-2"
        >
          <label
            v-for="lineage in sortedDnaLineages"
            :key="lineage"
            class="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-white/5"
          >
            <input
              type="checkbox"
              :value="lineage"
              :checked="localFilters.dnaLineage.includes(lineage)"
              @change="toggleFilter('dnaLineage', lineage)"
              class="h-4 w-4 rounded border-white/30 bg-neutral-800 text-white accent-white focus:ring-2 focus:ring-white/50 focus:ring-offset-0"
            />
            <span class="flex-1 text-sm">
              {{ lineage }}
              <span class="text-xs text-white/40">({{ traitCounts.dnaLineages[lineage] || 0 }})</span>
            </span>
          </label>
        </div>
      </div>

      <div class="rounded-md border border-white/10 bg-neutral-900/50">
        <button
          @click="toggleAccordion('dnaMemetic')"
          class="flex w-full items-center justify-between px-3 py-2.5 text-left transition-colors hover:bg-white/5"
        >
          <h3 class="text-sm font-medium">
            DNA Memetic
            <span v-if="localFilters.dnaMemetic.length > 0" class="ml-1 text-xs text-white/50">
              ({{ localFilters.dnaMemetic.length }} selected)
            </span>
          </h3>
          <ChevronDown 
            class="h-4 w-4 transition-transform duration-200"
            :class="{ 'rotate-180': accordionState.dnaMemetic }"
          />
        </button>
        <div 
          v-show="accordionState.dnaMemetic"
          class="max-h-48 overflow-y-auto border-t border-white/10 p-2"
        >
          <label
            v-for="memetic in sortedDnaMemetics"
            :key="memetic"
            class="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-white/5"
          >
            <input
              type="checkbox"
              :value="memetic"
              :checked="localFilters.dnaMemetic.includes(memetic)"
              @change="toggleFilter('dnaMemetic', memetic)"
              class="h-4 w-4 rounded border-white/30 bg-neutral-800 text-white accent-white focus:ring-2 focus:ring-white/50 focus:ring-offset-0"
            />
            <span class="flex-1 text-sm">
              {{ memetic }}
              <span class="text-xs text-white/40">({{ traitCounts.dnaMemetics[memetic] || 0 }})</span>
            </span>
          </label>
        </div>
      </div>

      <div class="rounded-md border border-white/10 bg-neutral-900/50">
        <button
          @click="toggleAccordion('dnaArtistSelfPortrait')"
          class="flex w-full items-center justify-between px-3 py-2.5 text-left transition-colors hover:bg-white/5"
        >
          <h3 class="text-sm font-medium">
            DNA Artist Self-Portrait
            <span v-if="localFilters.dnaArtistSelfPortrait.length > 0" class="ml-1 text-xs text-white/50">
              ({{ localFilters.dnaArtistSelfPortrait.length }} selected)
            </span>
          </h3>
          <ChevronDown 
            class="h-4 w-4 transition-transform duration-200"
            :class="{ 'rotate-180': accordionState.dnaArtistSelfPortrait }"
          />
        </button>
        <div 
          v-show="accordionState.dnaArtistSelfPortrait"
          class="max-h-48 overflow-y-auto border-t border-white/10 p-2"
        >
          <label
            v-for="portrait in sortedDnaArtistSelfPortraits"
            :key="portrait"
            class="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-white/5"
          >
            <input
              type="checkbox"
              :value="portrait"
              :checked="localFilters.dnaArtistSelfPortrait.includes(portrait)"
              @change="toggleFilter('dnaArtistSelfPortrait', portrait)"
              class="h-4 w-4 rounded border-white/30 bg-neutral-800 text-white accent-white focus:ring-2 focus:ring-white/50 focus:ring-offset-0"
            />
            <span class="flex-1 text-sm">
              {{ portrait }}
              <span class="text-xs text-white/40">({{ traitCounts.dnaArtistSelfPortraits[portrait] || 0 }})</span>
            </span>
          </label>
        </div>
      </div>

      <div class="rounded-md border border-white/10 bg-neutral-900/50">
        <button
          @click="toggleAccordion('dnaMOCACollection')"
          class="flex w-full items-center justify-between px-3 py-2.5 text-left transition-colors hover:bg-white/5"
        >
          <h3 class="text-sm font-medium">
            DNA MOCA Collection
            <span v-if="localFilters.dnaMOCACollection.length > 0" class="ml-1 text-xs text-white/50">
              ({{ localFilters.dnaMOCACollection.length }} selected)
            </span>
          </h3>
          <ChevronDown 
            class="h-4 w-4 transition-transform duration-200"
            :class="{ 'rotate-180': accordionState.dnaMOCACollection }"
          />
        </button>
        <div 
          v-show="accordionState.dnaMOCACollection"
          class="max-h-48 overflow-y-auto border-t border-white/10 p-2"
        >
          <label
            v-for="collection in sortedDnaMOCACollections"
            :key="collection"
            class="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-white/5"
          >
            <input
              type="checkbox"
              :value="collection"
              :checked="localFilters.dnaMOCACollection.includes(collection)"
              @change="toggleFilter('dnaMOCACollection', collection)"
              class="h-4 w-4 rounded border-white/30 bg-neutral-800 text-white accent-white focus:ring-2 focus:ring-white/50 focus:ring-offset-0"
            />
            <span class="flex-1 text-sm">
              {{ collection }}
              <span class="text-xs text-white/40">({{ traitCounts.dnaMOCACollections[collection] || 0 }})</span>
            </span>
          </label>
        </div>
      </div>

      <div class="rounded-md border border-white/10 bg-neutral-900/50">
        <button
          @click="toggleAccordion('background')"
          class="flex w-full items-center justify-between px-3 py-2.5 text-left transition-colors hover:bg-white/5"
        >
          <h3 class="text-sm font-medium">
            Background
            <span v-if="localFilters.background.length > 0" class="ml-1 text-xs text-white/50">
              ({{ localFilters.background.length }} selected)
            </span>
          </h3>
          <ChevronDown 
            class="h-4 w-4 transition-transform duration-200"
            :class="{ 'rotate-180': accordionState.background }"
          />
        </button>
        <div 
          v-show="accordionState.background"
          class="max-h-48 overflow-y-auto border-t border-white/10 p-2"
        >
          <label
            v-for="background in sortedBackgrounds"
            :key="background"
            class="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-white/5"
          >
            <input
              type="checkbox"
              :value="background"
              :checked="localFilters.background.includes(background)"
              @change="toggleFilter('background', background)"
              class="h-4 w-4 rounded border-white/30 bg-neutral-800 text-white accent-white focus:ring-2 focus:ring-white/50 focus:ring-offset-0"
            />
            <span class="flex-1 text-sm">
              {{ background }}
              <span class="text-xs text-white/40">({{ traitCounts.backgrounds[background] || 0 }})</span>
            </span>
          </label>
        </div>
      </div>

      <div class="rounded-md border border-white/10 bg-neutral-900/50">
        <button
          @click="toggleAccordion('backgroundTexture')"
          class="flex w-full items-center justify-between px-3 py-2.5 text-left transition-colors hover:bg-white/5"
        >
          <h3 class="text-sm font-medium">
            Background Texture
            <span v-if="localFilters.backgroundTexture.length > 0" class="ml-1 text-xs text-white/50">
              ({{ localFilters.backgroundTexture.length }} selected)
            </span>
          </h3>
          <ChevronDown 
            class="h-4 w-4 transition-transform duration-200"
            :class="{ 'rotate-180': accordionState.backgroundTexture }"
          />
        </button>
        <div 
          v-show="accordionState.backgroundTexture"
          class="max-h-48 overflow-y-auto border-t border-white/10 p-2"
        >
          <label
            v-for="texture in sortedBackgroundTextures"
            :key="texture"
            class="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-white/5"
          >
            <input
              type="checkbox"
              :value="texture"
              :checked="localFilters.backgroundTexture.includes(texture)"
              @change="toggleFilter('backgroundTexture', texture)"
              class="h-4 w-4 rounded border-white/30 bg-neutral-800 text-white accent-white focus:ring-2 focus:ring-white/50 focus:ring-offset-0"
            />
            <span class="flex-1 text-sm">
              {{ texture }}
              <span class="text-xs text-white/40">({{ traitCounts.backgroundTextures[texture] || 0 }})</span>
            </span>
          </label>
        </div>
      </div>

      <div class="rounded-md border border-white/10 bg-neutral-900/50">
        <button
          @click="toggleAccordion('mood')"
          class="flex w-full items-center justify-between px-3 py-2.5 text-left transition-colors hover:bg-white/5"
        >
          <h3 class="text-sm font-medium">
            Mood
            <span v-if="localFilters.mood.length > 0" class="ml-1 text-xs text-white/50">
              ({{ localFilters.mood.length }} selected)
            </span>
          </h3>
          <ChevronDown 
            class="h-4 w-4 transition-transform duration-200"
            :class="{ 'rotate-180': accordionState.mood }"
          />
        </button>
        <div 
          v-show="accordionState.mood"
          class="max-h-48 overflow-y-auto border-t border-white/10 p-2"
        >
          <label
            v-for="mood in sortedMoods"
            :key="mood"
            class="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-white/5"
          >
            <input
              type="checkbox"
              :value="mood"
              :checked="localFilters.mood.includes(mood)"
              @change="toggleFilter('mood', mood)"
              class="h-4 w-4 rounded border-white/30 bg-neutral-800 text-white accent-white focus:ring-2 focus:ring-white/50 focus:ring-offset-0"
            />
            <span class="flex-1 text-sm">
              {{ mood }}
              <span class="text-xs text-white/40">({{ traitCounts.moods[mood] || 0 }})</span>
            </span>
          </label>
        </div>
      </div>

    </div>

    <Button
      @click="resetFilters"
      class="mt-6 w-full"
    >
      Reset Filters
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, onUnmounted, computed } from 'vue';
import { ChevronDown } from 'lucide-vue-next';
import traitCountsData from '~/assets/data/trait-counts.json';
// Button and Input are auto-imported by Nuxt

// Define the filter interface
interface Filters {
  search: string;
  background: string[];
  backgroundTexture: string[];
  character: string[];
  mood: string[];
  dnaLineage: string[];
  dnaMemetic: string[];
  dnaArtistSelfPortrait: string[];
  dnaMOCACollection: string[];
}

// Define the unique traits interface
interface UniqueTraits {
  backgrounds: string[];
  backgroundTextures: string[];
  characters: string[];
  moods: string[];
  dnaLineages: string[];
  dnaMemetics: string[];
  dnaArtistSelfPortraits: string[];
  dnaMOCACollections: string[];
}

// Define trait counts interface
interface TraitCounts {
  backgrounds: Record<string, number>;
  backgroundTextures: Record<string, number>;
  characters: Record<string, number>;
  moods: Record<string, number>;
  dnaLineages: Record<string, number>;
  dnaMemetics: Record<string, number>;
  dnaArtistSelfPortraits: Record<string, number>;
  dnaMOCACollections: Record<string, number>;
}

// Load trait counts
const traitCounts = traitCountsData as TraitCounts;

// Props
const props = defineProps<{
  filters: Filters;
  uniqueTraits: UniqueTraits;
  totalResults: number;
  isCalculating: boolean;
}>();

// Emits
const emit = defineEmits<{
  (e: 'update:filters', filters: Filters): void;
}>();

// Create sorted versions of traits (by rarity - ascending)
const sortedCharacters = computed(() => {
  return [...props.uniqueTraits.characters].sort((a, b) => {
    const countA = traitCounts.characters[a] || 0;
    const countB = traitCounts.characters[b] || 0;
    return countA - countB;
  });
});

const sortedBackgrounds = computed(() => {
  return [...props.uniqueTraits.backgrounds].sort((a, b) => {
    const countA = traitCounts.backgrounds[a] || 0;
    const countB = traitCounts.backgrounds[b] || 0;
    return countA - countB;
  });
});

const sortedBackgroundTextures = computed(() => {
  return [...props.uniqueTraits.backgroundTextures].sort((a, b) => {
    const countA = traitCounts.backgroundTextures[a] || 0;
    const countB = traitCounts.backgroundTextures[b] || 0;
    return countA - countB;
  });
});

const sortedMoods = computed(() => {
  return [...props.uniqueTraits.moods].sort((a, b) => {
    const countA = traitCounts.moods[a] || 0;
    const countB = traitCounts.moods[b] || 0;
    return countA - countB;
  });
});

const sortedDnaLineages = computed(() => {
  return [...props.uniqueTraits.dnaLineages].sort((a, b) => {
    const countA = traitCounts.dnaLineages[a] || 0;
    const countB = traitCounts.dnaLineages[b] || 0;
    return countA - countB;
  });
});

const sortedDnaMemetics = computed(() => {
  return [...props.uniqueTraits.dnaMemetics].sort((a, b) => {
    const countA = traitCounts.dnaMemetics[a] || 0;
    const countB = traitCounts.dnaMemetics[b] || 0;
    return countA - countB;
  });
});

const sortedDnaArtistSelfPortraits = computed(() => {
  return [...props.uniqueTraits.dnaArtistSelfPortraits].sort((a, b) => {
    const countA = traitCounts.dnaArtistSelfPortraits[a] || 0;
    const countB = traitCounts.dnaArtistSelfPortraits[b] || 0;
    return countA - countB;
  });
});

const sortedDnaMOCACollections = computed(() => {
  return [...props.uniqueTraits.dnaMOCACollections].sort((a, b) => {
    const countA = traitCounts.dnaMOCACollections[a] || 0;
    const countB = traitCounts.dnaMOCACollections[b] || 0;
    return countA - countB;
  });
});

// Local filters state
const localFilters = reactive({ ...props.filters });

// Accordion state - track which sections are open (only character open by default)
const accordionState = reactive({
  character: true,
  dnaLineage: false,
  dnaMemetic: false,
  dnaArtistSelfPortrait: false,
  dnaMOCACollection: false,
  background: false,
  backgroundTexture: false,
  mood: false,
});

// Toggle accordion
const toggleAccordion = (section: keyof typeof accordionState) => {
  accordionState[section] = !accordionState[section];
};

// Animated counter display
const displayedCount = ref(props.totalResults);
const isAnimating = ref(false);
let animationInterval: NodeJS.Timeout | null = null;
let animationDelayTimeout: NodeJS.Timeout | null = null;

// Computed color class based on state
const countTextColor = computed(() => {
  // If calculating or animating, show dark grey
  if (props.isCalculating || isAnimating.value) {
    return 'text-white/30';
  }
  // If result is 0, keep dark grey
  if (props.totalResults === 0) {
    return 'text-white/30';
  }
  // Otherwise show white
  return 'text-white';
});

// Watch for changes in props and update local state
watch(() => props.filters, (newFilters) => {
  Object.assign(localFilters, newFilters);
}, { deep: true });

// Watch isCalculating to trigger animation with delay
watch(() => props.isCalculating, (calculating) => {
  if (calculating) {
    // Clear any existing timeouts/intervals
    if (animationDelayTimeout) {
      clearTimeout(animationDelayTimeout);
      animationDelayTimeout = null;
    }
    if (animationInterval) {
      clearInterval(animationInterval);
      animationInterval = null;
    }
    
    // Color turns dark grey immediately (handled by computed)
    // Wait 300ms before starting animation
    animationDelayTimeout = setTimeout(() => {
      // Only start animation if still calculating
      if (props.isCalculating) {
        isAnimating.value = true;
        animationInterval = setInterval(() => {
          displayedCount.value = Math.floor(Math.random() * (9999 - 1111 + 1)) + 1111;
        }, 50); // Update every 50ms for smooth animation
      }
    }, 300);
  } else {
    // Stop animation and show real count
    isAnimating.value = false;
    
    if (animationDelayTimeout) {
      clearTimeout(animationDelayTimeout);
      animationDelayTimeout = null;
    }
    
    if (animationInterval) {
      clearInterval(animationInterval);
      animationInterval = null;
    }
    
    displayedCount.value = props.totalResults;
  }
}, { immediate: true });

// Watch totalResults when not calculating
watch(() => props.totalResults, (newCount) => {
  if (!props.isCalculating && !isAnimating.value) {
    displayedCount.value = newCount;
  }
});

// Cleanup animation on unmount
onUnmounted(() => {
  if (animationInterval) {
    clearInterval(animationInterval);
  }
  if (animationDelayTimeout) {
    clearTimeout(animationDelayTimeout);
  }
});

// Handle filter changes
const handleFilterChange = () => {
  emit('update:filters', { ...localFilters });
};

// Toggle filter checkbox
const toggleFilter = (filterKey: keyof Omit<Filters, 'search'>, value: string) => {
  const filterArray = localFilters[filterKey] as string[];
  const index = filterArray.indexOf(value);
  
  if (index > -1) {
    // Remove if already selected
    filterArray.splice(index, 1);
  } else {
    // Add if not selected
    filterArray.push(value);
  }
  
  handleFilterChange();
};

// Reset filters
const resetFilters = () => {
  Object.assign(localFilters, {
    search: '',
    background: [],
    backgroundTexture: [],
    character: [],
    mood: [],
    dnaLineage: [],
    dnaMemetic: [],
    dnaArtistSelfPortrait: [],
    dnaMOCACollection: []
  });
  emit('update:filters', { ...localFilters });
};
</script>
