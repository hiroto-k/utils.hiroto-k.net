<template>
  <div class="my-5">
    <label for="margin" class="block text-lg font-semibold text-slate-700">
      マージン
    </label>
    <span class="block text-slate-700">
      {{ margin }}
    </span>
    <input
      v-model="margin"
      :min="0"
      :max="500"
      id="margin"
      type="range"
      class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
    >
  </div>
</template>

<script setup lang="ts">
import { useQrCodeGeneratorStore } from '~/store/qrCodeGenerator';

const store = useQrCodeGeneratorStore();
const margin = computed<number>({
  get: () => {
    return store.margin;
  },
  set: (val) => {
    store.margin = Number(val);
  },
});
</script>
