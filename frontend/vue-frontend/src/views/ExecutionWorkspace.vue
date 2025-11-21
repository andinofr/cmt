<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <!-- Header -->
    <div class="bg-white border-b border-slate-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Settings class="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 class="text-xl font-bold text-slate-800">Execution Workspace</h1>
            <p class="text-sm text-slate-500">Contract Diagnostic & Lifecycle Management</p>
          </div>
        </div>
        <Button @click="router.push('/workspace-selector')" variant="outline">
          Back to Workspaces
        </Button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-8 py-16">
      <div class="text-center">
        <h2 class="text-4xl font-light text-slate-800 mb-4">Execution Workspace</h2>
        <p class="text-lg text-slate-500">Contract Diagnostic & Lifecycle Management</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from '@/components/ui/button/Button.vue'
import { Settings } from 'lucide-vue-next'

const router = useRouter()
</script>