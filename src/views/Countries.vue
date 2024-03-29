<script
  lang="ts"
  setup
>
import { computed, onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useCountriesStore } from '@/stores/countries';

import CardList from '@/components/CardList.vue';
import IconSearch from '@/components/icons/IconSearch.vue';
import PaginationPro from '@/components/PaginationPro.vue';
import BaseSelect from '@/components/BaseSelect.vue';


const countriesStore = useCountriesStore();
const { fetchCountries } = countriesStore;
const { countries } = storeToRefs(countriesStore);
onMounted(async () => {
  await fetchCountries();
})

const pagination = ref({
  page: 1,
  limit: 25
})

const sortOrder = ref(1);

const searchQuery = ref('');

const filteredCountries = computed(() => {
  const startIndex = (pagination.value.page - 1) * 25;
  const endIndex = startIndex + 25;
  return countries.value
    .filter((country) => {
      return country.name.official.toLowerCase().includes(searchQuery.value.toLowerCase());
    })
    .slice(startIndex, endIndex)
    .sort((a, b) => {
      return sortOrder.value === 1
        ? a.name.official.localeCompare(b.name.official)
        : b.name.official.localeCompare(a.name.official);
    });
});

watch(searchQuery, () => {
  pagination.value.page = 1;
});

const total = computed(() => searchQuery.value ? filteredCountries.value.length : countries.value.length);

</script>

<template>
  <div class="w-screen flex-wrap max-w-screen-xl mt-6">
    <div class="my-6 flex">
      <span class="text-3xl font-bold ">Countries</span>
      <div class="flex ml-auto">
        <div class="relative mr-2">
          <input
            placeholder="Search countries"
            :class="[
              'pl-10 pb-1 rounded-full h-10 border-2 px-3 text-base focus:ring-0 focus-visible:border-indigo-600 focus-visible:outline-none'

            ]"
            v-model="searchQuery"
          />
          <component
            :is="IconSearch"
            class="absolute top-0 left-0 bottom-0 my-auto ml-3"
          />
        </div>
        <div class="flex items-center ml-4">
          <BaseSelect
            :options="[
              { value: 1, label: 'Asc' },
              { value: -1, label: 'Desc' },
            ]"
            v-model="sortOrder"
            class="focus:outline-none inline-block"
            placeholder="Sort By"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-5 gap-4">
      <CardList
        :items="filteredCountries"
        v-if="countries.length"
      />

    </div>
    <div class="flex">
      <PaginationPro
        class="my-6 inline-flex ml-auto"
        v-model:page="pagination.page"
        v-model:limit="pagination.limit"
        :total="total"
        :surround-button="6"
      />
    </div>
  </div>
</template>
