<template>
  <textarea
    :value="modelValue"
    @input="handleInput"
    :class="
      cn(
        'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )
    "
    :placeholder="placeholder"
    :disabled="disabled"
    :rows="rows" />
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";

interface TextareaProps {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  className?: string;
}

const props = withDefaults(defineProps<TextareaProps>(), {
  rows: 3,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);
};
</script>
