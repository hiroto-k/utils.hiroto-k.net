<template>
  <b-field label="サイズ">
    <b-slider
      v-model="size"
      :min="1"
      :max="500"
    >
      <b-slider-tick
        v-for="(sliderTickValue, sliderTicksKey) in sliderTicks"
        :key="sliderTicksKey"
        :value="sliderTickValue"
        v-text="sliderTickValue"
        style="word-break:keep-all;"
      >
      </b-slider-tick>
    </b-slider>
  </b-field>
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
