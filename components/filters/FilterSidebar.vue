<template>
  <div class="w-full border-white/10 p-4">
    <!-- Combined Search by Token ID or Name -->
    <div class="mb-6">
      <label class="mb-2 block text-sm font-medium">Find any Art DeCC0</label>
      <Input
        v-model="localFilters.search"
        placeholder="Type id or name .."
        class="text-black"
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
            v-for="character in uniqueTraits.characters"
            :key="character"
            :value="character"
          >
            {{ character }}
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
            v-for="lineage in uniqueTraits.dnaLineages"
            :key="lineage"
            :value="lineage"
          >
            {{ lineage }}
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
            v-for="memetic in uniqueTraits.dnaMemetics"
            :key="memetic"
            :value="memetic"
          >
            {{ memetic }}
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
            v-for="portrait in uniqueTraits.dnaArtistSelfPortraits"
            :key="portrait"
            :value="portrait"
          >
            {{ portrait }}
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
            v-for="collection in uniqueTraits.dnaMOCACollections"
            :key="collection"
            :value="collection"
          >
            {{ collection }}
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
            v-for="background in uniqueTraits.backgrounds"
            :key="background"
            :value="background"
          >
            {{ background }}
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
            v-for="texture in uniqueTraits.backgroundTextures"
            :key="texture"
            :value="texture"
          >
            {{ texture }}
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
            v-for="mood in uniqueTraits.moods"
            :key="mood"
            :value="mood"
          >
            {{ mood }}
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
import { ref, reactive, watch, onMounted } from 'vue';
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

// Props
const props = defineProps<{
  filters: Filters;
  uniqueTraits: UniqueTraits;
}>();

// Emits
const emit = defineEmits<{
  (e: 'update:filters', filters: Filters): void;
}>();

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
