<script
  lang="ts"
  setup
  generic="T extends Country"
>
import Card from "@/components/Card.vue";
import Dialog from "@/components/Dialog.vue";
import type { Country } from "@/stores/countries";

import { computed, ref } from "vue";

const props = defineProps<{
  items: T[];
}>()

const selectedCountry = ref<number>(-1)
const isOpenDialog = ref(false)
const stubItems = computed(() => props.items.length ? props.items : Array.from({ length: 10 }))

const openDialog = (index: number) => {
  selectedCountry.value = index;
  isOpenDialog.value = true
}

</script>

<template>
  <Card
    v-for="(item, index) in stubItems"
    :key="index"
    v-bind="item"
    :is-loading="!items?.length"
    @click="openDialog(index)"
  />
  <Dialog
    class="overflow-hidden"
    :title="items[selectedCountry]?.name?.official"
    v-model="isOpenDialog"
  >
    <div class="max-w-screen-md max-h-[50vh] overflow-auto my-4">
      <pre>{{ JSON.stringify(items[selectedCountry], undefined, 2) }}</pre>

      <!-- <p>Capital: {{ items[selectedCountry]?.capital }}</p>
        <p>Area: {{ items[selectedCountry]?.area }} km²</p>
        <p>Population: {{ items[selectedCountry]?.population }}</p> -->
    </div>
  </Dialog>
</template>
