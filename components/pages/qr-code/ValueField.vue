<template>
  <div class="my-5">
    <label for="size" class="block text-lg font-semibold text-slate-700">
      埋め込む値
    </label>
    <input
      v-model="value"
      type="text"
      class="mt-1 px-3 py-2 bg-white shadow-sm border border-2 placeholder-slate-400 focus:outline-none block w-full rounded-md"
      placeholder="値を入力"
    >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api';
import { RootState } from '~/types';

export default defineComponent({
  name: 'ValueField',
  setup () {
    const store = useStore<RootState>();
    const value = computed<string>({
      get: () => {
        return store.state.qrCodeGenerator.value;
      },
      set: (val) => {
        store.commit('qrCodeGenerator/setValue', val);
      },
    });

    return {
      value,
    };
  },
});
</script>
