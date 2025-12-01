<template>
  <div
    class="flex items-center justify-between p-4 rounded-lg hover:shadow-md transition-shadow"
    :class="[
      variant === 'pricing'
        ? 'bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200'
        : variant === 'scope'
          ? 'bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200'
          : 'bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200',
    ]">
    <div class="flex items-center gap-3">
      <div
        class="w-12 h-12 rounded-lg flex items-center justify-center"
        :class="[variant === 'pricing' ? 'bg-blue-600' : variant === 'scope' ? 'bg-blue-600' : 'bg-gray-600']">
        <FileText class="w-6 h-6 text-white" />
      </div>
      <div class="flex-1">
        <p class="font-medium text-slate-800">{{ props.data.fileType }} {{ props.data.version }}</p>
        <p class="text-sm text-slate-600">{{ props.data.fileName }}</p>

        <div class="flex items-center gap-1 mt-2">
          <span class="text-xs text-slate-500">Uploaded by:</span>
          <span class="text-xs font-medium">{{ props.data.uploaderName }}</span>
          <span class="text-xs text-slate-500">({{ formattedDate }})</span>
        </div>

        <div v-if="props.data.approverName" class="flex items-center gap-1">
          <span class="text-xs text-slate-500">Approved by:</span>
          <span class="text-xs font-medium">{{ props.data.approverName }}</span>
          <span class="text-xs text-slate-500">({{ formattedApprovedDate }})</span>
        </div>
      </div>
    </div>
    <div class="flex gap-1">
      <Button
        v-if="!hideHistoryButton"
        size="sm"
        variant="ghost"
        @click="handleShowHistory"
        :class="[
          variant === 'pricing' ? 'hover:bg-blue-200' : variant === 'scope' ? 'hover:bg-blue-200' : 'hover:bg-gray-200',
        ]"
        title="Show History">
        <History class="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        @click="handleDownload"
        :class="[
          variant === 'pricing' ? 'hover:bg-blue-200' : variant === 'scope' ? 'hover:bg-blue-200' : 'hover:bg-gray-200',
        ]"
        title="Download">
        <Download class="w-4 h-4" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FileText, Download, History } from "lucide-vue-next";
import Button from "@/components/ui/button/Button.vue";
import type { CatalogueItem } from "@/data/mockData";

interface DocumentCardProps {
  data: CatalogueItem;
  variant?: "pricing" | "scope" | "library";
  hideHistoryButton?: boolean;
}

const props = withDefaults(defineProps<DocumentCardProps>(), {
  variant: "pricing",
  hideHistoryButton: false,
});

const emit = defineEmits<{
  download: [fileName: string];
  showHistory: [template: CatalogueItem];
}>();

const subtitle = computed(() => {
  if (props.variant === "library") {
    return `Category: ${props.data.category} | ${props.data.fileType || "Reference Document"}`;
  }
  return `${props.data.category} | ${props.data.fileType || "Reference Document"}`;
});

const formattedDate = computed(() => {
  return new Date(props.data.uploadDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});

const formattedApprovedDate = computed(() => {
  if (!props.data.approvedDate) return "";
  return new Date(props.data.approvedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});

const handleDownload = () => {
  emit("download", props.data.fileName);
};

const handleShowHistory = () => {
  var data: CatalogueItem = {
    id: props.data.id,
    category: props.data.category,
    fileType: props.data.fileType,
    fileName: props.data.fileName,
    uploadDate: props.data.uploadDate,
    status: props.data.status,
    uploaderName: props.data.uploaderName,
    approverName: props.data.approverName,
    approvedDate: props.data.approvedDate,
  };

  emit("showHistory", data);
};
</script>
