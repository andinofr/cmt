<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <!-- Header -->
    <div class="bg-white border-b border-slate-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-[#007d79] rounded-lg flex items-center justify-center">
              <Building2 class="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 class="text-xl font-bold text-slate-800">CMT PORTAL</h1>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            @click="router.push('/workspace-selector')"
            class="flex items-center gap-2"
          >
            <Home class="w-4 h-4" />
            Home
          </Button>
        </div>
        <div class="flex items-center gap-6">
          <div class="text-right">
            <p class="text-sm text-slate-500">Welcome,</p>
            <p class="font-semibold text-slate-800">{{ user?.name }}</p>
          </div>
          <Button variant="ghost" size="icon" class="rounded-full">
            <Bell class="w-5 h-5 text-slate-600" />
          </Button>
          <Button variant="ghost" size="icon" class="rounded-full">
            <User class="w-5 h-5 text-slate-600" />
          </Button>
          <Button
            @click="handleLogout"
            variant="ghost"
            size="icon"
            class="rounded-full hover:bg-red-50 hover:text-red-600"
          >
            <LogOut class="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-8 py-8">
      <div class="mb-8">
        <h2 class="text-4xl font-light text-slate-800 mb-2">Planning Phase</h2>
        <p class="text-slate-500">Contract Reference Library & Active Planning Documents</p>
      </div>

      <!-- Tabs -->
      <Tabs v-model="activeTab" class="space-y-6">
        <TabsList class="bg-white p-1 shadow-sm border border-slate-200">
          <TabsTrigger value="catalogue" class="data-[state=active]:bg-[#007d79] data-[state=active]:text-white px-8 py-2.5">
            Contract Catalogue
          </TabsTrigger>
          <TabsTrigger value="sharepoint" class="data-[state=active]:bg-[#007d79] data-[state=active]:text-white px-8 py-2.5">
            Planning SharePoint
          </TabsTrigger>
        </TabsList>

        <!-- Contract Catalogue Tab -->
        <TabsContent value="catalogue" class="space-y-8">
          <!-- Work Package - Pricing Catalogue -->
          <Card class="shadow-lg border-0">
            <CardContent class="p-8">
              <h3 class="text-2xl font-semibold text-slate-800 mb-6">Work Package - Pricing Catalogue</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="template in CONTRACT_TEMPLATES.pricingCatalogue"
                  :key="template.id"
                  class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <FileText class="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p class="font-medium text-slate-800">
                        {{ template.code }} Cost Structure of {{ template.category }}
                      </p>
                      <p class="text-sm text-slate-600">{{ template.workName }}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    @click="handleDownload(template.fileName)"
                    class="hover:bg-blue-200"
                  >
                    <Download class="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Work Package - Scope of Works -->
          <Card class="shadow-lg border-0">
            <CardContent class="p-8">
              <h3 class="text-2xl font-semibold text-slate-800 mb-6">Work Package - Scope of Works</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="template in CONTRACT_TEMPLATES.scopeOfWorks"
                  :key="template.id"
                  class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <FileText class="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p class="font-medium text-slate-800">
                        {{ template.code }} Reference Scope of Works of {{ template.category }}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    @click="handleDownload(template.fileName)"
                    class="hover:bg-blue-200"
                  >
                    <Download class="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <!-- Planning SharePoint Tab -->
        <TabsContent value="sharepoint" class="space-y-6">
          <!-- Area Tabs -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-semibold text-slate-800">Planning Documents by Area</h3>
              <Button
                @click="uploadModalOpen = true"
                class="bg-[#007d79] hover:bg-[#006663] flex items-center gap-2"
              >
                <UploadIcon class="w-4 h-4" />
                Upload Document
              </Button>
            </div>

            <Tabs v-model="selectedArea">
              <TabsList class="w-full justify-start bg-slate-100 p-1">
                <TabsTrigger
                  v-for="area in AREAS"
                  :key="area"
                  :value="area"
                  class="data-[state=active]:bg-white px-6 py-2"
                >
                  {{ area }}
                </TabsTrigger>
              </TabsList>

              <TabsContent
                v-for="area in AREAS"
                :key="area"
                :value="area"
                class="mt-6"
              >
                <div class="space-y-6">
                  <div
                    v-for="[groupName, docs] in Object.entries(groupDocumentsByCategory(getAreaDocuments(area)))"
                    :key="groupName"
                  >
                    <div class="flex items-center gap-3 mb-4">
                      <Folder class="w-5 h-5 text-[#007d79]" />
                      <h4 class="font-semibold text-lg text-slate-800">{{ groupName }}</h4>
                      <span class="text-sm text-slate-500">({{ docs.length }})</span>
                    </div>
                    <div v-if="docs.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4 pl-8">
                      <div
                        v-for="doc in docs"
                        :key="doc.id"
                        class="p-4 bg-slate-50 border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div class="flex items-start justify-between">
                          <div class="flex-1">
                            <p class="font-medium text-slate-800 mb-1">
                              {{ doc.fileName || doc.linkUrl }}
                            </p>
                            <p class="text-sm text-slate-600 mb-2">{{ doc.description }}</p>
                            <div class="flex gap-2 flex-wrap">
                              <span class="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                {{ doc.category }}
                              </span>
                              <span class="text-xs px-2 py-1 bg-slate-200 text-slate-700 rounded">
                                {{ new Date(doc.uploadDate).toLocaleDateString() }}
                              </span>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Download class="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                      <Folder class="w-12 h-12 mx-auto mb-2 text-slate-300" />
                      <p class="text-slate-500">No documents in this category</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>
      </Tabs>
    </div>

    <UploadModal
      :open="uploadModalOpen"
      @close="uploadModalOpen = false"
      workspace="planning"
      :preSelectedArea="selectedArea"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Button from '@/components/ui/button/Button.vue'
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import Tabs from '@/components/ui/tabs/Tabs.vue'
import TabsList from '@/components/ui/tabs/TabsList.vue'
import TabsTrigger from '@/components/ui/tabs/TabsTrigger.vue'
import TabsContent from '@/components/ui/tabs/TabsContent.vue'
import UploadModal from '@/components/UploadModal.vue'
import {
  Building2,
  Bell,
  User,
  LogOut,
  Home,
  Download,
  FileText,
  Folder,
  Upload as UploadIcon
} from 'lucide-vue-next'
import {
  CONTRACT_TEMPLATES,
  AREAS,
  getDocumentsFromStorage,
  type Document
} from '@/data/mockData'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const authStore = useAuthStore()
const { toast } = useToast()

const user = computed(() => authStore.user)
const activeTab = ref('catalogue')
const selectedArea = ref('Morowali')
const uploadModalOpen = ref(false)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const handleDownload = (fileName: string) => {
  toast({
    title: 'Download Started',
    description: `Downloading ${fileName}...`
  })
}

const getAreaDocuments = (area: string): Document[] => {
  const allDocs = getDocumentsFromStorage()
  return allDocs.filter(doc => doc.workspace === 'planning' && doc.area === area)
}

const groupDocumentsByCategory = (documents: Document[]) => {
  const groups = {
    'Contract Request Forms': [] as Document[],
    'Procurement Committee': [] as Document[],
    'Submitted Docs': [] as Document[]
  }

  documents.forEach(doc => {
    if (doc.category === 'Contract Request Form') {
      groups['Contract Request Forms'].push(doc)
    } else if (doc.category === 'Procurement Request') {
      groups['Procurement Committee'].push(doc)
    } else {
      groups['Submitted Docs'].push(doc)
    }
  })

  return groups
}
</script>