<template>
  <div v-if="fields.length > 0" class="space-y-3 mt-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>

    <div class="grid grid-cols-12 gap-4 items-start">
      <div v-for="field in fields" :key="field.id" class="col-span-12">
        <div class="grid grid-cols-12 gap-4 items-start">
          <div class="col-span-4">
            <Label :for="field.id" className="text-sm font-medium text-gray-900">
              {{ field.label }}
              <span v-if="field.required" class="text-red-500 ml-1">*</span>
            </Label>
          </div>
          <div class="col-span-8">
            <!-- Text Input -->
            <Input
              v-if="field.type === 'text'"
              :id="field.id"
              type="text"
              :placeholder="field.placeholder"
              :value="metadata[field.id]"
              @input="updateField(field.id, $event.target.value)"
              :class="{ 'border-red-500': errors[field.id] }" />

            <!-- Number Input -->
            <Input
              v-else-if="field.type === 'number'"
              :id="field.id"
              type="text"
              :placeholder="field.placeholder"
              :value="formatNumber(metadata[field.id])"
              @input="updateNumberField(field.id, $event.target.value)"
              :class="{ 'border-red-500': errors[field.id] }" />

            <!-- Email Input -->
            <Input
              v-else-if="field.type === 'email'"
              :id="field.id"
              type="email"
              :placeholder="field.placeholder"
              :value="metadata[field.id]"
              @input="updateField(field.id, $event.target.value)"
              :class="{ 'border-red-500': errors[field.id] }" />

            <!-- Date Input -->
            <Input
              v-else-if="field.type === 'date'"
              :id="field.id"
              type="date"
              :value="formatDate(metadata[field.id])"
              @input="updateField(field.id, $event.target.value)"
              :class="{ 'border-red-500': errors[field.id] }" />

            <!-- Select Dropdown -->
            <Select
              v-else-if="field.type === 'select'"
              :value="metadata[field.id]"
              @update:value="updateField(field.id, $event)">
              <SelectTrigger :class="{ 'border-red-500': errors[field.id] }">
                <SelectValue :placeholder="field.placeholder || `Select ${field.label}`" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="option in field.options" :key="option" :value="option">
                  {{ option }}
                </SelectItem>
              </SelectContent>
            </Select>

            <!-- Textarea -->
            <Textarea
              v-else-if="field.type === 'textarea'"
              :id="field.id"
              :placeholder="field.placeholder"
              :value="metadata[field.id]"
              @input="updateField(field.id, $event.target.value)"
              :rows="3"
              :class="{ 'border-red-500': errors[field.id] }" />

            <!-- Error Message -->
            <p v-if="errors[field.id]" class="text-red-500 text-sm mt-1">
              {{ errors[field.id] }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { z } from "zod";
import Input from "@/components/ui/input/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import Textarea from "@/components/ui/textarea/Textarea.vue";
import Select from "@/components/ui/select/Select.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";
import { getMetadataFields, createCategoryValidationSchema, type MetadataField } from "@/data/metadataConfig";

interface DynamicMetadataFormProps {
  category: string;
  initialMetadata?: Record<string, any>;
}

const props = withDefaults(defineProps<DynamicMetadataFormProps>(), {
  initialMetadata: () => ({}),
});

const emit = defineEmits<{
  "update:metadata": [metadata: Record<string, any>];
  validation: [isValid: boolean];
}>();

// Reactive data
const metadata = ref<Record<string, any>>({});
const errors = ref<Record<string, string>>({});
const fields = ref<MetadataField[]>([]);

// Initialize form
const initializeForm = () => {
  fields.value = getMetadataFields(props.category);

  // Reset and set default values
  metadata.value = { ...props.initialMetadata };
  errors.value = {};

  // Set default values for empty fields
  fields.value.forEach((field) => {
    if (metadata.value[field.id] === undefined || metadata.value[field.id] === null) {
      metadata.value[field.id] = "";
    }
  });

  validateForm();
};

// Update field value
const updateField = (fieldId: string, value: any) => {
  metadata.value[fieldId] = value;
  validateField(fieldId, value);
  emit("update:metadata", metadata.value);
};

// Update number field with proper formatting
const updateNumberField = (fieldId: string, value: string) => {
  // Remove non-numeric characters except decimal point and minus
  const cleanValue = value.replace(/[^0-9.-]+/g, "");
  metadata.value[fieldId] = cleanValue;
  validateField(fieldId, cleanValue);
  emit("update:metadata", metadata.value);
};

// Format number for display
const formatNumber = (value: any): string => {
  if (value === null || value === undefined || value === "") return "";
  return value.toString();
};

// Format date for input
const formatDate = (value: any): string => {
  if (!value) return "";
  const date = new Date(value);
  return date.toISOString().split("T")[0];
};

// Validate single field
const validateField = (fieldId: string, value: any) => {
  const field = fields.value.find((f) => f.id === fieldId);
  if (!field || !field.validation) {
    delete errors.value[fieldId];
    return true;
  }

  try {
    field.validation.parse(value);
    delete errors.value[fieldId];
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      errors.value[fieldId] = error.errors[0]?.message || "Invalid value";
    } else {
      errors.value[fieldId] = "Invalid value";
    }
    return false;
  }
};

// Validate entire form
const validateForm = () => {
  if (fields.value.length === 0) {
    emit("validation", true);
    return true;
  }

  let isValid = true;

  fields.value.forEach((field) => {
    const fieldValue = metadata.value[field.id];
    const fieldValid = validateField(field.id, fieldValue);
    if (!fieldValid) {
      isValid = false;
    }
  });

  emit("validation", isValid);
  return isValid;
};

// Watch for category changes
watch(
  () => props.category,
  () => {
    initializeForm();
  },
);

// Watch for initial metadata changes
watch(
  () => props.initialMetadata,
  (newMetadata) => {
    metadata.value = { ...newMetadata };
    validateForm();
  },
  { deep: true },
);

// Expose validation method
defineExpose({
  validate: validateForm,
  getMetadata: () => metadata.value,
  getErrors: () => errors.value,
});

onMounted(() => {
  initializeForm();
});
</script>

<style scoped>
/* Additional styles for better form appearance */
</style>
