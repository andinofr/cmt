<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="closeModal">
    <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden" @click.stop>
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-[#007d79] rounded-lg flex items-center justify-center">
            <History class="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 class="text-sm text-gray-500">Document History</h3>
            <p class="text-lg font-semibold text-gray-900">{{ documentInfo?.fileType }}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" @click="closeModal">
          <X class="w-5 h-5" />
        </Button>
      </div>

      <!-- Content -->
      <div class="px-6 py-4 overflow-y-auto max-h-[60vh]">
        <!-- Document Info -->
        <div class="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 class="font-medium text-gray-900 mb-2">Document Information</h4>
          <div class="grid grid-cols-[40%_60%] gap-4 text-sm">
            <div class="grid grid-cols-[80px_auto]">
              <span class="font-medium text-gray-700">Category</span>
              <span class="ml-2 text-gray-600">: {{ documentInfo?.category }}</span>
            </div>
            <div class="grid grid-cols-[80px_auto]">
              <span class="font-medium text-gray-700">File Name</span>
              <span class="ml-2 text-gray-600">: {{ documentInfo?.fileName }}</span>
            </div>
            <div class="grid grid-cols-[80px_auto]">
              <span class="font-medium text-gray-700">File Type</span>
              <span class="ml-2 text-gray-600">: {{ documentInfo?.fileType }}</span>
            </div>
            <div class="grid grid-cols-[80px_auto]">
              <span class="font-medium text-gray-700">Description</span>
              <span class="ml-2 text-gray-600">: {{ documentInfo?.description }}</span>
            </div>
          </div>
        </div>

        <!-- History Timeline -->
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900 mb-4">History Timeline</h4>

          <div v-if="history.length === 0" class="text-center py-8">
            <History class="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p class="text-gray-500">No history available for this document</p>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="(item, index) in history"
              :key="index"
              class="flex gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <DocumentCard
                class="w-full"
                :hide-history-button="true"
                :data="item"
                :variant="item.category === Category.PRICING_CATALOGUE ? 'pricing' : 'scope'"
                @download="handleDownload" />

              <!-- Icon and Date -->
              <!-- <div class="flex flex-col items-center">
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center"
                  :class="getHistoryIconClass(item.type)">
                  <component :is="getHistoryIcon(item.type)" class="w-5 h-5" />
                </div>
                <div v-if="index < history.length - 1" class="w-0.5 h-8 bg-gray-300 mt-2"></div>
              </div> -->

              <!-- Content -->
              <!-- <div class="flex-1">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-medium text-gray-900">{{ getHistoryTitle(item.type) }}</span>
                  <span class="text-xs text-gray-500">{{ formatDate(item.date) }}</span>
                </div>
                <p class="text-sm text-gray-600 mb-2">{{ item.description }}</p>
                <div v-if="item.user" class="flex items-center gap-2 text-xs text-gray-500">
                  <User class="w-3 h-3" />
                  <span>{{ item.user }}</span>
                </div>
                <div v-if="item.metadata && Object.keys(item.metadata).length > 0" class="mt-2">
                  <div class="text-xs text-gray-500 mb-1">Metadata:</div>
                  <div class="flex gap-1 flex-wrap">
                    <span
                      v-for="[key, value] in Object.entries(item.metadata)"
                      :key="key"
                      class="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      {{ key }}: {{ value }}
                    </span>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t border-gray-200 flex justify-end">
        <Button variant="outline" @click="closeModal">Close</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { History, X, Upload, Download, FileCheck, AlertTriangle, User } from "lucide-vue-next";
import Button from "@/components/ui/button/Button.vue";
import { Category, CONTRACT_TEMPLATES, type CatalogueItem } from "@/data/mockData";
import DocumentCard from "./DocumentCard.vue";
import { useToast } from "@/composables/useToast";

const { toast } = useToast();

interface HistoryItem {
  type: "upload" | "download" | "approval" | "rejection" | "modification";
  date: string;
  description: string;
  user?: string;
  metadata?: Record<string, any>;
}

interface Props {
  isOpen: boolean;
  documentInfo?: CatalogueItem | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
}>();

// Generate relevant history data based on fileType from mockdata
const history = computed<CatalogueItem[]>(() => {
  if (!props.documentInfo) return [];

  return CONTRACT_TEMPLATES.filter(
    (doc) =>
      doc.fileType === props.documentInfo?.fileType &&
      doc.category === props.documentInfo?.category &&
      doc.approvedDate,
  ).sort(
    (a, b) =>
      (b.approvedDate ? new Date(b.approvedDate).getTime() : 0) -
      (a.approvedDate ? new Date(a.approvedDate).getTime() : 0),
  );
});

// Helper functions to generate realistic mock data
const getRandomUser = () => {
  const users = [
    "Project Manager",
    "Procurement Officer",
    "Contract Specialist",
    "Engineering Lead",
    "Operations Manager",
    "Finance Analyst",
    "Compliance Officer",
    "Quality Assurance Manager",
  ];
  return users[Math.floor(Math.random() * users.length)];
};

const getRandomDepartment = () => {
  const departments = [
    "Mining Operations",
    "Construction",
    "Procurement",
    "Engineering",
    "Finance",
    "Quality Control",
    "Health & Safety",
    "Environmental",
  ];
  return departments[Math.floor(Math.random() * departments.length)];
};

const closeModal = () => {
  emit("close");
};

const getHistoryIcon = (type: HistoryItem["type"]) => {
  switch (type) {
    case "upload":
      return Upload;
    case "download":
      return Download;
    case "approval":
      return FileCheck;
    case "rejection":
      return AlertTriangle;
    case "modification":
      return History;
    default:
      return History;
  }
};

const getHistoryIconClass = (type: HistoryItem["type"]) => {
  switch (type) {
    case "upload":
      return "bg-blue-100 text-blue-600";
    case "download":
      return "bg-green-100 text-green-600";
    case "approval":
      return "bg-emerald-100 text-emerald-600";
    case "rejection":
      return "bg-red-100 text-red-600";
    case "modification":
      return "bg-amber-100 text-amber-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const getHistoryTitle = (type: HistoryItem["type"]) => {
  switch (type) {
    case "upload":
      return "Document Uploaded";
    case "download":
      return "Document Downloaded";
    case "approval":
      return "Document Approved";
    case "rejection":
      return "Document Rejected";
    case "modification":
      return "Document Modified";
    default:
      return "History Event";
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const handleDownload = (fileName: string) => {
  toast({
    title: "Download Started",
    description: `Downloading ${fileName}...`,
  });
};
</script>
