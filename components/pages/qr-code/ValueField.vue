<template>
  <b-field label="埋め込む値">
    <b-input
      v-model="value"
      placeholder="値を入力"
    >
    </b-input>
  </b-field>
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
