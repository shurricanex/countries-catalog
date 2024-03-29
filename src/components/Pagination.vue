<script
  setup
  lang="ts"
>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
import { computed, ref } from "vue";

const props = defineProps<{
  modelValue?: number;
  value?: number;
  length: number;
}>();
// page (modelValue) starts from 1 to length

const emit = defineEmits(["update:modelValue", "change"]);

let internalValue = ref(1);
let _modelValue = computed({
  // getter
  get() {
    return Math.min(
      props.length,
      props.modelValue ?? internalValue.value ?? props.value
    );
  },
  // setter
  set(newValue) {
    internalValue.value = newValue;
  },
});
</script>

<template>
  <div
    class="pagination inline-flex h-[40px] min-w-[220px] items-center justify-between rounded-3xl border-[3px] border-primary-200 bg-white px-2 text-primary-500"
  >
    <button
      type="button"
      @click="() => {
        if (_modelValue > 1) {
          emit('update:modelValue', _modelValue - 1);
          emit('change', _modelValue - 1);
          _modelValue -= 1;
        }
      }
        "
      data-mdb-ripple="true"
      data-mdb-ripple-color="green"
      class="inline-flex h-8 w-8 items-center justify-center rounded-md text-primary-500 hover:text-positive-500"
    >
      <ChevronLeftIcon class="w-6" />
    </button>
    <div class="flex items-center justify-center">
      page {{ _modelValue }} /
      {{ length }}
    </div>
    <button
      type="button"
      @click="() => {
        if (_modelValue < length) {
          emit('update:modelValue', _modelValue + 1);
          emit('change', _modelValue + 1);
          _modelValue += 1;
        }
      }
        "
      data-mdb-ripple="true"
      data-mdb-ripple-color="green"
      class="inline-flex h-8 w-8 items-center justify-center rounded-md text-primary-500 hover:text-positive-500"
    >
      <ChevronRightIcon class="w-6" />
    </button>
  </div>
</template>
