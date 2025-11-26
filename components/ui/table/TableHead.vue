<template>
  <th :class="cn('h-12 px-4 text-left align-middle font-normal text-xs uppercase text-white/30 [&:has([role=checkbox])]:pr-0', props.class)">
    <slot />
  </th>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>
