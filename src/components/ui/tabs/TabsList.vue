<template>
  <div
    :class="cn('inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground', className)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { cn } from "@/lib/utils";

interface TabsListProps {
  className?: string;
}

defineProps<TabsListProps>();
</script>
