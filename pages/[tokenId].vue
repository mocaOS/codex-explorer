<template>
  <div class="py-2 lg:py-16">
    <div class="container grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div class="relative mx-auto">
        <img
          :src="imageUrl"
          width="1024"
          height="1024"
          alt="PFP Preview"
          class="relative z-20 rounded-md"
        >
        <Skeleton class="absolute inset-0 z-10 aspect-square max-h-[614px] max-w-[614px]" />
      </div>
      <div class="relative pb-11 text-center lg:text-left">
        <h1 class="mb-3 text-4xl font-bold">
          Art DeCC0 #{{ token.codexData.id }}
        </h1>
        <p class="text-xs font-light text-white/30">
          <span class="font-normal">Owner:</span> {{ token.owner }}
        </p>
        <hr class="my-3 border-white/10">
        <ul class="mb-3 grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 lg:grid-cols-3">
          <li>
            <h4 class="mb-1 text-xs uppercase text-white/30">
              Background
            </h4>
            <p>{{ token.codexData.background_category || "N/A" }}</p>
          </li>
          <li>
            <h4 class="mb-1 text-xs uppercase text-white/30">
              Background Texture
            </h4>
            <p>{{ token.codexData.background_texture || "N/A" }}</p>
          </li>
          <li>
            <h4 class="mb-1 text-xs uppercase text-white/30">
              Character
            </h4>
            <p>{{ token.codexData.decc0_type || "N/A" }}</p>
          </li>
          <li>
            <h4 class="mb-1 text-xs uppercase text-white/30">
              Lineage
            </h4>
            <p>{{ token.codexData.dna1 || "N/A" }}</p>
          </li>
          <li>
            <h4 class="mb-1 text-xs uppercase text-white/30">
              Memetic
            </h4>
            <p>{{ token.codexData.dna2 || "N/A" }}</p>
          </li>
          <li>
            <h4 class="mb-1 text-xs uppercase text-white/30">
              Artist Self-Portrait
            </h4>
            <p>{{ token.codexData.dna3 || "N/A" }}</p>
          </li>
          <li>
            <h4 class="mb-1 text-xs uppercase text-white/30">
              MOCA Collection
            </h4>
            <p>{{ token.codexData.dna4 || "N/A" }}</p>
          </li>
          <li>
            <h4 class="mb-1 text-xs uppercase text-white/30">
              Character Citation
            </h4>
            <p>{{ token.codexData.citation || "N/A" }}</p>
          </li>
          <li>
            <h4 class="mb-1 text-xs uppercase text-white/30">
              Mood
            </h4>
            <p>{{ token.codexData.mood || "N/A" }}</p>
          </li>
        </ul>
        <div class="my-16 grid w-full grid-cols-1 justify-center gap-3 sm:grid-cols-2 lg:justify-start">
          <a
            v-if="token.codexData.ipfs_final"
            :href="`${config.ipfs.gateway}${token.codexData.ipfs_final}`"
            target="_blank"
          >
            <Button
              class="w-full"
            >
              Download Full-Res IPFS Image
            </Button>
          </a>
          <Button
            v-else
            disabled
            class="w-full"
          >
            Download Full-Res IPFS Image
          </Button>
          <a :href="`https://www.raster.art/token/ethereum/${config.contracts.MOCAPFP.address}/${token.codexData.id}`" target="_blank">
            <Button
              class="w-full"
            >
              View DeCC0 on Raster.art
            </Button>
          </a>
        </div>
        <div class="rounded-md border border-white/30">
          <Table>
            <TableHeader>
              <TableRow class="border-white/30">
                <TableHead>Character Image</TableHead>
                <TableHead>Background Image</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody class="text-xs">
              <TableRow>
                <TableCell class="max-w-0 truncate">
                  <a v-if="token.codexData.ipfs_character" :href="`https://ipfs.qwellcode.de/ipfs/${token.codexData.ipfs_character}`" target="_blank">
                    https://ipfs.qwellcode.de/ipfs/{{ token.codexData.ipfs_character }}
                  </a>
                  <span v-else>N/A</span>
                </TableCell>
                <TableCell class="max-w-0 truncate">
                  <a v-if="token.codexData.ipfs_background" :href="`https://ipfs.qwellcode.de/ipfs/${token.codexData.ipfs_background}`" target="_blank">
                    https://ipfs.qwellcode.de/ipfs/{{ token.codexData.ipfs_background }}
                  </a>
                  <span v-else>N/A</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
    <div class="container">
      <!-- Merged Aggregated Data (previously from AggregatedData.vue) -->
      <div v-if="token.codexData" class="mt-8 rounded-md border border-black p-4 bg-black">

        <div v-if="token.codexData.description" class="mb-10">
          <h4 class="mb-1 text-xs uppercase text-white/30">Description</h4>
          <p>{{ token.codexData.description }}</p>

          <h4 class="mb-1 text-xs uppercase text-white/30 mt-4">Confession</h4>
          <p>{{ token.codexData.confession }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <!-- Column 1: Basic Information -->
          <div>
            <div v-if="token.codexData.name" class="mb-3">
              <h4 class="mb-1 text-xs uppercase text-white/30">Name</h4>
              <h3 class="mb-1 text-lg font-bold">{{ Array.isArray(token.codexData.name) ? token.codexData.name[0] : token.codexData.name }}</h3>

              <ul class="list-none list-inside space-y-1">
                <template v-for="(name, index) in token.codexData.name" :key="index">
                  <li v-if="(token.codexData.name.length > 1 && index > 0)">
                  - {{ name }}
                  </li>
                </template>
              </ul>
            </div>

            <div v-if="token.codexData.cultural_affiliation" class="mb-3">
              <h4 class="mb-1 text-xs uppercase text-white/30">Cultural Affiliation</h4>
              <p>{{ token.codexData.cultural_affiliation }}</p>
            </div>

            <div v-if="token.codexData.municipality_significant" class="mb-3">
              <h4 class="mb-1 text-xs uppercase text-white/30">Municipality Significant</h4>
              <p>{{ token.codexData.municipality_significant }}</p>
              <div v-if="token.codexData.latlon_significant" class="mt-2 text-sm text-white/70">
                <span class="text-white/50">Coordinates:</span> {{ token.codexData.latlon_significant }}
              </div>
              <a
                :href="`https://map.decc0s.com/#${tokenId}s`"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-1 inline-block text-xs text-white/50 hover:text-white/80 underline"
              >
                View on Map
              </a>
            </div>

            <div v-if="token.codexData.municipality_residence" class="mb-3">
              <h4 class="mb-1 text-xs uppercase text-white/30">Municipality Residence</h4>
              <p>{{ token.codexData.municipality_residence }}</p>
              <div v-if="token.codexData.latlon_residence" class="mt-2 text-sm text-white/70">
                <span class="text-white/50">Coordinates:</span> {{ token.codexData.latlon_residence }}
              </div>
              <a
                :href="`https://map.decc0s.com/#${tokenId}r`"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-1 inline-block text-xs text-white/50 hover:text-white/80 underline"
              >
                View on Map
              </a>
            </div>

            <div v-if="token.codexData.ancestor || token.codexData.kindred" class="mb-3">
              <h4 v-if="token.codexData.ancestor" class="mb-1 text-xs uppercase text-white/30">Ancestor</h4>
              <p v-if="token.codexData.ancestor">{{ Array.isArray(token.codexData.ancestor) ? token.codexData.ancestor.join(', ') : token.codexData.ancestor }}</p>
              <h4 v-if="token.codexData.kindred" class="mb-1 text-xs uppercase text-white/30">Kindred</h4>
              <p v-if="token.codexData.kindred">{{ Array.isArray(token.codexData.kindred) ? token.codexData.kindred.join(', ') : token.codexData.kindred }}</p>
            </div>
          </div>

          <div>
            <div v-if="token.codexData.philosophical_affiliation" class="mb-3">
              <h4 class="mb-1 text-xs uppercase text-white/30">Philosophical Affiliation</h4>
              <p>{{ token.codexData.philosophical_affiliation }}</p>
            </div>

            <div v-if="token.codexData.expression_style" class="mb-3">
              <h4 class="mb-1 text-xs uppercase text-white/30">Expression Style</h4>
              <p>{{ token.codexData.expression_style }}</p>
            </div>

            <div v-if="token.codexData.whatness" class="mb-3">
              <h4 class="mb-1 text-xs uppercase text-white/30">Whatness / Gender</h4>
              <ul class="list-none list-inside space-y-1">
                <template v-for="(what, index) in token.codexData.whatness" :key="index">
                  <li v-if="(token.codexData.whatness.length === 1 && index === 0) || (token.codexData.whatness.length > 1 && index > 0)">
                    {{ what }} / {{ token.codexData.gender && token.codexData.gender.length > index ? token.codexData.gender[index] : '' }}
                  </li>
                </template>
              </ul>
            </div>

            <div v-if="token.codexData.self_identity" class="mb-3">
              <h4 class="mb-1 text-xs uppercase text-white/30">Self Identity</h4>
              <p>{{ token.codexData.self_identity }}</p>
            </div>

            <div v-if="token.codexData.multiplicity || token.codexData.soul || token.codexData.x" class="mb-3">
              <h4 class="mb-1 text-xs uppercase text-white/30">
                <span v-if="token.codexData.multiplicity">Multiplicity</span>
                <span v-if="token.codexData.soul"> / Soul</span>
                <span v-if="token.codexData.x"> / X</span>
              </h4>
              <p>
                <span v-if="token.codexData.multiplicity">{{ token.codexData.multiplicity }}</span>
                <span v-if="token.codexData.soul"> / {{ token.codexData.soul }}</span>
                <span v-if="token.codexData.x"> / {{ token.codexData.x }}</span>
              </p>
            </div>
          </div>

          <div class="md:col-span-2">
            <div v-if="token.codexData.artstyle_loved || token.codexData.artstyle_liked || token.codexData.artstyle_disliked" class="mb-3">
              <h4 class="mb-1 text-xs uppercase text-white/30">Art Style Preferences</h4>
              <ul class="list-inside space-y-1">
                <li v-if="token.codexData.artstyle_loved">Loved: {{ token.codexData.artstyle_loved }} </li>
                <li v-if="token.codexData.artstyle_liked">Liked: {{ token.codexData.artstyle_liked }} </li>
                <li v-if="token.codexData.artstyle_disliked">Disliked: {{ token.codexData.artstyle_disliked }} </li>
              </ul>
            </div>

            <div v-if="token.codexData.cryptoart_focus" class="mb-3">
              <h4 class="mb-1 text-xs uppercase text-white/30">Cryptoart Focus</h4>
              <p>{{ token.codexData.cryptoart_focus }}</p>
            </div>

            <div v-if="token.codexData.personality_tradart_view" class="mb-3">
              <h4 class="mb-1 text-xs uppercase text-white/30">Traditional Art View</h4>
              <p>{{ token.codexData.personality_tradart_view }}</p>
            </div>

            <div v-if="token.codexData.fiery" class="mb-3">
              <h4 class="mb-1 text-xs uppercase text-white/30">Fiery</h4>
              <p>{{ token.codexData.fiery }}</p>
            </div>
          </div>
        </div>

        <!-- Biography section -->
        <div v-if="token.codexData.biography || token.codexData.biography_addendum" class="mb-3 mt-6">
          <h4 class="mb-1 text-xs uppercase text-white/30">Biography</h4>
          <div class="relative">
            <div
              :class="{ 'max-h-96 overflow-hidden': !isBiographyExpanded }"
            >
              <p
                v-if="token.codexData.biography"
                class="whitespace-pre-line"
              >
                {{ Array.isArray(token.codexData.biography) ? token.codexData.biography.join(' ') : token.codexData.biography }}
              </p>
              <div v-if="token.codexData.biography_addendum">
                <h4 class="mb-1 mt-4 text-xs uppercase text-white/30">Addendum</h4>
                <p class="whitespace-pre-line">{{ token.codexData.biography_addendum }}</p>
              </div>
            </div>
            <div
              v-if="!isBiographyExpanded && ((Array.isArray(token.codexData.biography) ? token.codexData.biography.join(' ') : token.codexData.biography) + (token.codexData.biography_addendum ? '\n\n' + token.codexData.biography_addendum : '')).length > 500"
              class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"
            ></div>
          </div>
          <button
            v-if="((Array.isArray(token.codexData.biography) ? token.codexData.biography.join(' ') : token.codexData.biography) + (token.codexData.biography_addendum ? '\n\n' + token.codexData.biography_addendum : '')).length > 500"
            @click="toggleBiography"
            class="mt-2 text-sm text-white/50 hover:text-white/80 underline"
          >
            {{ isBiographyExpanded ? 'Show Less' : 'Read More' }}
          </button>
        </div>

        <!-- Visual Appearance Accordion -->
        <div class="border-white/10 pt-3 mt-4">
          <button
            @click="toggleVisualAppearanceAccordion"
            class="flex w-full items-center justify-between py-2 text-left"
            :aria-expanded="isVisualAppearanceOpen"
          >
            <h3 class="text-lg font-bold">Visual Appearance</h3>
            <svg
              class="h-5 w-5 transition-transform duration-300"
              :class="{ 'rotate-180': isVisualAppearanceOpen }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div v-show="isVisualAppearanceOpen" class="pt-3">
            <div class="grid grid-cols-1 md:grid-cols-6 gap-6">
              <div class="col-span-2">
                <img
                  :src="(isThumbnailHovered && token.codexData.thumbnail_background?.id ? `https://api.decc0s.com/assets/${token.codexData.thumbnail_background.id}?key=s512` : (token.codexData.thumbnail?.id ? `https://api.decc0s.com/assets/${token.codexData.thumbnail.id}?key=s512` : ''))"
                  @mouseenter="isThumbnailHovered = true"
                  @mouseleave="isThumbnailHovered = false"
                  :alt="isThumbnailHovered ? 'Character Background Image' : 'Character Image'"
                  class="w-full h-auto cursor-pointer transition-opacity duration-300 mb-5"
                />
              </div>
              <div class="col-span-4">
                <div v-if="token.codexData.character_image_summary" class="mb-3">
                  <h4 class="mb-1 text-xs uppercase text-white/30">Character Summary</h4>
                  <p>{{ token.codexData.character_image_summary }}</p>
                </div>
              </div>
            </div>

            <div v-if="token.codexData.paired_art_image_summary" class="mb-3 mt-1">
              <h4 class="mb-1 text-xs uppercase text-white/30">Paired Art Summary ({{ token.codexData.paired_art_placement }} layer)</h4>
              <p>{{ token.codexData.paired_art_image_summary }}</p>
            </div>
          </div>
        </div>

        <!-- Favorite Things Accordion -->
        <div class="border-t border-white/10 pt-3 mt-4">
          <button
            @click="toggleThingsILoveAccordion"
            class="flex w-full items-center justify-between py-2 text-left"
            :aria-expanded="isThingsILoveOpen"
          >
            <h3 class="text-lg font-bold">Favorite Things</h3>
            <svg
              class="h-5 w-5 transition-transform duration-300"
              :class="{ 'rotate-180': isThingsILoveOpen }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div v-show="isThingsILoveOpen" class="pt-3">
            <div v-if="token.codexData.favorite_role" class="mb-3">
              <h4 class="mb-1 text-xs uppercase text-white/30">Favorite Role</h4>
              <p>{{ token.codexData.favorite_role }}</p>
            </div>

            <div v-if="token.codexData.favorite_cryptoartist" class="mb-3">
              <h4 class="mb-1 text-xs uppercase text-white/30">Favorite Cryptoartist</h4>
              <p>{{ token.codexData.favorite_cryptoartist }}</p>
            </div>

            <div v-if="token.codexData.favorite_book" class="mb-3">
              <h4 class="mb-1 text-xs uppercase text-white/30">Favorite Book</h4>
              <p>{{ token.codexData.favorite_book }}</p>
            </div>

            <div v-if="token.codexData.favourite_color" class="mb-3">
              <h4 class="mb-1 text-xs uppercase text-white/30">Favorite Color</h4>
              <p>{{ token.codexData.favourite_color }}</p>
            </div>

            <div v-if="token.codexData.favourite_animal" class="mb-3">
              <h4 class="mb-1 text-xs uppercase text-white/30">Favorite Animal</h4>
              <p>{{ token.codexData.favourite_animal }}</p>
            </div>
          </div>
        </div>

        <!-- Writing Behavior Accordion -->
        <div class="border-t border-white/10 pt-3 mt-4">
          <button
            @click="toggleWritingAccordion"
            class="flex w-full items-center justify-between py-2 text-left"
            :aria-expanded="isWritingOpen"
          >
            <h3 class="text-lg font-bold">Writing Behavior</h3>
            <svg
              class="h-5 w-5 transition-transform duration-300"
              :class="{ 'rotate-180': isWritingOpen }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div v-show="isWritingOpen" class="pt-3">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="md:col-span-2">
                <div v-if="token.codexData.metaphor_domain" class="mb-3">
                  <h4 class="mb-1 text-xs uppercase text-white/30">Metaphor Domain</h4>
                  <p>{{ token.codexData.metaphor_domain }}</p>
                </div>

                <div v-if="token.codexData.writing_style && token.codexData.writing_style.length" class="mb-3">
                  <h4 class="mb-1 text-xs uppercase text-white/30">Writing Style</h4>
                  <ul class="list-inside space-y-1">
                    <li v-for="(writing, index) in token.codexData.writing_style" :key="index">- {{ writing }}</li>
                  </ul>
                </div>
              </div>

              <div>
                <div v-if="token.codexData.personality_mood" class="mb-3">
                  <h4 class="mb-1 text-xs uppercase text-white/30">Personality Mood</h4>
                  <p>{{ token.codexData.personality_mood }}</p>
                </div>

                <div v-if="token.codexData.personality_problem_solving" class="mb-3">
                  <h4 class="mb-1 text-xs uppercase text-white/30">Problem Solving</h4>
                  <p>{{ token.codexData.personality_problem_solving }}</p>
                </div>

                <div v-if="token.codexData.ideolectal_words && token.codexData.ideolectal_words.length" class="mb-3">
                  <h4 class="mb-1 text-xs uppercase text-white/30">Ideolectal Words</h4>
                  <div class="flex flex-wrap gap-2 mt-2 mb-5">
                    <span
                      v-for="(ideolectal_word, index) in token.codexData.ideolectal_words"
                      :key="index"
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20">
                      {{ ideolectal_word }}
                    </span>
                  </div>
                </div>

                <div v-if="token.codexData.writing_flavor || token.codexData.writing_flavor_cultural || token.codexData.writing_quirks" class="mb-3">
                  <h4 class="mb-1 text-xs uppercase text-white/30">Writing Metadata</h4>
                  <div v-if="token.codexData.writing_flavor" class="mb-2">Flavor: {{ token.codexData.writing_flavor }}</div>
                  <div v-if="token.codexData.writing_flavor_cultural" class="mb-2">Cultural Flavor: {{ token.codexData.writing_flavor_cultural }}</div>
                  <div v-if="token.codexData.writing_quirks" class="mb-2">Quirks: {{ token.codexData.writing_quirks }}</div>
                </div>

                <div v-if="token.codexData.writing_sentence_complexity || token.codexData.writing_questions || token.codexData.writing_comma || token.codexData.writing_ellipses || token.codexData.writing_exclamation || token.codexData.writing_quotation_marks" class="mb-3">
                  <h4 class="mb-1 text-xs uppercase text-white/30">Writing Punctuation</h4>
                  <div v-if="token.codexData.writing_comma" class="mb-2">Comma Style: {{ token.codexData.writing_comma }}</div>
                  <div v-if="token.codexData.writing_ellipses" class="mb-2">Ellipses Style: {{ token.codexData.writing_ellipses }}</div>
                  <div v-if="token.codexData.writing_exclamation" class="mb-2">Exclamation Style: {{ token.codexData.writing_exclamation }}</div>
                  <div v-if="token.codexData.writing_questions" class="mb-2">Writing Questions: {{ token.codexData.writing_questions }}</div>
                  <div v-if="token.codexData.writing_quotation_marks" class="mb-2">Quotation Marks: {{ token.codexData.writing_quotation_marks }}</div>
                  <div v-if="token.codexData.writing_sentence_complexity" class="mb-2">Sentence Complexity: {{ token.codexData.writing_sentence_complexity }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Characterization Accordion -->
        <div class="border-t border-white/10 pt-3 mt-4">
          <button
            @click="toggleAdditionalInfoAccordion"
            class="flex w-full items-center justify-between py-2 text-left"
            :aria-expanded="isAdditionalInfoOpen"
          >
            <h3 class="text-lg font-bold">Additional Characterization</h3>
            <svg
              class="h-5 w-5 transition-transform duration-300"
              :class="{ 'rotate-180': isAdditionalInfoOpen }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div v-show="isAdditionalInfoOpen" class="pt-3">
            <div v-if="token.codexData.characterization" class="mb-3">
              <h4 class="mb-1 text-xs uppercase text-white/30">Characterization</h4>
              <p>{{ token.codexData.characterization }}</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-if="token.codexData.character_image_description" class="mb-3">
                <h4 class="mb-1 text-xs uppercase text-white/30">Character Details</h4>
                <p>{{ token.codexData.character_image_description }}</p>
              </div>

              <div v-if="token.codexData.paired_art_image_description" class="mb-3">
                <h4 class="mb-1 text-xs uppercase text-white/30">Paired Art Details</h4>
                <p>{{ token.codexData.paired_art_image_description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- ElizaOS Agent Profile Accordion -->
        <div v-if="token.codexData.agent_profiles" class="border-t border-white/10 pt-3 mt-4">
          <button
            @click="toggleAccordion"
            class="flex w-full items-center justify-between py-2 text-left"
            :aria-expanded="isOpen"
          >
            <h3 class="text-lg font-bold">ElizaOS Agent Profile</h3>
            <svg
              class="h-5 w-5 transition-transform duration-300"
              :class="{ 'rotate-180': isOpen }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div v-show="isOpen" class="pt-3">
            <div v-if="token.codexData.agent_profiles['1.00.00']">
              <h4 class="font-bold mb-3">Agent Profile Version 1.0</h4>

              <div v-if="token.codexData.agent_profiles['1.00.00'].name" class="mb-3">
                <h4 class="mb-1 text-xs uppercase text-white/30">Name</h4>
                <p>{{ token.codexData.agent_profiles['1.00.00'].name }}</p>
              </div>

              <div v-if="token.codexData.agent_profiles['1.00.00'].username" class="mb-3">
                <h4 class="mb-1 text-xs uppercase text-white/30">Username</h4>
                <p>{{ token.codexData.agent_profiles['1.00.00'].username }}</p>
              </div>

              <div v-if="token.codexData.agent_profiles['1.00.00'].system" class="mb-3">
                <h4 class="mb-1 text-xs uppercase text-white/30">System Prompt</h4>
                <p>{{ token.codexData.agent_profiles['1.00.00'].system }}</p>
              </div>

              <div class="mb-3">
                <h4 class="mb-1 text-xs uppercase text-white/30">Bio</h4>
                <p>{{ Array.isArray(token.codexData.agent_profiles['1.00.00'].bio) ? token.codexData.agent_profiles['1.00.00'].bio.join(' ') : token.codexData.agent_profiles['1.00.00'].bio }}</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mt-5">
                <div class="mb-3 col-span-2">
                  <h4 class="mb-1 text-xs uppercase text-white/30">Adjectives</h4>
                  <div class="flex flex-wrap gap-2 mt-2 mb-5">
                    <span
                      v-for="(adjective, index) in token.codexData.agent_profiles['1.00.00'].adjectives"
                      :key="index"
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20">
                      {{ adjective }}
                    </span>
                  </div>

                  <h4 class="mb-1 text-xs uppercase text-white/30">Topics</h4>
                  <div class="flex flex-wrap gap-2 mt-2">
                    <span
                      v-for="(topic, index) in token.codexData.agent_profiles['1.00.00'].topics"
                      :key="index"
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20">
                      {{ topic }}
                    </span>
                  </div>
                </div>

                <div class="mb-3 col-span-3">
                  <div class="mb-3 mt-5">
                    <h4 class="mb-1 text-xs uppercase text-white/30">Style</h4>
                    <div>
                      <ul class="list-disc list-inside space-y-1">
                        <li v-for="(styleItem, key) in token.codexData.agent_profiles['1.00.00'].style.all" :key="key">{{ styleItem }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-3 mt-5">
                <h4 class="mb-1 text-xs uppercase text-white/30">Knowledge</h4>
                <ul class="list-inside space-y-1 mb-6">
                  <li v-for="(knowledge, index) in token.codexData.agent_profiles['1.00.00'].knowledge" :key="index">{{ knowledge }}</li>
                </ul>
              </div>

              <!-- Message Examples -->
              <div v-if="token.codexData.agent_profiles['1.00.00'].messageExamples && token.codexData.agent_profiles['1.00.00'].messageExamples.length" class="mb-3">
                <h4 class="mb-1 text-xs uppercase text-white/30">Message Examples</h4>
                <div class="space-y-1 mt-2">
                  <div
                    v-for="(example, exampleIndex) in token.codexData.agent_profiles['1.00.00'].messageExamples"
                    :key="exampleIndex"
                    class="border border-white/10 rounded-md"
                  >
                    <button
                      @click="toggleMessageExample(exampleIndex)"
                      class="w-full flex justify-between items-center p-3 text-left hover:bg-white/5 transition-colors"
                      :aria-expanded="openMessageExampleIndex === exampleIndex"
                    >
                      <span class="font-small">Example Conversation {{ exampleIndex + 1 }} / {{ token.codexData.agent_profiles['1.00.00'].messageExamples.length }}</span>
                      <svg
                        class="h-5 w-5 transition-transform duration-300"
                        :class="{ 'rotate-180': openMessageExampleIndex === exampleIndex }"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div
                      v-show="openMessageExampleIndex === exampleIndex"
                      class="px-3 pb-3"
                    >
                      <div class="border-t border-white/10 pt-3">
                        <div v-for="(message, messageIndex) in example" :key="messageIndex" class="mb-4 last:mb-0">
                          <div v-if="message.name" class="font-semibold text-white/90">{{ message.name }}</div>
                          <div v-else-if="message.user" class="font-semibold text-white/90">{{ message.user }}</div>
                          <div v-else-if="message.role" class="font-semibold text-white/90">{{ message.role }}</div>

                          <div v-if="message.content" class="mt-1 text-white/80 whitespace-pre-wrap">{{ message.content }}</div>
                          <div v-else-if="message.text" class="mt-1 text-white/80 whitespace-pre-wrap">{{ message.text }}</div>
                          <div v-else-if="typeof message === 'string'" class="mt-1 text-white/80 whitespace-pre-wrap">{{ message }}</div>

                          <div v-if="(!message.name && !message.content && !message.user && !message.text && typeof message !== 'string')" class="mt-2">
                            <pre class="text-xs p-2 bg-black/30 rounded overflow-x-auto">{{ JSON.stringify(message, null, 2) }}</pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import axios from "axios";

const route = useRoute();
const { tokenId } = route.params;

const { public: { config } } = useRuntimeConfig();

interface CodexData {
  id: number;
  name: any;
  description: string;
  confession: string;
  ancestor: any;
  kindred: string;
  cultural_affiliation: string;
  municipality_significant: string;
  latlon_significant: string;
  municipality_residence: string;
  latlon_residence: string;
  philosophical_affiliation: string;
  expression_style: string;
  whatness: any;
  gender: any;
  self_identity: string;
  multiplicity: number;
  soul: number;
  x: number;
  artstyle_loved: string;
  artstyle_liked: string;
  artstyle_disliked: string;
  cryptoart_focus: string;
  personality_tradart_view: string;
  fiery: string;
  biography: any;
  biography_addendum: string;
  character_image_summary: string;
  character_image_description: string;
  paired_art_image_summary: string;
  paired_art_image_description: string;
  paired_art_placement: string;
  favorite_role: string;
  favorite_cryptoartist: string;
  favorite_book: string;
  favourite_color: string;
  favourite_animal: string;
  metaphor_domain: string;
  writing_style: any;
  personality_mood: string;
  personality_problem_solving: string;
  ideolectal_words: any;
  writing_flavor: string;
  writing_flavor_cultural: string;
  writing_quirks: string;
  writing_sentence_complexity: string;
  writing_questions: string;
  writing_comma: string;
  writing_ellipses: string;
  writing_exclamation: string;
  writing_quotation_marks: string;
  characterization: string;
  background_category: string;
  background_texture: string;
  mood: string;
  decc0_type: string;
  dna1: string;
  dna2: string;
  dna3: string;
  dna4: string;
  citation: string;
  ipfs_background: string;
  ipfs_character: string;
  ipfs_final: string;
  thumbnail: any;
  thumbnail_background: any;
  thumbnail_character: any;
  agent_profiles: any;
  owner: string;
  [key: string]: any;
}

interface TokenData {
  codexData: CodexData;
  owner: string;
}

const { data: token, isLoading: isLoadingToken, suspense: suspenseToken } = useQuery<TokenData>({
  queryKey: [ "token", tokenId ],
  queryFn: async () => {
    // Fetch Codex data from API (includes owner field)
    const { data: codexResponse } = await axios.get(`https://api.decc0s.com/items/codex/${tokenId}`, {
      params: {
        fields: '*.*' // Get all fields including nested file objects
      }
    });

    const codexData = codexResponse.data as CodexData;

    return {
      codexData,
      owner: codexData.owner || "Unknown"
    };
  },
});

await suspenseToken();

// Accordion states
const isOpen = ref(false);
const isVisualAppearanceOpen = ref(false);
const isThingsILoveOpen = ref(false);
const isBiographyExpanded = ref(false);
const isWritingOpen = ref(false);
const isAdditionalInfoOpen = ref(false);
const isThumbnailHovered = ref(false);
const openMessageExampleIndex = ref<number | null>(null);

// Toggle functions
const toggleAccordion = () => { isOpen.value = !isOpen.value; };
const toggleVisualAppearanceAccordion = () => { isVisualAppearanceOpen.value = !isVisualAppearanceOpen.value; };
const toggleThingsILoveAccordion = () => { isThingsILoveOpen.value = !isThingsILoveOpen.value; };
const toggleBiography = () => { isBiographyExpanded.value = !isBiographyExpanded.value; };
const toggleWritingAccordion = () => { isWritingOpen.value = !isWritingOpen.value; };
const toggleAdditionalInfoAccordion = () => { isAdditionalInfoOpen.value = !isAdditionalInfoOpen.value; };
const toggleMessageExample = (index: number) => {
  openMessageExampleIndex.value = openMessageExampleIndex.value === index ? null : index;
};

const imageUrl = computed(() => {
  if (!token.value?.codexData) return '';

  // Use the thumbnail from Codex API with larger size for detail page
  if (token.value.codexData.thumbnail?.id) {
    return `https://api.decc0s.com/assets/${token.value.codexData.thumbnail.id}?key=s512`;
  }

  // Fallback to IPFS
  if (token.value.codexData.ipfs_final) {
    return `${config.ipfs.gateway}${token.value.codexData.ipfs_final}`;
  }

  return '';
});

defineOgImage({
  url: imageUrl.value,
});
</script>
