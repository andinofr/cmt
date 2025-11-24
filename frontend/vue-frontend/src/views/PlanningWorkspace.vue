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
        <h2 class="text-4xl font-light text-slate-800 mb-2">Planning Phase</h2>
        <p class="text-slate-500">Contract Reference Library & Active Planning Documents</p>
      </div>

      <!-- Tabs -->
      <Tabs v-model="activeTab" class="space-y-6">
        <div class="flex justify-between">
          <TabsList className="bg-white p-1 shadow-sm border border-slate-200">
            <TabsTrigger
              value="catalogue"
              className="data-[state=active]:bg-[#007d79] data-[state=active]:text-white px-8 py-2.5">
              Contract Catalogue
            </TabsTrigger>
            <TabsTrigger
              value="document"
              className="data-[state=active]:bg-[#007d79] data-[state=active]:text-white px-8 py-2.5">
              Planning Documents
            </TabsTrigger>
            <TabsTrigger
              value="review"
              v-if="user?.role === 'CMT_TEAM'"
              className="data-[state=active]:bg-[#007d79] data-[state=active]:text-white px-8 py-2.5">
              Review Required
            </TabsTrigger>
          </TabsList>

          <Button @click="uploadModalOpen = true" className="bg-[#007d79] hover:bg-[#006663] flex items-center gap-2">
            <UploadIcon class="w-4 h-4" />
            Upload Document
          </Button>
        </div>

        <!-- Contract Catalogue Tab -->
        <TabsContent value="catalogue" class="space-y-8">
          <!-- Work Package - Pricing Catalogue -->
          <Card class="shadow-lg border-0 mb-4">
            <CardContent class="p-8">
              <h3 class="text-2xl font-semibold text-slate-800 mb-6">Work Package Pricing Catalogue</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="template in CONTRACT_TEMPLATES.pricingCatalogue"
                  :key="template.id"
                  class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <FileText class="w-6 h-6 text-white" />
                    </div>
                    <div class="flex-1">
                      <p class="font-medium text-slate-800">
                        {{ template.code }} Cost Structure of {{ template.category }}
                      </p>
                      <p class="text-sm text-slate-600">{{ template.category }} | {{ template.workName }}</p>
                      <p class="text-xs text-slate-500 mt-1">
                        Uploaded:
                        {{
                          new Date(template.uploadDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        }}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    @click="handleDownload(template.fileName)"
                    class="hover:bg-blue-200">
                    <Download class="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Work Package - Scope of Works -->
          <Card class="shadow-lg border-0 mb-4">
            <CardContent class="p-8">
              <h3 class="text-2xl font-semibold text-slate-800 mb-6">Work Package Scope of Works</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="template in CONTRACT_TEMPLATES.scopeOfWorks"
                  :key="template.id"
                  class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <FileText class="w-6 h-6 text-white" />
                    </div>
                    <div class="flex-1">
                      <p class="font-medium text-slate-800">
                        {{ template.code }} Reference Scope of Works of {{ template.category }}
                      </p>
                      <p class="text-sm text-slate-600">{{ template.category }}</p>
                      <p class="text-xs text-slate-500 mt-1">
                        Uploaded:
                        {{
                          new Date(template.uploadDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        }}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    @click="handleDownload(template.fileName)"
                    class="hover:bg-blue-200">
                    <Download class="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Work Package Library -->
          <Card class="shadow-lg border-0">
            <CardContent class="p-8">
              <h3 class="text-2xl font-semibold text-slate-800 mb-6">Work Package Library</h3>
              <p class="text-slate-600 mb-4">Archived versions of work package documents</p>

              <div v-if="WORK_PACKAGE_LIBRARY.length > 0" class="space-y-4">
                <div
                  v-for="template in WORK_PACKAGE_LIBRARY"
                  :key="template.id"
                  class="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                      <FileText class="w-6 h-6 text-white" />
                    </div>
                    <div class="flex-1">
                      <p class="font-medium text-slate-800">
                        {{ template.code }} {{ template.workName ? template.workName : template.category }} (Archive)
                      </p>
                      <p class="text-sm text-slate-600">
                        Category: {{ template.category }} | {{ template.workName || "Reference Document" }}
                      </p>
                      <p class="text-xs text-slate-500 mt-1">
                        Uploaded:
                        {{
                          new Date(template.uploadDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        }}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    @click="handleDownload(template.fileName)"
                    class="hover:bg-gray-200">
                    <Download class="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div v-else class="text-center py-8">
                <Folder class="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p class="text-slate-500">No archived documents in library</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <!-- Planning Document Tab -->
        <TabsContent value="document" class="space-y-6">
          <!-- Area Tabs -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-semibold text-slate-800">Planning Documents</h3>
            </div>

            <Tabs v-model="selectedArea">
              <TabsList className="w-full justify-start bg-slate-100 p-1 flex-wrap">
                <TabsTrigger
                  v-for="area in allAreaOptions"
                  :key="area"
                  :value="area"
                  className="data-[state=active]:bg-white px-6 py-2">
                  {{ area === "all" ? "All Areas" : area }}
                </TabsTrigger>
              </TabsList>

              <TabsContent v-for="area in allAreaOptions" :key="area" :value="area" class="mt-6">
                <div class="space-y-6">
                  <div
                    v-for="[groupName, docs] in Object.entries(groupDocumentsByCategory(getAreaDocuments(area)))"
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
                        <div class="flex items-start justify-between">
                          <div class="flex-1">
                            <p class="font-medium text-slate-800 mb-1">
                              <a
                                v-if="doc.linkUrl"
                                :href="doc.linkUrl"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer">
                                {{ doc.linkUrl }}
                                <span class="text-xs ml-1">🔗</span>
                              </a>
                              <span v-else>{{ doc.fileName }}</span>
                            </p>
                            <p class="text-sm text-slate-600 mb-2">{{ doc.description }}</p>
                            <div class="flex gap-2 flex-wrap">
                              <span class="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                {{ doc.category }}
                              </span>
                              <span
                                v-if="area === 'all'"
                                class="text-xs px-2 py-1 bg-green-100 text-green-700 rounded font-medium">
                                {{ doc.area }}
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

        <!-- Review Required Tab (CMT only) -->
        <TabsContent v-if="user?.role === 'CMT_TEAM'" value="review" class="space-y-6">
          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-semibold text-slate-800">Documents Pending Review</h3>
              <span class="text-sm text-slate-500">
                {{ getPendingReviewDocuments().length }} document(s) pending review
              </span>
            </div>

            <div v-if="getPendingReviewDocuments().length > 0" class="space-y-4">
              <div
                v-for="doc in getPendingReviewDocuments()"
                :key="doc.id"
                class="border border-amber-200 bg-amber-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                        PENDING REVIEW
                      </span>
                      <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {{ doc.category }}
                      </span>
                      <span class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
                        {{ doc.area }}
                      </span>
                      <span class="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded">
                        {{ new Date(doc.uploadDate).toLocaleDateString() }}
                      </span>
                    </div>

                    <p class="font-medium text-slate-800 mb-1">
                      <a
                        v-if="doc.linkUrl"
                        :href="doc.linkUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer">
                        {{ doc.linkUrl }}
                        <span class="text-xs ml-1">🔗</span>
                      </a>
                      <span v-else>{{ doc.fileName }}</span>
                    </p>
                    <p class="text-sm text-slate-600 mb-3">{{ doc.description }}</p>

                    <!-- Metadata Display -->
                    <div v-if="doc.metadata && Object.keys(doc.metadata).length > 0" class="mb-3">
                      <div class="text-xs text-slate-500 mb-1">Metadata:</div>
                      <div class="flex gap-1 flex-wrap">
                        <span
                          v-for="[key, value] in Object.entries(doc.metadata)"
                          :key="key"
                          class="text-xs px-1 py-0.5 bg-gray-100 text-gray-600 rounded">
                          {{ key }}: {{ value }}
                        </span>
                      </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        @click="handleApproveDocument(doc.id)"
                        className="bg-green-600 hover:bg-green-700 text-white">
                        ✓ Approve
                      </Button>
                      <Button size="sm" variant="destructive" @click="handleRejectDocument(doc.id)">✗ Reject</Button>
                      <Button size="sm" variant="ghost">
                        <Download class="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-12">
              <Folder class="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h4 class="text-lg font-medium text-slate-600 mb-2">No Documents Pending Review</h4>
              <p class="text-slate-500">All documents have been reviewed or no documents have been submitted yet.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>

    <UploadModal
      :open="uploadModalOpen"
      @close="uploadModalOpen = false"
      workspace="planning"
      :preSelectedArea="selectedArea" />
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
import { Building2, Bell, User, LogOut, Home, Download, FileText, Folder, Upload as UploadIcon } from "lucide-vue-next";
import {
  CONTRACT_TEMPLATES,
  WORK_PACKAGE_LIBRARY,
  AREAS,
  getDocumentsFromStorage,
  approveDocument,
  rejectDocument,
  type Document,
} from "@/data/mockData";
import { useToast } from "@/composables/useToast";

const router = useRouter();
const authStore = useAuthStore();
const { toast } = useToast();

const user = computed(() => authStore.user);
const activeTab = ref("catalogue");
const selectedArea = ref("all"); // Default to "all" areas
const uploadModalOpen = ref(false);

// All areas including "All Areas" option
const allAreaOptions = ["all", ...AREAS];

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};

const handleDownload = (fileName: string) => {
  toast({
    title: "Download Started",
    description: `Downloading ${fileName}...`,
  });
};

const getAreaDocuments = (area: string): Document[] => {
  const allDocs = getDocumentsFromStorage();

  if (area === "all") {
    // Return all approved planning documents regardless of area
    return allDocs.filter((doc) => doc.workspace === "planning" && doc.status === "approved");
  } else {
    // Return approved documents for specific area
    return allDocs.filter((doc) => doc.workspace === "planning" && doc.area === area && doc.status === "approved");
  }
};

const getAllPlanningDocuments = (): Document[] => {
  const allDocs = getDocumentsFromStorage();
  return allDocs.filter((doc) => doc.workspace === "planning" && doc.status === "approved");
};

const getPendingReviewDocuments = (): Document[] => {
  const allDocs = getDocumentsFromStorage();
  return allDocs.filter((doc) => doc.status === "pending_review");
};

// Approval functions
const handleApproveDocument = (documentId: string, reviewNotes?: string) => {
  if (approveDocument(documentId, user.value?.name || "CMT Admin", reviewNotes)) {
    toast({
      title: "Document Approved",
      description: "Document has been approved and moved to Planning Documents.",
    });
  } else {
    toast({
      title: "Error",
      description: "Failed to approve document.",
      variant: "destructive",
    });
  }
};

const handleRejectDocument = (documentId: string, reviewNotes?: string) => {
  if (rejectDocument(documentId, user.value?.name || "CMT Admin", reviewNotes)) {
    toast({
      title: "Document Rejected",
      description: "Document has been rejected.",
    });
  } else {
    toast({
      title: "Error",
      description: "Failed to reject document.",
      variant: "destructive",
    });
  }
};

const groupDocumentsByCategory = (documents: Document[]) => {
  const groups = {
    "Contract Request Forms": [] as Document[],
    "Procurement Committee": [] as Document[],
    "Submitted Docs": [] as Document[],
  };

  documents.forEach((doc) => {
    if (doc.category === "Contract Request Form") {
      groups["Contract Request Forms"].push(doc);
    } else if (doc.category === "Procurement Request") {
      groups["Procurement Committee"].push(doc);
    } else {
      groups["Submitted Docs"].push(doc);
    }
  });

  return groups;
};
</script>
