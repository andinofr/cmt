<template>
  <div class="relative">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch, toRefs, nextTick } from 'vue'

interface SelectProps {
  modelValue?: string
  defaultValue?: string
  disabled?: boolean
  required?: boolean
  width?: string | number
}

const props = withDefaults(defineProps<SelectProps>(), {
  defaultValue: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const open = ref(false)
const value = ref(props.modelValue || props.defaultValue)
const displayText = ref('')
const highlightedIndex = ref(-1)
const hoverIndex = ref(-1)

watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined) {
    value.value = newValue
  }
})

const toggleOpen = () => {
  if (!props.disabled) {
    open.value = !open.value
  }
}

const setOpen = (isOpen: boolean) => {
  if (!props.disabled) {
    open.value = isOpen
  }
}

const selectValue = (newValue: string, newText?: string) => {
  value.value = newValue
  displayText.value = newText || newValue
  emit('update:modelValue', newValue)
  open.value = false
}

const triggerElement = ref<HTMLElement>()

const setTriggerElement = (element: HTMLElement) => {
  triggerElement.value = element
}

// Keyboard navigation functions
const handleKeyDown = (event: KeyboardEvent, items?: string[]) => {
  if (!items || items.length === 0) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      if (!open.value) {
        open.value = true
        highlightedIndex.value = 0
      } else {
        highlightedIndex.value = (highlightedIndex.value + 1) % items.length
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (!open.value) {
        open.value = true
        highlightedIndex.value = items.length - 1
      } else {
        highlightedIndex.value = highlightedIndex.value <= 0
          ? items.length - 1
          : highlightedIndex.value - 1
      }
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      if (open.value && highlightedIndex.value >= 0 && highlightedIndex.value < items.length) {
        selectValue(items[highlightedIndex.value], items[highlightedIndex.value])
      } else {
        open.value = true
      }
      break
    case 'Escape':
      event.preventDefault()
      open.value = false
      highlightedIndex.value = -1
      break
  }
}

const resetHighlightedIndex = () => {
  highlightedIndex.value = -1
}

const setHoverIndex = (index: number) => {
  hoverIndex.value = index
}

const resetHoverIndex = () => {
  hoverIndex.value = -1
}

provide('select', {
  open,
  value,
  displayText,
  highlightedIndex,
  hoverIndex,
  triggerElement,
  width: props.width,
  disabled: props.disabled,
  required: props.required,
  toggleOpen,
  setOpen,
  selectValue,
  setTriggerElement,
  handleKeyDown,
  resetHighlightedIndex,
  setHoverIndex,
  resetHoverIndex
})
</script>