<template>
  <div
    ref="itemRef"
    :class="
      cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-gray-100 focus:bg-gray-200',
        'data-[selected=true]:bg-slate-200 data-[selected=true]:text-black data-[selected=true]:font-medium',
        'data-[highlighted=true]:bg-gray-100 data-[highlighted=true]:text-black data-[highlighted=true]:font-medium',
        className,
      )
    "
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :data-disabled="disabled"
    :data-value="value"
    :data-selected="isSelected"
    :data-highlighted="isHighlighted"
    role="option"
    :aria-selected="isSelected">
    <span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <Check v-if="isSelected" class="h-4 w-4 text-black" />
    </span>
    <span>
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
import { inject, computed, ref, onMounted } from "vue";
import { cn } from "@/lib/utils";
import { Check } from "lucide-vue-next";

interface SelectItemProps {
  value: string;
  index?: number;
  disabled?: boolean;
  className?: string;
}

const props = defineProps<SelectItemProps>();
const itemRef = ref<HTMLElement>();
const displayText = ref("");

const select = inject("select") as any;

const isSelected = computed(() => {
  return select?.value?.value === props.value;
});

const isHighlighted = computed(() => {
  // Use props.index if available for optimal performance
  if (props.index !== undefined) {
    return select?.highlightedIndex?.value === props.index;
  }

  // Fallback to DOM query for backward compatibility
  if (select?.highlightedIndex?.value === null || select.highlightedIndex.value === -1) {
    return false;
  }

  const listbox = document.querySelector('[role="listbox"]');
  if (listbox) {
    const items = Array.from(listbox.querySelectorAll('[role="option"]'));
    const index = items.findIndex((item) => item.getAttribute("data-value") === props.value);
    return select.highlightedIndex.value === index;
  }

  return false;
});

const handleClick = (event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();

  if (!props.disabled) {
    // Get text content more reliably
    const itemElement = itemRef.value;
    let textContent = props.value;

    if (itemElement) {
      // Get the text from the slot (the last span contains the actual text)
      const textSpan = itemElement.querySelector("span:last-child");
      if (textSpan) {
        textContent = textSpan.textContent?.trim() || props.value;
      } else {
        // Fallback to the whole element text
        textContent = itemElement.textContent?.trim().replace(/^[✓\s]+/, "") || props.value;
      }
    }

    select?.selectValue(props.value, textContent);
  }
};

const handleMouseEnter = () => {
  // Reset highlightedIndex when mouse hovers over any item
  select?.resetHighlightedIndex();

  // Set hoverIndex to current item's index
  if (props.index !== undefined) {
    select?.setHoverIndex?.(props.index);
  } else {
    // Fallback to DOM query if no index prop
    const listbox = document.querySelector('[role="listbox"]');
    if (listbox) {
      const items = Array.from(listbox.querySelectorAll('[role="option"]'));
      const index = items.findIndex((item) => item.getAttribute("data-value") === props.value);
      if (index >= 0) {
        select?.setHoverIndex?.(index);
      }
    }
  }
};

const handleMouseLeave = () => {
  // Reset hoverIndex when mouse leaves the item
  select?.resetHoverIndex?.();
};

onMounted(() => {
  // Pre-calculate the display text for better performance
  if (itemRef.value) {
    const textContent = itemRef.value.querySelector("span:last-child")?.textContent?.trim();
    if (textContent) {
      displayText.value = textContent;
    }
  }
});
</script>
