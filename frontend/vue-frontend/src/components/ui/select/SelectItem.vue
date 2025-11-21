<template>
  <option :value="value" :disabled="disabled">
    <slot />
  </option>
</template>

<script setup lang="ts">
interface SelectItemProps {
  value: string
  disabled?: boolean
}

defineProps<SelectItemProps>()
</script>