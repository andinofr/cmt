<template>
  <div class="relative">
    <select
      :value="modelValue"
      @change="handleChange"
      :class="cn(
        'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className
      )"
      :disabled="disabled"
    >
      <slot />
    </select>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

interface SelectProps {
  modelValue?: string
  disabled?: boolean
  class?: string
}

const props = defineProps<SelectProps>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>