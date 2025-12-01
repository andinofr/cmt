<template>
  <Dialog :open="open" @update:open="$emit('close')">
    <DialogContent class="max-w-2xl">
      <DialogHeader>
        <DialogTitle class="text-2xl font-semibold">Upload Document</DialogTitle>
      </DialogHeader>

      <div class="space-y-4 py-4">
        <!-- File/Link Input -->
        <div class="grid grid-cols-12 gap-4 items-start">
          <div class="col-span-12">
            <div
              class="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-[#007d79] transition-colors cursor-pointer">
              <Upload class="w-8 h-8 mx-auto mb-2 text-slate-400" />
              <Input id="file-upload" type="file" @change="handleFileChange" class="hidden" />
              <label for="file-upload" class="cursor-pointer">
                <p class="text-sm text-slate-600 mb-1 font-medium">
                  {{ fileName || "Click to browse or drag and drop" }}
                </p>
                <p class="text-xs text-slate-400">PDF, DOC, DOCX, XLS, XLSX (Max 10MB)</p>
              </label>
            </div>
          </div>
        </div>

        <!-- Category Select -->
        <div class="grid grid-cols-12 gap-4 items-start">
          <div class="col-span-4">
            <Label className="text-sm font-medium text-gray-900">
              Document Category
              <span class="text-red-500">*</span>
            </Label>
          </div>
          <div class="col-span-8">
            <Select v-model="category" width="w-full">
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="cat in DOCUMENT_CATEGORIES" :key="cat" :value="cat">{{ cat }}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <!-- File Type -->
        <div class="grid grid-cols-12 gap-4 items-start">
          <div class="col-span-4">
            <Label for="file_type" className="text-sm font-medium text-gray-900">File Type</Label>
          </div>
          <div class="col-span-8">
            <Input id="file_type" placeholder="Enter document file type" v-model="filetype" />
          </div>
        </div>

        <!-- File Naming -->
        <div class="grid grid-cols-12 gap-4 items-start">
          <div class="col-span-4">
            <Label for="file_naming" className="text-sm font-medium text-gray-900">File Naming</Label>
          </div>
          <div class="col-span-8">
            <Input id="file_naming" placeholder="Enter document file name" v-model="filenaming" />
          </div>
        </div>

        <!-- Description -->
        <div class="grid grid-cols-12 gap-4 items-start">
          <div class="col-span-4">
            <Label for="description" className="text-sm font-medium text-gray-900">
              Description
              <span class="text-red-500">*</span>
            </Label>
          </div>
          <div class="col-span-8">
            <Textarea id="description" placeholder="Enter document description" v-model="description" :rows="3" />
          </div>
        </div>

        <!-- Area Select
        <div>
          <Label class="mb-2 block">Area *</Label>
          <Select v-model="area" width="w-full">
            <SelectTrigger>
              <SelectValue placeholder="Select area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="(a, index) in AREAS" :key="a" :value="a" :index="index">{{ a }}</SelectItem>
            </SelectContent>
          </Select>
        </div> -->

        <!-- Contract Select (Optional) -->
        <div v-if="workspace === 'execution'" class="grid grid-cols-12 gap-4 items-start">
          <div class="col-span-4">
            <Label className="text-sm font-medium text-gray-900">
              Related Contract
              <span class="text-gray-400">(Optional)</span>
            </Label>
          </div>
          <div class="col-span-8">
            <Select v-model="contract" width="w-full">
              <SelectTrigger>
                <SelectValue placeholder="Select contract" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="(c, index) in CONTRACTS.filter((c) => !area || c.area === area)"
                  :key="c.id"
                  :value="c.id"
                  :index="index">
                  {{ c.id }} - {{ c.title }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <!-- Description -->
        <!-- <div>
          <Label for="description" class="mb-2 block">Description *</Label>
          <Textarea id="description" placeholder="Enter document description" v-model="description" :rows="3" />
        </div> -->

        <!-- Dynamic Metadata Form -->
        <DynamicMetadataForm
          :category="category"
          :initial-metadata="metadata"
          @update:metadata="updateMetadata"
          @validation="validateMetadata"
          ref="metadataFormRef" />
      </div>

      <DialogFooter>
        <Button variant="outline" @click="$emit('close')">Cancel</Button>
        <Button @click="handleSubmit" className="bg-[#007d79] hover:bg-[#006663]">Upload Document</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Upload, FileText, Link as LinkIcon } from "lucide-vue-next";
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import Textarea from "@/components/ui/textarea/Textarea.vue";
import Dialog from "@/components/ui/dialog/Dialog.vue";
import DialogContent from "@/components/ui/dialog/DialogContent.vue";
import DialogHeader from "@/components/ui/dialog/DialogHeader.vue";
import DialogTitle from "@/components/ui/dialog/DialogTitle.vue";
import DialogFooter from "@/components/ui/dialog/DialogFooter.vue";
import Select from "@/components/ui/select/Select.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";
import DynamicMetadataForm from "@/components/ui/dynamic-metadata-form/DynamicMetadataForm.vue";
import { AREAS, CONTRACTS, DOCUMENT_CATEGORIES, addDocument } from "@/data/mockData";
import { useToast } from "@/composables/useToast";

