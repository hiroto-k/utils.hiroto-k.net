<template>
  <b-field label="背景色">
    <b-input
      v-model="backGround"
      type="color"
    >
    </b-input>
  </b-field>
</template>

<script lang="ts">
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api';
import { RootState } from '~/types';

export default defineComponent({
  name: 'BackGroundField',
  setup () {
    const store = useStore<RootState>();
    const backGround = computed({
      get: (): string => {
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
