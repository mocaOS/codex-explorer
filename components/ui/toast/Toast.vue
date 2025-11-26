<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import type { ToastRootProps } from "radix-vue";
import { cn } from '@/lib/utils'
import { ToastRoot, type ToastRootEmits, useForwardPropsEmits } from 'radix-vue'
import { computed } from 'vue'
import { type VariantProps, cva } from "class-variance-authority";

const toastVariants = cva(
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[--radix-toast-swipe-end-x] data-[swipe=move]:translate-x-[--radix-toast-swipe-move-x] data-[swipe=move]:transition-none dark:border-slate-800",
  {
    variants: {
      variant: {
        default: "border-golden-800 text-golden border-2 bg-black/70 dark:bg-slate-950 dark:text-slate-50",
        destructive: "destructive group border-red-500 bg-red-500 text-slate-50 dark:border-red-900 dark:bg-red-900 dark:text-slate-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type ToastVariants = VariantProps<typeof toastVariants>;

interface ToastProps extends ToastRootProps {
  class?: HTMLAttributes["class"];
  variant?: ToastVariants["variant"];
  onOpenChange?: ((value: boolean) => void) | undefined;
}

const props = defineProps<ToastProps>()

const emits = defineEmits<ToastRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ToastRoot
    v-bind="forwarded"
    :class="cn(toastVariants({ variant }), props.class)"
    @update:open="onOpenChange"
  >
    <slot />
  </ToastRoot>
</template>
