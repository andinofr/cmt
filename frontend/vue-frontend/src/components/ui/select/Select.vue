<template>
  <div class="relative">
    <select
      :value="modelValue"
      @change="handleChange"
      :class="cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )"
      :disabled="disabled"
    >
      <option value="" disabled selected v-if="props.placeholder && !modelValue">
        {{ props.placeholder }}
      </option>
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
  placeholder?: string
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