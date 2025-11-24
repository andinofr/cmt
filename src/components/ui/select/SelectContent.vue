<template>
  <teleport to="body">
    <div
      v-if="select?.open?.value"
      ref="contentRef"
      role="listbox"
      :class="
        cn(
          'overflow-y-auto overflow-x-hidden rounded-md border border-gray-300 bg-white text-black shadow-md',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'max-h-[150px] focus:outline-none',
          className,
        )
      "
      :data-state="select?.open?.value ? 'open' : 'closed'"
      tabindex="0">
      <div
        v-if="showScrollUpButton"
        class="flex cursor-default items-center justify-center py-1 border-b border-gray-200 bg-gray-50">
        <ChevronUp class="h-4 w-4 text-black" />
      </div>

      <div class="p-1 w-full">
        <slot />
      </div>

      <div
        v-if="showScrollDownButton"
        class="flex cursor-default items-center justify-center py-1 border-t border-gray-200 bg-gray-50">
        <ChevronDown class="h-4 w-4 text-black" />
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { inject, ref, onMounted, onUnmounted, nextTick, watch, computed } from "vue";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown } from "lucide-vue-next";

interface SelectContentProps {
  className?: string;
  position?: "item-aligned" | "popper";
}

const props = withDefaults(defineProps<SelectContentProps>(), {
  position: "popper",
});

const select = inject("select") as any;
const contentRef = ref<HTMLElement>();
const triggerRef = ref<HTMLElement>();
const availableItems = ref<string[]>([]);

// Collect available items when mounted
const collectItems = () => {
  if (contentRef.value) {
    const items = contentRef.value.querySelectorAll('[role="option"]');
    availableItems.value = Array.from(items)
      .map((item) => item.getAttribute("data-value") || item.textContent?.trim() || "")
      .filter(Boolean);
  }
};

const contentStyle = ref({
  top: "0px",
  left: "0px",
  width: "200px",
  minWidth: "200px",
  transformOrigin: "var(--radix-select-content-transform-origin)",
});

const showScrollUpButton = ref(false);
const showScrollDownButton = ref(false);

