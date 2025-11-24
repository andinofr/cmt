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
        <h2 class="text-4xl font-light text-slate-800 mb-2">Execution Phase</h2>
        <p class="text-slate-500">Contract Lifecycle Management & Monitoring</p>
      </div>

      <!-- Area Filter -->
      <div class="mb-6 flex items-center gap-4">
        <label class="text-sm font-medium text-slate-700">Filter by Area:</label>
        <Select v-model="selectedArea" width="w-64">
          <SelectTrigger>
            <SelectValue placeholder="Select area" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Areas" :index="0">All Areas</SelectItem>
            <SelectItem v-for="(area, index) in AREAS" :key="area" :value="area" :index="index + 1">
              {{ area }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <!-- Tabs -->
      <Tabs v-model="activeTab" class="space-y-6">
        <TabsList class="bg-white p-1 shadow-sm border border-slate-200">
          <TabsTrigger
            value="lifecycle"
            class="data-[state=active]:bg-[#007d79] data-[state=active]:text-white px-8 py-2.5">
            Contract Lifecycle
          </TabsTrigger>
          <TabsTrigger
            value="reminders"
            class="data-[state=active]:bg-[#007d79] data-[state=active]:text-white px-8 py-2.5">
            Expiry Reminders
          </TabsTrigger>
        </TabsList>

        <!-- Contract Lifecycle Tab -->
        <TabsContent value="lifecycle" className="space-y-6">
          <!-- Active Contracts -->
          <Card class="shadow-lg border-0">
            <CardContent class="p-8">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-2xl font-semibold text-slate-800">Active Contracts</h3>
                <Button
                  @click="uploadModalOpen = true"
                  className="bg-[#007d79] hover:bg-[#006663] flex items-center gap-2">
                  <UploadIcon class="w-4 h-4" />
                  Upload Document
                </Button>
              </div>

              <div class="space-y-4">
                <div
                  v-for="contract in getFilteredContracts()"
                  :key="contract.id"
                  :class="`border-l-4 ${getStatusColors(getContractExpiryStatus(contract.endDate))} p-4 rounded-lg hover:shadow-md transition-shadow`">
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <div class="flex items-center gap-3 mb-2">
                        <p class="font-semibold text-lg text-slate-800">{{ contract.id }}</p>
                        <span class="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                          {{ contract.area }}
                        </span>
                        <span
                          v-if="getContractExpiryStatus(contract.endDate) !== 'normal'"
                          :class="`text-xs px-2 py-1 rounded flex items-center gap-1 ${
                            getContractExpiryStatus(contract.endDate) === 'critical'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`">
                          <AlertCircle
                            v-if="getContractExpiryStatus(contract.endDate) === 'critical'"
                            class="w-3 h-3" />
                          <AlertTriangle v-else class="w-3 h-3" />
                          {{ getContractExpiryStatus(contract.endDate) === "critical" ? "Expiring Soon" : "Warning" }}
                        </span>
                      </div>
                      <p class="text-slate-700 mb-1">{{ contract.title }}</p>
                      <p class="text-sm text-slate-600 mb-2">{{ contract.vendorName }}</p>
                      <div class="flex gap-4 text-sm">
                        <span class="text-slate-600">
                          <strong>Value:</strong>
                          ${{ contract.value.toLocaleString() }}
                        </span>
                        <span class="text-slate-600">
                          <strong>Start:</strong>
                          {{ new Date(contract.startDate).toLocaleDateString() }}
                        </span>
                        <span class="text-slate-600">
                          <strong>End:</strong>
                          {{ new Date(contract.endDate).toLocaleDateString() }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Document Management -->
          <Card class="shadow-lg border-0">
            <CardContent class="p-8">
              <h3 class="text-2xl font-semibold text-slate-800 mb-6">Contract Documents</h3>
              <div class="space-y-6">
                <div
                  v-for="[groupName, docs] in Object.entries(groupDocumentsByCategory(getAreaDocuments(selectedArea)))"
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
                        <FileText class="w-5 h-5 text-[#007d79] mt-1" />
                        <div class="flex-1">
                          <p class="font-medium text-slate-800 mb-1">
                            {{ doc.fileName || doc.linkUrl }}
                          </p>
                          <p class="text-sm text-slate-600 mb-2">{{ doc.description }}</p>
                          <p v-if="doc.contractId" class="text-xs text-slate-500 mb-2">Related: {{ doc.contractId }}</p>
                          <div class="flex gap-2 flex-wrap">
                            <span class="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                              {{ doc.category }}
                            </span>
                            <span class="text-xs px-2 py-1 bg-slate-200 text-slate-700 rounded">
                              {{ doc.area }}
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <!-- Expiry Reminders Tab -->
        <TabsContent value="reminders">
          <Card class="shadow-lg border-0">
            <CardContent class="p-8">
              <h3 class="text-2xl font-semibold text-slate-800 mb-6">Contract Expiry Reminders</h3>
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="border-b-2 border-slate-200">
                      <th class="text-left py-3 px-4 font-semibold text-slate-700">Contract ID</th>
                      <th class="text-left py-3 px-4 font-semibold text-slate-700">Title</th>
                      <th class="text-left py-3 px-4 font-semibold text-slate-700">Vendor</th>
                      <th class="text-left py-3 px-4 font-semibold text-slate-700">Area</th>
                      <th class="text-left py-3 px-4 font-semibold text-slate-700">End Date</th>
                      <th class="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="contract in getExpiringContracts()"
                      :key="contract.id"
                      :class="`${getRowColor(getContractExpiryStatus(contract.endDate))} border-b border-slate-200`">
                      <td class="py-3 px-4 font-medium text-slate-800">{{ contract.id }}</td>
                      <td class="py-3 px-4 text-slate-700">{{ contract.title }}</td>
                      <td class="py-3 px-4 text-slate-700">{{ contract.vendorName }}</td>
                      <td class="py-3 px-4">
                        <span class="text-xs px-2 py-1 bg-white rounded">{{ contract.area }}</span>
                      </td>
                      <td class="py-3 px-4 text-slate-700">
                        {{ new Date(contract.endDate).toLocaleDateString() }}
                      </td>
                      <td class="py-3 px-4">
                        <span
                          :class="`flex items-center gap-1 text-sm font-medium ${
                            getContractExpiryStatus(contract.endDate) === 'critical'
                              ? 'text-red-700'
                              : 'text-yellow-700'
                          }`">
                          <AlertCircle
                            v-if="getContractExpiryStatus(contract.endDate) === 'critical'"
                            class="w-4 h-4" />
                          <AlertTriangle v-else class="w-4 h-4" />
                          {{
                            getContractExpiryStatus(contract.endDate) === "critical"
                              ? "Critical (<3 months)"
                              : "Warning (<6 months)"
                          }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="getExpiringContracts().length === 0" class="text-center py-12">
                  <AlertTriangle class="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p class="text-slate-500">No contracts nearing expiration</p>
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
      workspace="execution"
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
import Select from "@/components/ui/select/Select.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";
import {
  Building2,
  Bell,
  User,
  LogOut,
  Home,
  Upload as UploadIcon,
  FileText,
  Folder,
  AlertTriangle,
  AlertCircle,
} from "lucide-vue-next";
import {
  AREAS,
  CONTRACTS,
  getContractExpiryStatus,
  getDocumentsFromStorage,
  type Contract,
  type Document,
} from "@/data/mockData";

const router = useRouter();
const authStore = useAuthStore();

const user = computed(() => authStore.user);
const activeTab = ref("lifecycle");
const selectedArea = ref("All Areas");
const uploadModalOpen = ref(false);

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};

const getFilteredContracts = (): Contract[] => {
  if (selectedArea.value === "All Areas") return CONTRACTS;
  return CONTRACTS.filter((c) => c.area === selectedArea.value);
};

const getExpiringContracts = (): Contract[] => {
  return CONTRACTS.filter((contract) => {
    const status = getContractExpiryStatus(contract.endDate);
    return status === "warning" || status === "critical";
  }).sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
};

const getAreaDocuments = (area: string): Document[] => {
  const allDocs = getDocumentsFromStorage();
  return allDocs.filter((doc) => {
    if (doc.workspace !== "execution") return false;
    if (area === "All Areas") return true;
    return doc.area === area;
  });
};

const groupDocumentsByCategory = (documents: Document[]) => {
  const groups = {
    "Administration Management": [] as Document[],
    "Deviation Management": [] as Document[],
  };

  documents.forEach((doc) => {
    if (doc.category === "Administration Document" || doc.category === "Minutes of Meeting") {
      groups["Administration Management"].push(doc);
    } else if (doc.category === "Deviation Form") {
      groups["Deviation Management"].push(doc);
    }
  });

  return groups;
};

const getStatusColors = (status: string) => {
  const statusColors = {
    normal: "border-l-[#007d79] bg-slate-50",
    warning: "border-l-yellow-500 bg-yellow-50",
    critical: "border-l-red-500 bg-red-50",
  };
  return statusColors[status as keyof typeof statusColors] || statusColors.normal;
};

const getRowColor = (status: string) => {
  return status === "critical" ? "bg-red-100" : "bg-yellow-100";
};
</script>
