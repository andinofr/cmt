<template>
  <div class="w-full">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue'

interface TabsProps {
  modelValue?: string
  defaultValue?: string
}

const props = withDefaults(defineProps<TabsProps>(), {
  defaultValue: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const activeTab = ref(props.modelValue || props.defaultValue)

watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    activeTab.value = newValue
  }
})

const setActiveTab = (value: string) => {
  activeTab.value = value
  emit('update:modelValue', value)
}

provide('tabs', {
  activeTab,
  setActiveTab
})
</script>