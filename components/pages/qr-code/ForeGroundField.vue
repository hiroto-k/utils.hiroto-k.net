<template>
  <div class="my-5">
    <label for="size" class="block text-lg font-semibold text-slate-700">
      QRコードの色
    </label>
    <input
      v-model="foreGround"
      type="color"
      class="mt-1 px-3 py-2 bg-white shadow-sm border border-2 focus:outline-none block w-full rounded-md h-11"
    >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api';
import { RootState } from '~/types';

export default defineComponent({
  name: 'ForeGroundField',
  setup () {
    const store = useStore<RootState>();
    const foreGround = computed<string>({
      get: () => {
        return store.state.qrCodeGenerator.foreGround;
      },
      set: (val) => {
        store.commit('qrCodeGenerator/setForeGround', val);
      },
    });

    return {
      foreGround,
    };
  },
});
</script>
