<template>
  <div :class="cn('relative bg-white rounded-lg shadow-lg max-w-2xl w-full p-4 max-h-[90vh] overflow-auto', className)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";

interface DialogContentProps {
  className?: string;
}

defineProps<DialogContentProps>();
</script>
