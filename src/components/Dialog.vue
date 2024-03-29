<script
  setup
  lang="ts"
>
import { computed } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import IconX from "./icons/IconX.vue";


const props = defineProps<{
  modelValue?: boolean;
  value?: boolean;
  title?: string;
  content?: string;
  persistent?: boolean;
  isShowCloseButton?: boolean;
}>();

const emit = defineEmits(["update:modelValue", "close"]);

function closeModal() {
  emit("update:modelValue", false);
  emit("close");
}

const _modelValue = computed({
  // getter
  get() {
    return props.value || props.modelValue;
  },
  // setter
  set(newValue) {
    // no need
  },
});

</script>
<template>
  <TransitionRoot
    appear
    :show="_modelValue"
    as="template"
  >
    <Dialog
      as="div"
      @close="persistent ? null : closeModal()"
      class="relative z-dialog"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0  ">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              v-bind="$attrs"
              class="max-h-[95vh]  transform overflow-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all scrollbar scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded scrollbar-track-rounded-xl"
            >
              <div
                v-if="isShowCloseButton"
                class="flex justify-end"
              >
                <button @click="closeModal">
                  <IconX />
                </button>
              </div>

              <DialogTitle
                as="h3"
                class="font-medium leading-6 text-2xl"
              >
                {{ title }}
              </DialogTitle>
              <slot name="title"></slot>
              <slot>{{ content }}</slot>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
