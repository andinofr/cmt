<template>
  <span class="block truncate">
    <span v-if="!hasValue" class="text-muted-foreground">
      {{ placeholder }}
    </span>
    <span v-else>
      {{ displayText }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'

interface SelectValueProps {
  placeholder?: string
}

const props = defineProps<SelectValueProps>()

const select = inject('select') as any

// Get the display text for the selected value
const displayText = computed(() => {
  // Check if we have a selected value
  const selectedValue = select?.value?.value || select?.value

  if (!selectedValue) {
    return ''
  }

  // Try to get display text from different sources
  if (select?.displayText?.value) {
    return select.displayText.value
  }

  if (select?.displayText?._rawValue) {
    return select.displayText._rawValue
  }

  // Fallback to the value itself
  return selectedValue
})

const hasValue = computed(() => {
  return !!displayText.value
})
</script>