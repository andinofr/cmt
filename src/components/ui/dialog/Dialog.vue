<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/70" @click="handleClose" />

    <!-- Dialog Content -->
    <div class="relative bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface DialogProps {
  open: boolean;
}

const props = defineProps<DialogProps>();

const emit = defineEmits<{
  "update:open": [open: boolean];
}>();

const handleClose = () => {
  emit("update:open", false);
};
</script>
