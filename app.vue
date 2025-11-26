<template>
  <div class="font-display font-inter min-h-screen text-white overflow-x-hidden">
    <NuxtLayout>
      <NuxtLoadingIndicator color="#FFFFFF" />
      <NuxtPage />
      <ClientOnly>
        <Toaster />
      </ClientOnly>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
defineOgImage({
  url: "/social.jpg",
});
</script>

<style lang="css">
html, body {
  @apply bg-neutral-950;
}

html {
  overflow-y: scroll;
  overflow-x: hidden;
}

body {
  overflow-x: hidden;
}
</style>
