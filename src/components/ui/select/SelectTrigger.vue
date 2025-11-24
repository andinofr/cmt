<template>
  <button
    ref="triggerRef"
    type="button"
    :class="cn(
      'flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      customWidth ? '' : 'w-full',
      widthClass,
      className
    )"
    @click="handleClick"
    @keydown="handleKeyDown"
    :disabled="disabled"
    :data-placeholder="!select?.value?.value"
  >
    <slot />
    <ChevronDown class="h-4 w-4 opacity-50" />
  </button>
</template>

<script setup lang="ts">
import { inject, ref, onMounted, computed } from 'vue'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-vue-next'

interface SelectTriggerProps {
  className?: string
}

const props = defineProps<SelectTriggerProps>()

const select = inject('select') as any
const triggerRef = ref<HTMLElement>()

const disabled = select?.disabled
const customWidth = select?.width

// Computed width class
const widthClass = computed(() => {
  if (!customWidth) return ''

  if (typeof customWidth === 'number') {
    return `w-[${customWidth}px]`
  } else if (typeof customWidth === 'string') {
    // Handle Tailwind width classes like 'w-64', 'w-full', etc.
    return customWidth.startsWith('w-') ? customWidth : `w-${customWidth}`
  }
  return ''
})

const handleClick = () => {
  select?.toggleOpen()
}

const handleKeyDown = (event: KeyboardEvent) => {
  select?.handleKeyDown(event)
}

onMounted(() => {
  // Store trigger reference for positioning
  if (triggerRef.value && select?.setTriggerElement) {
    select.setTriggerElement(triggerRef.value)
  }
})
</script>