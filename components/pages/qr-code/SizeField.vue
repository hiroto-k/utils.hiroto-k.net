<template>
  <div class="my-5">
    <label for="size" class="block text-lg font-semibold text-slate-700">
      サイズ
    </label>
    <span class="block text-slate-700">
      {{ size }}
    </span>
    <input
      v-model="size"
      :min="1"
      :max="500"
      id="size"
      type="range"
      class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
    >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';
import { useQrCodeGeneratorStore } from '../../../store/qrCodeGenerator';

export default defineComponent({
  name: 'SizeField',
  setup () {
    const store = useQrCodeGeneratorStore();
    const size = computed<number>({
      get: () => {
        return store.size;
      },
      set: (val) => {
        store.size = val;
      },
    });

    return {
      size,
    };
  },
});
</script>
