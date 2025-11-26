<template>
  <div class="relative">
    <!-- Mobile sidebar overlay -->
    <div
      @click="closeMobileMenu"
      v-if="isMobileMenuOpen && showMobileMenu"
      class="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
    />

    <header v-show="!isMuseumMode">
      <nav class="light:bg-white relative z-50 border-b border-white/10 bg-black">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div class="relative flex h-28 items-center justify-center overflow-y-hidden">
            <!-- Burger menu button for mobile - only show on pages other than token details -->
            <button
              v-if="showMobileMenu"
              @click="toggleMobileMenu"
              class="absolute left-2 rounded-md p-2 text-white hover:bg-gray-700 focus:outline-none md:hidden"
            >
              <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  v-if="!isMobileMenuOpen"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div class="flex items-center">
              <NuxtLink to="/" class="flex shrink-0 items-center">
                <div class="px-3">
                  <img src="/decco-black_no-bkgrnd.png" class="h-[120px] w-auto rounded" alt="DeCC0 Logo" />
                </div>
                <h1 class="font-bold uppercase">
                  The Codex
                </h1>
              </NuxtLink>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <slot />
  </div>
</template>

<script setup lang="ts">
const isMobileMenuOpen = useState("isMobileMenuOpen", () => false);
const isMuseumMode = useState("isMuseumMode", () => false);
const route = useRoute();

// Computed property to determine if mobile menu should be shown
// Hide on token details page (route pattern: /[tokenId])
const showMobileMenu = computed(() => {
  return !route.path.match(/^\/\d+$/);
});

// Function to lock scrolling with proper scrollbar handling
function lockScroll() {
  // Calculate the scrollbar width
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

  // Prevent body scrolling and compensate for scrollbar width
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollBarWidth}px`;

  // Also prevent scrolling on the html element for some browsers
  document.documentElement.style.overflow = "hidden";
  document.documentElement.style.paddingRight = `${scrollBarWidth}px`;
}

// Function to unlock scrolling
function unlockScroll() {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
  document.documentElement.style.overflow = "";
  document.documentElement.style.paddingRight = "";
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;

  // Prevent body scrolling when menu is open
  if (isMobileMenuOpen.value) {
    lockScroll();
  } else {
    unlockScroll();
  }
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
  unlockScroll();
}

// Function to handle viewport resize
function handleResize() {
  // If we're on desktop size (md breakpoint is 768px) and menu is open, close it
  if (window.innerWidth >= 768 && isMobileMenuOpen.value) {
    closeMobileMenu();
  }
}

// Close mobile menu when route changes
watch(route, () => {
  closeMobileMenu();
});

// Exit museum mode and fullscreen when navigating to token detail pages
watch(() => route.path, async (newPath, oldPath) => {
  // If navigating to a token detail page from index, exit museum mode and fullscreen
  if (newPath.match(/^\/\d+$/) && oldPath === '/') {
    isMuseumMode.value = false;

    // Exit fullscreen if active
    if (document.fullscreenElement && document.exitFullscreen) {
      try {
        await document.exitFullscreen();
      } catch (error) {
        console.log('Exit fullscreen failed:', error);
      }
    }
  }
});

// Setup resize listener
onMounted(() => {
  window.addEventListener("resize", handleResize);

  // Ensure scrolling is unlocked if component is mounted with menu closed
  if (!isMobileMenuOpen.value) {
    unlockScroll();
  }
});

// Cleanup on unmount
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  unlockScroll();
});
</script>
