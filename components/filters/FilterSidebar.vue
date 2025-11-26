<template>
  <div class="w-full border-white/10 p-4">
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


      <div>
        <h3 class="mb-2 text-sm font-medium">Character</h3>
        <select
          v-model="localFilters.character"
          class="w-full rounded-md border border-white/10 bg-neutral-900 p-2"
          @change="handleFilterChange"
        >
          <option value="">All</option>
          <option
            v-for="character in sortedCharacters"
            :key="character"
            :value="character"
          >
            {{ character }} ({{ traitCounts.characters[character] || 0 }})
          </option>
        </select>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">DNA Lineage</h3>
        <select
          v-model="localFilters.dnaLineage"
          class="w-full rounded-md border border-white/10 bg-neutral-900 p-2"
          @change="handleFilterChange"
        >
          <option value="">All</option>
          <option
            v-for="lineage in sortedDnaLineages"
            :key="lineage"
            :value="lineage"
          >
            {{ lineage }} ({{ traitCounts.dnaLineages[lineage] || 0 }})
          </option>
        </select>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">DNA Memetic</h3>
        <select
          v-model="localFilters.dnaMemetic"
          class="w-full rounded-md border border-white/10 bg-neutral-900 p-2"
          @change="handleFilterChange"
        >
          <option value="">All</option>
          <option
            v-for="memetic in sortedDnaMemetics"
            :key="memetic"
            :value="memetic"
          >
            {{ memetic }} ({{ traitCounts.dnaMemetics[memetic] || 0 }})
          </option>
        </select>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">DNA Artist Self-Portrait</h3>
        <select
          v-model="localFilters.dnaArtistSelfPortrait"
          class="w-full rounded-md border border-white/10 bg-neutral-900 p-2"
          @change="handleFilterChange"
        >
          <option value="">All</option>
          <option
            v-for="portrait in sortedDnaArtistSelfPortraits"
            :key="portrait"
            :value="portrait"
          >
            {{ portrait }} ({{ traitCounts.dnaArtistSelfPortraits[portrait] || 0 }})
          </option>
        </select>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">DNA MOCA Collection</h3>
        <select
          v-model="localFilters.dnaMOCACollection"
          class="w-full rounded-md border border-white/10 bg-neutral-900 p-2"
          @change="handleFilterChange"
        >
          <option value="">All</option>
          <option
            v-for="collection in sortedDnaMOCACollections"
            :key="collection"
            :value="collection"
          >
            {{ collection }} ({{ traitCounts.dnaMOCACollections[collection] || 0 }})
          </option>
        </select>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Background</h3>
        <select
          v-model="localFilters.background"
          class="w-full rounded-md border border-white/10 bg-neutral-900 p-2"
          @change="handleFilterChange"
        >
          <option value="">All</option>
          <option
            v-for="background in sortedBackgrounds"
            :key="background"
            :value="background"
          >
            {{ background }} ({{ traitCounts.backgrounds[background] || 0 }})
          </option>
        </select>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Background Texture</h3>
        <select
          v-model="localFilters.backgroundTexture"
          class="w-full rounded-md border border-white/10 bg-neutral-900 p-2"
          @change="handleFilterChange"
        >
          <option value="">All</option>
          <option
            v-for="texture in sortedBackgroundTextures"
            :key="texture"
            :value="texture"
          >
            {{ texture }} ({{ traitCounts.backgroundTextures[texture] || 0 }})
          </option>
        </select>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Mood</h3>
        <select
          v-model="localFilters.mood"
          class="w-full rounded-md border border-white/10 bg-neutral-900 p-2"
          @change="handleFilterChange"
        >
          <option value="">All</option>
          <option
            v-for="mood in sortedMoods"
            :key="mood"
            :value="mood"
          >
            {{ mood }} ({{ traitCounts.moods[mood] || 0 }})
          </option>
        </select>
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
import { ref, reactive, watch, onMounted, computed } from 'vue';
import traitCountsData from '~/assets/data/trait-counts.json';
// Button and Input are auto-imported by Nuxt

// Define the filter interface
interface Filters {
  search: string;
  background: string;
  backgroundTexture: string;
  character: string;
  mood: string;
  dnaLineage: string;
  dnaMemetic: string;
  dnaArtistSelfPortrait: string;
  dnaMOCACollection: string;
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

// Watch for changes in props and update local state
watch(() => props.filters, (newFilters) => {
  Object.assign(localFilters, newFilters);
}, { deep: true });

// Handle filter changes
const handleFilterChange = () => {
  emit('update:filters', { ...localFilters });
};

// Reset filters
const resetFilters = () => {
  Object.assign(localFilters, {
    search: '',
    background: '',
    backgroundTexture: '',
    character: '',
    mood: '',
    dnaLineage: '',
    dnaMemetic: '',
    dnaArtistSelfPortrait: '',
    dnaMOCACollection: ''
  });
  emit('update:filters', { ...localFilters });
};
</script>
