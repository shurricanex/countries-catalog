<script
  lang="ts"
  setup
>
import { watch, ref } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";

const props = defineProps<{
  total: number;
  surroundButton: number;
}>()

const page = defineModel<number>('page', {
  default: 1
})
const limit = defineModel<number>('limit', {
  default: 25

})

// const pageOptions = [25, 50, 100]
const start = ref(1)
const last = ref()
const end = ref()
const pageList = ref<number[]>([])

/**
* Update active UI
*/

watch(() => props.total, () => {
  update()
})

function update() {
  if (props.total > 0) {
    last.value = Math.ceil(props.total / limit.value);
    start.value = ((page.value - Math.ceil(props.surroundButton / 2)) > 0) ? page.value - Math.ceil(props.surroundButton / 2) : 1;
    end.value = ((page.value + Math.ceil(props.surroundButton / 2)) < last.value) ? page.value + Math.ceil(props.surroundButton / 2) : last.value;
    if (end.value - start.value < props.surroundButton) {
      if (end.value < last.value) {
        end.value = start.value + props.surroundButton < last.value ? start.value + props.surroundButton : last.value;
      }

      if (start.value > 1) {
        start.value = end.value - props.surroundButton > 1 ? end.value - props.surroundButton : 1
      }
    }
    pageList.value = [];
    for (let i = start.value; i <= end.value; i++) {
      pageList.value.push(i)
    }
  } else {
    pageList.value = [];
  }
}

const nextPage = () => {
  if (page.value < last.value) {
    page.value += 1
  }
  update()
}

const prevPage = () => {
  if (page.value > 1) {
    page.value -= 1
  }
  update()
}

</script>

<template>
  <div class="my-4">
    <button
      class="bg-indigo-500 text-white px-3 h-10 w-10 rounded-full  mx-1"
      :disabled="page == 1 || total == 0"
      :class="page == 1 && 'opacity-50 cursor-not-allowed'"
      @click="prevPage"
    >
      <ChevronLeftIcon></ChevronLeftIcon>
    </button>
    <button
      class="bg-indigo-500 text-white px-3 h-10 w-10 rounded-full  mx-1"
      v-if="start != 1 && total != 0"
      :disabled="true"
    >...</button>
    <button
      class="bg-indigo-500 text-white px-3 h-10 w-10 rounded-full  mx-1"
      v-for="(pi, index) of pageList"
      :class="[pi === page && 'active']"
      @click="page = pi"
      :key="index"
    >{{ pi }}</button>
    <button
      class="bg-indigo-500 text-white px-3 h-10 w-10 rounded-full  mx-1"
      v-if="end != last && total != 0"
      :disabled="true"
    >...</button>
    <button
      class="bg-indigo-500 text-white px-3 h-10 w-10 rounded-full mx-1"
      :disabled="page == last || total == 0"
      :class="page == last && 'opacity-50 cursor-not-allowed'"
      @click="nextPage"
    >
      <ChevronRightIcon></ChevronRightIcon>
    </button>
    <!-- <div>
      <select
        v-model="limit"
        @change="page = 1"
      >
        <option
          v-for="option in pageOptions"
          :value="option"
          :key="option"
        >
          {{ option }}<span>/page</span>
        </option>
      </select>
    </div> -->
  </div>
</template>
<style
  lang="scss"
  scoped
>
.active {
  @apply bg-indigo-700;
}
</style>
