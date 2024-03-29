<script
  lang="ts"
  setup
>
import { ref, toRef } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/solid'
import ArrowsUpDown from '@/components/icons/IconUpDown.vue'
const props = defineProps<{
  placeholder?: string
  options: { value: any; label: any }[]
}>()
const model = defineModel<any>()
</script>

<template>
  <div class=" w-32 max-w-32">
    <Listbox v-model="model">
      <div class="relative">
        <ListboxButton
          class="relative w-full cursor-default rounded-full  h-10 bg-white  pl-10 pr-3 text-left outline border-2 border-[#e5e7eb] focus:outline-none  focus:ring-0 ring-0 outline-none focus:border-indigo-600 "
        >
          <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
            <ArrowsUpDown
              class="h-4 w-4 text-gray-600"
              aria-hidden="true"
            />
          </span>
          <span
            class="block truncate mb-1"
            :class="!model && 'text-gray-400'"
          >{{ options.find(option => option.value === model)?.label || placeholder }}</span>

        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="(item, idx) in options"
              :key="idx"
              :value="item.value"
              as="template"
            >
              <li :class="[
      active ? 'bg-gray-100 text-gray-900' : 'text-gray-900',
      'relative cursor-default select-none py-2 pl-10 pr-4',
    ]">
                <span :class="[
      selected ? 'font-medium' : 'font-normal',
      'block truncate',
    ]">{{ item.label }}</span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600"
                >
                  <CheckIcon
                    class="h-5 w-5 text-gray-600"
                    aria-hidden="true"
                  />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
