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
import { computed, defineComponent, reactive, useStore } from '@nuxtjs/composition-api';
import { RootState } from '~/types';

export default defineComponent({
  name: 'SizeField',
  setup () {
    const store = useStore<RootState>();
    const size = computed<number>({
      get: () => {
        return store.state.qrCodeGenerator.size;
      },
      set: (val) => {
        store.commit('qrCodeGenerator/setSize', val);
      },
    });

    const sliderTicks = reactive<number[]>([0, 100, 200, 300, 400, 500]);

    return {
      size,
      sliderTicks,
    };
  },
});
</script>