interface UploadModalProps {
  open: boolean;
  workspace: string;
  preSelectedArea?: string;
}

const props = withDefaults(defineProps<UploadModalProps>(), {
  preSelectedArea: "",
});

const emit = defineEmits<{
  close: [];
}>();

const { toast } = useToast();

const documentType = ref<"file" | "link">("file");
const area = ref(props.preSelectedArea);
const contract = ref("");
const category = ref("");
const description = ref("");
const filetype = ref("");
const filenaming = ref("");
const fileName = ref("");
const linkUrl = ref("");

// Metadata related
const metadata = ref<Record<string, any>>({});
const isMetadataValid = ref(true);
const metadataFormRef = ref();

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    fileName.value = file.name;
  }
};

// Metadata methods
const updateMetadata = (newMetadata: Record<string, any>) => {
  metadata.value = newMetadata;
};

const validateMetadata = (isValid: boolean) => {
  isMetadataValid.value = isValid;
};

const handleSubmit = () => {
  if (!category.value || !description.value) {
    toast({
      title: "Missing Information",
      description: "Please fill in all required fields.",
      variant: "destructive",
    });
    return;
  }

  // Validate metadata form if category has metadata fields
  if (metadataFormRef.value && category.value) {
    const isValid = metadataFormRef.value.validate();
    if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required metadata fields correctly.",
        variant: "destructive",
      });
      return;
    }
  }

  if (documentType.value === "file" && !fileName.value) {
    toast({
      title: "No File Selected",
      description: "Please select a file to upload.",
      variant: "destructive",
    });
    return;
  }

  if (documentType.value === "link" && !linkUrl.value) {
    toast({
      title: "No Link Provided",
      description: "Please provide a link URL.",
      variant: "destructive",
    });
    return;
  }

  const newDocument = {
    documentType: documentType.value,
    area: area.value || "",
    contractId: contract.value || null,
    category: category.value,
    description: description.value,
    fileName: documentType.value === "file" ? fileName.value : null,
    linkUrl: documentType.value === "link" ? linkUrl.value : null,
    workspace: props.workspace,
    metadata: Object.keys(metadata.value).length > 0 ? metadata.value : undefined,
    status: "pending_review", // Documents need CMT approval
  };

  addDocument(newDocument as any);

  toast({
    title: "Document Uploaded",
    description: `${documentType.value === "file" ? fileName.value : "Link"} has been submitted for review.`,
  });

  // Reset form
  documentType.value = "file";
  area.value = props.preSelectedArea;
  contract.value = "";
  category.value = "";
  description.value = "";
  filetype.value = "";
  filenaming.value = "";
  fileName.value = "";
  linkUrl.value = "";
  metadata.value = {};

  emit("close");
};
</script>
