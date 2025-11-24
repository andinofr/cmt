<template>
  <button
    :data-state="isActive ? 'active' : 'inactive'"
    :class="
      cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        isActive ? 'bg-background text-foreground shadow' : '',
        className,
      )
    "
    @click="handleClick"
    :disabled="disabled">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import { cn } from "@/lib/utils";

interface TabsTriggerProps {
  value: string;
  disabled?: boolean;
  className?: string;
}

const props = defineProps<TabsTriggerProps>();

const tabs = inject("tabs") as any;
const isActive = computed(() => tabs?.activeTab.value === props.value);

const handleClick = () => {
  if (!props.disabled && tabs) {
    tabs.setActiveTab(props.value);
  }
};
</script>
