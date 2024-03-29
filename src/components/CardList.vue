<script
  lang="ts"
  setup
>
import Card from "@/components/Card.vue";
import Dialog from "@/components/Dialog.vue";
import type { Country } from "@/stores/countries";

import { computed, ref, toRef } from "vue";

const props = defineProps<{
  items: any[];
  isLoading?: boolean;
}>()

const isLoading = toRef(props, 'isLoading')
const items = toRef(props, 'items')

const selectedCountry = ref<Country>()
const isOpenDialog = ref(false)
const stubItems = computed(() => !items.value.length && isLoading.value ? Array.from({ length: 10 }) : items.value)

const openDialog = (index: number) => {
  selectedCountry.value = items.value[index];
  isOpenDialog.value = true
}

</script>

<template>
  <Card
    v-for="(item, index) in stubItems"
    :key="index"
    v-bind="item"
    :is-loading="isLoading"
    @click="openDialog(index)"
  />
  <Dialog
    class="overflow-hidden"
    :title="selectedCountry?.name?.official"
    v-model="isOpenDialog"
  >
    <div class="w-[720px] max-h-[50vh] overflow-auto my-4 leading-loose">
      <!-- <pre>{{ JSON.stringify(selectedCountry, undefined, 2) }}</pre> -->
      <p><span class="font-semibold">Name:</span> {{ selectedCountry?.name.common }}
      </p>
      <p class="flex"><span class="font-semibold">Flag:</span> <img
          class="w-auto ml-4 object-cover h-6"
          v-if="selectedCountry?.flags"
          :src="selectedCountry?.flags.png"
          alt="flag"
        ></p>
      <p><span class="font-semibold">Offical name:</span> {{ selectedCountry?.name.official }}</p>
      <p><span class="font-semibold">Cca2:</span> {{ selectedCountry?.cca2 }}</p>
      <p><span class="font-semibold">Cca3:</span> {{ selectedCountry?.cca3 }}</p>
      <p><span class="font-semibold">AltSpellings:</span> {{ Object.values(selectedCountry?.altSpellings ||
      {}).join(",") }}</p>
      <div><span class="font-semibold">Currency:</span>
        <p
          v-for="[key, value] of Object.entries(selectedCountry?.currencies || {})"
          :key="key"
          class="ml-2"
        >{{ key }}: {{ value.name }}</p>
      </div>
      <div><span class="font-semibold">Country calling code:</span> <span
          v-for="(suffix, index) in selectedCountry?.idd?.suffixes"
          :key="index"
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >{{ selectedCountry?.idd.root + suffix }}</span>
      </div>
      <div><span class="font-semibold">Capital:</span> <span>{{ selectedCountry?.capital.join(', ') }}</span>
      </div>
      <div><span class="font-semibold">Continents:</span> <span>{{ selectedCountry?.continents.join(', ')
          }}</span>
      </div>
      <div><span class="font-semibold">Map:</span> <a
          class="outline-none"
          :href="selectedCountry?.maps.googleMaps"
          target="_blank"
          rel="noopener noreferrer"
        >Google Maps</a>
      </div>
      <p><span class="font-semibold">Population:</span> {{ selectedCountry?.population }}</p>
      <p><span class="font-semibold">Timezones:</span> {{ selectedCountry?.timezones?.join(", ") }}</p>
      <div> <span class="font-semibold">Languages:</span> {{ Object.values(selectedCountry?.languages || {}).join(", ")
        }}
      </div>
      <p> <span class="font-semibold">Start of the week:</span> {{ selectedCountry?.startOfWeek }}</p>
    </div>
  </Dialog>
</template>