const updatePosition = () => {
  const triggerElement = select?.triggerElement?.value;
  const customWidth = select?.width;

  if (triggerElement && contentRef.value) {
    const rect = triggerElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Check if trigger is inside a modal/dialog - use more specific selectors
    const modalElement = triggerElement.closest('.fixed.z-50, [role="dialog"], .modal, [data-state="open"]');
    const isInModal = !!modalElement;

    // Debug: log untuk memeriksa apakah modal terdeteksi
    console.log('Modal detection:', {
      trigger: triggerElement,
      modalElement,
      isInModal,
      triggerClass: triggerElement?.className,
      modalClass: modalElement?.className
    });

    // Calculate position
    let top, left;

    if (isInModal) {
      // In modal, use fixed positioning relative to viewport
      top = rect.bottom + 4; // 4px gap, no scrollY needed for fixed
      left = rect.left;
    } else {
      // Outside modal, use absolute positioning with scroll
      top = rect.bottom + window.scrollY + 4;
      left = rect.left + window.scrollX;
    }

    let side = "bottom";

    // Debug: log positioning info
    console.log('Position calculation:', {
      isInModal,
      rect,
      top,
      left,
      windowScrollY: window.scrollY,
      windowScrollX: window.scrollX,
      viewportHeight
    });

    // Calculate the width to use
    let dropdownWidth = rect.width;

    if (customWidth) {
      if (typeof customWidth === "number") {
        dropdownWidth = customWidth;
      } else if (typeof customWidth === "string") {
        // Try to convert Tailwind classes to pixel values
        if (customWidth === "w-64")
          dropdownWidth = 256; // 16rem = 256px
        else if (customWidth === "w-56")
          dropdownWidth = 224; // 14rem = 224px
        else if (customWidth === "w-48")
          dropdownWidth = 192; // 12rem = 192px
        else if (customWidth === "w-40")
          dropdownWidth = 160; // 10rem = 160px
        else if (customWidth === "w-32")
          dropdownWidth = 128; // 8rem = 128px
        // If it's a pixel value string
        else if (customWidth.includes("px")) {
          dropdownWidth = parseInt(customWidth) || rect.width;
        }
        // Fallback to trigger width for other strings
      }
    }

    // Use positioning based on context with !important to override any CSS
    contentRef.value.style.setProperty('position', isInModal ? "fixed" : "absolute", 'important');
    contentRef.value.style.setProperty('top', `${top}px`, 'important');
    contentRef.value.style.setProperty('left', `${left}px`, 'important');
    contentRef.value.style.setProperty('width', `${dropdownWidth}px`, 'important');
    contentRef.value.style.setProperty('min-width', `${dropdownWidth}px`, 'important');
    // Set z-index based on context (modal uses z-50 = 200, so we need higher)
    contentRef.value.style.setProperty('z-index', isInModal ? "60" : "50", 'important');

    // Debug: log final styles
    console.log('Final styles applied:', {
      position: contentRef.value.style.position,
      top: contentRef.value.style.top,
      left: contentRef.value.style.left,
      zIndex: contentRef.value.style.zIndex,
      computedTop: window.getComputedStyle(contentRef.value).top,
      computedLeft: window.getComputedStyle(contentRef.value).left,
      computedPosition: window.getComputedStyle(contentRef.value).position
    });

    // Check if dropdown would go below viewport
    const contentHeight = contentRef.value.scrollHeight;
    if (isInModal) {
      // For fixed positioning in modal, check against viewport height
      if (top + contentHeight > viewportHeight) {
        // Not enough space below, show above
        top = rect.top - contentHeight - 4;
        side = "top";
      }
    } else {
      // For absolute positioning, check against viewport with scroll
      if (top + contentHeight > viewportHeight + window.scrollY) {
        // Not enough space below, show above
        top = rect.top + window.scrollY - contentHeight - 4;
        side = "top";
      }
    }

    // contentStyle tidak lagi digunakan - fokus pada inline styles

    // Set CSS custom properties for other styling
    document.documentElement.style.setProperty("--radix-select-content-available-height", "300px");
    document.documentElement.style.setProperty("--radix-select-trigger-height", `${rect.height}px`);
    document.documentElement.style.setProperty("--radix-select-trigger-width", `${dropdownWidth}px`);
  }
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Element;
  const triggerElement = select?.triggerElement?.value;
  const isClickInsideTrigger = triggerElement?.contains(target);
  const isClickInsideContent = contentRef.value?.contains(target);

  if (!isClickInsideTrigger && !isClickInsideContent) {
    select?.setOpen(false);
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  // Only handle keyboard events if this dropdown is open and has focus
  if (select?.open?.value && contentRef.value && document.activeElement === contentRef.value) {
    select?.handleKeyDown(event, availableItems.value);
  }
};

const checkScroll = () => {
  if (contentRef.value) {
    const element = contentRef.value;
    showScrollUpButton.value = element.scrollTop > 0;
    showScrollDownButton.value = element.scrollTop < element.scrollHeight - element.clientHeight;
  }
};

// Watch for open state changes
watch(
  () => select?.open?.value,
  (newOpen) => {
    if (newOpen) {
      nextTick(() => {
        updatePosition();
        collectItems(); // Collect items when dropdown opens

        // Set highlighted index to match selected item when opening
        if (contentRef.value && select?.value?.value) {
          const items = contentRef.value.querySelectorAll('[role="option"]');
          const selectedIndex = Array.from(items).findIndex(
            (item) => item.getAttribute("data-value") === select.value.value,
          );
          if (select?.highlightedIndex !== undefined) {
            select.highlightedIndex.value = selectedIndex >= 0 ? selectedIndex : 0;
          }
        }

        // Force width update after DOM is ready
        if (contentRef.value && select?.triggerElement?.value) {
          const triggerRect = select.triggerElement.value.getBoundingClientRect();
          const customWidth = select?.width;
          let dropdownWidth = triggerRect.width;

          if (customWidth) {
            if (typeof customWidth === "number") {
              dropdownWidth = customWidth;
            } else if (typeof customWidth === "string") {
              if (customWidth === "w-64") dropdownWidth = 256;
              else if (customWidth === "w-56") dropdownWidth = 224;
              else if (customWidth === "w-48") dropdownWidth = 192;
              else if (customWidth === "w-40") dropdownWidth = 160;
              else if (customWidth === "w-32") dropdownWidth = 128;
              else if (customWidth.includes("px")) {
                dropdownWidth = parseInt(customWidth) || triggerRect.width;
              }
            }
          }

          contentRef.value.style.width = `${dropdownWidth}px`;
          contentRef.value.style.minWidth = `${dropdownWidth}px`;
        }
        checkScroll();

        // Focus the dropdown for keyboard navigation
        if (contentRef.value) {
          contentRef.value.focus();
        }
      });
    }
  },
);

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("scroll", updatePosition);
  window.addEventListener("resize", updatePosition);
  document.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("scroll", updatePosition);
  window.removeEventListener("resize", updatePosition);
  document.removeEventListener("keydown", handleKeyDown);
});
</script>
