<template>
  <b-field label="QRコードの色">
    <b-input
      v-model="foreGround"
      type="color"
    >
    </b-input>
  </b-field>
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
