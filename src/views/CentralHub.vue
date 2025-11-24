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
          <Button variant="ghost" size="sm" @click="router.push('/workspace-selector')" class="flex items-center gap-2">
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
            class="rounded-full hover:bg-red-50 hover:text-red-600">
            <LogOut class="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-8 py-8">
      <div class="mb-8">
        <h2 class="text-4xl font-light text-slate-800 mb-2">Central Hub</h2>
        <p class="text-slate-500">Dashboard Metrics & Central Repository</p>
      </div>

      <!-- Tabs -->
      <Tabs v-model="activeTab" class="space-y-6">
        <TabsList class="bg-white p-1 shadow-sm border border-slate-200">
          <TabsTrigger
            value="dashboard"
            class="data-[state=active]:bg-[#007d79] data-[state=active]:text-white px-8 py-2.5">
            Dashboard
          </TabsTrigger>
          <TabsTrigger
            value="document"
            class="data-[state=active]:bg-[#007d79] data-[state=active]:text-white px-8 py-2.5">
            Central Documents
          </TabsTrigger>
        </TabsList>

        <!-- Dashboard Tab -->
        <TabsContent value="dashboard" className="space-y-6">
          <!-- Metrics Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <!-- Total Cost Avoidance -->
            <Card class="shadow-lg border-0 overflow-hidden">
              <div class="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 text-white">
                <div class="flex items-center justify-between mb-4">
                  <DollarSign class="w-10 h-10" />
                  <TrendingUp class="w-6 h-6 opacity-70" />
                </div>
                <p class="text-sm opacity-90 mb-1">Total Cost Avoidance</p>
                <p class="text-3xl font-bold">${{ getTotalCostAvoidance().toLocaleString() }}</p>
              </div>
            </Card>

            <!-- Active Contracts -->
            <Card class="shadow-lg border-0 overflow-hidden">
              <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
                <div class="flex items-center justify-between mb-4">
                  <FileText class="w-10 h-10" />
                </div>
                <p class="text-sm opacity-90 mb-1">Active Contracts</p>
                <p class="text-3xl font-bold">{{ getActiveContractsCount() }}</p>
              </div>
            </Card>

            <!-- Expiring Contracts -->
            <Card class="shadow-lg border-0 overflow-hidden">
              <div class="bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white">
                <div class="flex items-center justify-between mb-4">
                  <AlertTriangle class="w-10 h-10" />
                </div>
                <p class="text-sm opacity-90 mb-1">Expiring Soon</p>
                <p class="text-3xl font-bold">{{ getExpiringContractsCount() }}</p>
              </div>
            </Card>
          </div>

          <!-- Contract Value by Area -->
          <Card class="shadow-lg border-0 mb-6">
            <CardContent class="p-8">
              <h3 class="text-2xl font-semibold text-slate-800 mb-6">Contract Value by Area</h3>
              <div class="space-y-4">
                <div v-for="area in AREAS" :key="area">
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-3">
                      <span class="font-medium text-slate-800">{{ area }}</span>
                      <span class="text-sm text-slate-500">({{ getAreaContracts(area).length }} contracts)</span>
                    </div>
                    <span class="font-semibold text-slate-800">${{ getAreaTotalValue(area).toLocaleString() }}</span>
                  </div>
                  <div class="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      class="bg-gradient-to-r from-[#007d79] to-[#009d95] h-full rounded-full transition-all duration-500"
                      :style="{ width: `${getAreaPercentage(area)}%` }"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Request Process Status -->
          <Card class="shadow-lg border-0">
            <CardContent class="p-8">
              <h3 class="text-2xl font-semibold text-slate-800 mb-6">Request Process Status</h3>
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div
                  v-for="item in requestStatusItems"
                  :key="item.status"
                  :class="`p-6 rounded-lg border-2 ${item.color}`">
                  <p class="text-sm font-medium mb-2">{{ item.status }}</p>
                  <p class="text-3xl font-bold">{{ item.count }}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <!-- Central Document Tab -->
        <TabsContent value="document" className="space-y-6">
          <Card class="shadow-lg border-0">
            <CardContent class="p-8">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h3 class="text-2xl font-semibold text-slate-800 mb-2">Central Repository</h3>
                  <p class="text-slate-500">Reports & Innovation Centre Documents</p>
                </div>
                <Button @click="uploadModalOpen = true" class="bg-[#007d79] hover:bg-[#006663] flex items-center gap-2">
                  <UploadIcon class="w-4 h-4" />
                  Upload Document
                </Button>
              </div>

              <!-- Area Filter -->
              <div class="mb-6">
                <Tabs v-model="selectedArea">
                  <TabsList class="w-full justify-start bg-slate-100 p-1">
                    <TabsTrigger value="All Areas" class="data-[state=active]:bg-white px-6 py-2">
                      All Areas
                    </TabsTrigger>
                    <TabsTrigger
                      v-for="area in AREAS"
                      :key="area"
                      :value="area"
                      class="data-[state=active]:bg-white px-6 py-2">
                      {{ area }}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <!-- Documents -->
              <div class="space-y-6">
                <div
                  v-for="[groupName, docs] in Object.entries(
                    groupDocumentsByCategory(getCentralDocuments(selectedArea)),
                  )"
                  :key="groupName">
                  <div class="flex items-center gap-3 mb-4">
                    <Folder class="w-5 h-5 text-[#007d79]" />
                    <h4 class="font-semibold text-lg text-slate-800">{{ groupName }}</h4>
                    <span class="text-sm text-slate-500">({{ docs.length }})</span>
                  </div>
                  <div v-if="docs.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4 pl-8">
                    <div
                      v-for="doc in docs"
                      :key="doc.id"
                      class="p-4 bg-slate-50 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                      <div class="flex items-start gap-3">
                        <FileText class="w-5 h-5 text-[#007d79] 11" />
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
                              {{ doc.area }}
                            </span>
                            <span class="text-xs px-2 py-1 bg-slate-200 text-slate-700 rounded">
                              {{ new Date(doc.uploadDate).toLocaleDateString() }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                    <Folder class="w-12 h-12 mx-auto mb-2 text-slate-300" />
                    <p class="text-slate-500">No documents in this category</p>
                  </div>
                </div>

                <div v-if="getCentralDocuments(selectedArea).length === 0" class="text-center py-12">
                  <FileText class="w-16 h-16 mx-auto mb-4 text-slate-300" />
                  <p class="text-slate-500 text-lg">No documents available</p>
                  <p class="text-slate-400 text-sm">Upload documents to get started</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>

    <UploadModal
      :open="uploadModalOpen"
      @close="uploadModalOpen = false"
      workspace="central-hub"
      :preSelectedArea="selectedArea !== 'All Areas' ? selectedArea : ''" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Button from "@/components/ui/button/Button.vue";
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import Tabs from "@/components/ui/tabs/Tabs.vue";
import TabsList from "@/components/ui/tabs/TabsList.vue";
import TabsTrigger from "@/components/ui/tabs/TabsTrigger.vue";
import TabsContent from "@/components/ui/tabs/TabsContent.vue";
import UploadModal from "@/components/UploadModal.vue";
import {
  Building2,
  Bell,
  User,
  LogOut,
  Home,
  DollarSign,
  FileText,
  AlertTriangle,
  Upload as UploadIcon,
  TrendingUp,
  Folder,
} from "lucide-vue-next";
import { CONTRACTS, AREAS, getContractExpiryStatus, getDocumentsFromStorage, type Document } from "@/data/mockData";

const router = useRouter();
const authStore = useAuthStore();

const user = computed(() => authStore.user);
const activeTab = ref("dashboard");
const selectedArea = ref("All Areas");
const uploadModalOpen = ref(false);

// Calculate metrics
const getTotalCostAvoidance = () => {
  // Simulate cost avoidance calculation (5% of total contract value)
  const totalValue = CONTRACTS.reduce((sum, contract) => sum + contract.value, 0);
  return Math.round(totalValue * 0.05);
};

const getActiveContractsCount = () => {
  return CONTRACTS.filter((c) => c.status === "Active").length;
};

const getExpiringContractsCount = () => {
  return CONTRACTS.filter((contract) => {
    const status = getContractExpiryStatus(contract.endDate);
    return status === "warning" || status === "critical";
  }).length;
};

const getCentralDocuments = (area: string): Document[] => {
  const allDocs = getDocumentsFromStorage();
  return allDocs.filter((doc) => {
    if (doc.workspace !== "central-hub") return false;
    if (area === "All Areas") return true;
    return doc.area === area;
  });
};

const groupDocumentsByCategory = (documents: Document[]) => {
  const groups = {
    Reports: [] as Document[],
    "Innovation Centre": [] as Document[],
  };

  documents.forEach((doc) => {
    if (doc.category === "Compliance Report" || doc.category === "Technical Specification") {
      groups["Reports"].push(doc);
    } else {
      groups["Innovation Centre"].push(doc);
    }
  });

  return groups;
};

const getAreaContracts = (area: string) => {
  return CONTRACTS.filter((c) => c.area === area);
};

const getAreaTotalValue = (area: string) => {
  return getAreaContracts(area).reduce((sum, c) => sum + c.value, 0);
};

const getAreaPercentage = (area: string) => {
  const totalValue = CONTRACTS.reduce((sum, c) => sum + c.value, 0);
  const areaValue = getAreaTotalValue(area);
  return (areaValue / totalValue) * 100;
};

const requestStatusItems = [
  { status: "Pending Review", count: 8, color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
  { status: "In Progress", count: 12, color: "bg-blue-100 text-blue-700 border-blue-300" },
  { status: "Approved", count: 24, color: "bg-emerald-100 text-emerald-700 border-emerald-300" },
  { status: "Completed", count: 45, color: "bg-slate-100 text-slate-700 border-slate-300" },
];

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};
</script>
