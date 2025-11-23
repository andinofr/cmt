<template>
  <Dialog :open="open" @update:open="$emit('close')">
    <DialogContent class="max-w-2xl">
      <DialogHeader>
        <DialogTitle class="text-2xl font-semibold">Upload Document</DialogTitle>
      </DialogHeader>

      <div class="space-y-6 py-4">
        <!-- Document Type -->
        <div>
          <Label class="mb-3 block">Document Type</Label>
          <div class="grid grid-cols-2 gap-4">
            <button
              @click="documentType = 'file'"
              :class="`p-4 rounded-lg border-2 transition-all ${
                documentType === 'file'
                  ? 'border-[#007d79] bg-[#007d79]/5'
                  : 'border-slate-200 hover:border-[#007d79]/50'
              }`">
              <FileText class="w-6 h-6 mx-auto mb-2 text-[#007d79]" />
              <p class="font-medium">File Upload</p>
            </button>
            <button
              @click="documentType = 'link'"
              :class="`p-4 rounded-lg border-2 transition-all ${
                documentType === 'link'
                  ? 'border-[#007d79] bg-[#007d79]/5'
                  : 'border-slate-200 hover:border-[#007d79]/50'
              }`">
              <LinkIcon class="w-6 h-6 mx-auto mb-2 text-[#007d79]" />
              <p class="font-medium">Link</p>
            </button>
          </div>
        </div>

        <!-- File/Link Input -->
        <div v-if="documentType === 'file'">
          <Label for="file-upload" class="mb-2 block">Select File *</Label>
          <div
            class="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-[#007d79] transition-colors cursor-pointer">
            <Upload class="w-10 h-10 mx-auto mb-3 text-slate-400" />
            <Input id="file-upload" type="file" @change="handleFileChange" class="hidden" />
            <label for="file-upload" class="cursor-pointer">
              <p class="text-sm text-slate-600 mb-1">
                {{ fileName || "Click to browse or drag and drop" }}
              </p>
              <p class="text-xs text-slate-400">PDF, DOC, DOCX, XLS, XLSX (Max 10MB)</p>
            </label>
          </div>
        </div>

        <div v-else>
          <Label for="link-url" class="mb-2 block">Link URL *</Label>
          <Input id="link-url" type="url" placeholder="https://example.com/document" v-model="linkUrl" />
        </div>

        <!-- File Type -->
        <div>
          <Label for="file_type" class="mb-2 block">File Type :</Label>
          <Input id="file_type" placeholder="Enter document file type" v-model="filetype" :rows="3" />
        </div>

        <!-- Description -->
        <div>
          <Label for="file_naming" class="mb-2 block">File Naming :</Label>
          <Input id="file_naming" placeholder="Enter document file name" v-model="filenaming" :rows="3" />
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
        <div v-if="workspace === 'execution'">
          <Label class="mb-2 block">Related Contract (Optional)</Label>
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

        <!-- Category Select -->
        <div>
          <Label class="mb-2 block">Document Category *</Label>
          <Select v-model="category" width="w-full">
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="cat in DOCUMENT_CATEGORIES" :key="cat" :value="cat">{{ cat }}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Description -->
        <div>
          <Label for="description" class="mb-2 block">Description *</Label>
          <Textarea id="description" placeholder="Enter document description" v-model="description" :rows="3" />
        </div>
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

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    fileName.value = file.name;
  }
};

const handleSubmit = () => {
  if (!area.value || !category.value || !description.value) {
    toast({
      title: "Missing Information",
      description: "Please fill in all required fields.",
      variant: "destructive",
    });
    return;
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
    area: area.value,
    contractId: contract.value || null,
    category: category.value,
    description: description.value,
    fileName: documentType.value === "file" ? fileName.value : null,
    linkUrl: documentType.value === "link" ? linkUrl.value : null,
    workspace: props.workspace,
  };

  addDocument(newDocument as any);

  toast({
    title: "Document Uploaded",
    description: `${documentType.value === "file" ? fileName.value : "Link"} has been uploaded successfully.`,
  });

  // Reset form
  documentType.value = "file";
  area.value = props.preSelectedArea;
  contract.value = "";
  category.value = "";
  description.value = "";
  fileName.value = "";
  linkUrl.value = "";

  emit("close");
};
</script>
