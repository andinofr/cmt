<template>
  <label :class="cn('px-2 py-1.5 text-sm font-semibold', className)">
    <slot />
  </label>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

interface SelectLabelProps {
  className?: string
}

defineProps<SelectLabelProps>()
</script>