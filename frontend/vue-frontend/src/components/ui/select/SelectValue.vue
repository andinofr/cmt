<template>
  <span v-if="placeholder && !modelValue" class="text-muted-foreground">
    {{ placeholder }}
  </span>
  <span v-else>
    {{ modelValue }}
  </span>
</template>

<script setup lang="ts">
interface SelectValueProps {
  placeholder?: string
  modelValue?: string
}

defineProps<SelectValueProps>()
</script>