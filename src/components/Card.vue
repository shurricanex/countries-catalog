<script
  lang="ts"
  setup
>
import type { Country } from '@/stores/countries';
import { computed } from 'vue';

const props = defineProps<Country & { isLoading?: boolean }>();

const nativeName = computed(() => {
  if (props.name?.nativeName) {
    return props.name.nativeName[Object.keys(props.name.nativeName)[0]].official
  }
  return null
})
</script>

<template>
  <div
    class="max-w-sm group overflow-hidden shadow-lg rounded-lg hover:scale-[102%] transition-all duration-300 ease-in-out bg-white cursor-pointer"
    v-if="props"
  >
    <div :class="['w-full h-36', props.isLoading && 'w-full animate-pulse bg-gray-200']">
      <img
        class="w-full object-cover h-36"
        v-if="props.flags"
        :src="props.flags.png"
        alt="flag"
      >
    </div>
    <div class="px-6 py-4 ">
      <div
        :class="['font-bold text-lg mb-2 group-hover:underline ', props.isLoading && 'animate-pulse w-full bg-gray-200 rounded-full']"
      >
        {{ props.name?.official }}<span v-if="nativeName">({{ nativeName }})</span>
      </div>
      <p :class="['text-gray-700 text-base', props.isLoading && ' h-4 animate-pulse w-full bg-gray-200 rounded-full']">
        {{ props.cca2 }}, {{ props.cca3 }}
      </p>
      <p
        :class="['text-gray-700 text-base', props.isLoading && ' h-4 mt-2 animate-pulse w-full bg-gray-200 rounded-full']">
        {{ props.altSpellings?.join(', ') }}
      </p>
    </div>
    <div class="px-6 pt-4 pb-2">
      <span
        v-for="( suffix, index ) in  props.idd?.suffixes?.slice(0, 3) "
        :key="index"
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
      >{{ props.idd.root + suffix }}</span>
      <span v-if="props.idd?.suffixes?.length > 3">and {{ props.idd?.suffixes?.length - 3 }} more</span>
    </div>
  </div>
</template>
