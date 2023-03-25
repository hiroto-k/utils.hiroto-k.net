<template>
  <div class="my-5">
    <span class="block text-lg font-semibold text-slate-700">
      背景色
    </span>
    <input
      v-model="backGround"
      type="color"
      class="mt-1 px-3 py-2 bg-white shadow-sm border border-2 focus:outline-none block w-full rounded-md h-11"
    >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api';
import { RootState } from '~/types';

export default defineComponent({
  name: 'BackGroundField',
  setup () {
    const store = useStore<RootState>();
    const backGround = computed<string>({
      get: () => {
        return store.state.qrCodeGenerator.backGround;
      },
      set: (val) => {
        store.commit('qrCodeGenerator/setBackGround', val);
      },
    });

    return {
      backGround,
    };
  },
});
</script>
