<template>
  <ToastClose v-bind="delegatedProps" :class="cn('absolute right-2 top-2 rounded-md p-1 text-golden opacity-0 transition-opacity hover:text-golden-800 focus:outline-none group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-offset-red-600 dark:text-slate-50/50 dark:hover:text-slate-50', props.class)">
    <X class="size-4" />
  </ToastClose>
</template>

<script setup lang="ts">
import { X } from "lucide-vue-next";
import { ToastClose, type ToastCloseProps } from "radix-vue";
import { type HTMLAttributes, computed } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<ToastCloseProps & {
  class?: HTMLAttributes["class"];
}>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>
