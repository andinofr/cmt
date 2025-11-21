<template>
  <h2 :class="cn('text-lg font-semibold text-slate-900', className)">
    <slot />
  </h2>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";

interface DialogTitleProps {
  className?: string;
}

defineProps<DialogTitleProps>();
</script>
