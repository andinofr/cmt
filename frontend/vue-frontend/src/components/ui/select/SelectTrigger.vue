<template>
  <div :class="cn('relative', className)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

interface SelectTriggerProps {
  class?: string
}

defineProps<SelectTriggerProps>()
</script>