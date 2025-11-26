<template>
  <tr :class="cn('border-b transition-colors data-[state=selected]:bg-slate-100', props.class)">
    <slot />
  </tr>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>
