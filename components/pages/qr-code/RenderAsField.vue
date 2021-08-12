<template>
  <b-field label="レンダリング方式">
    <div class="block">
      <b-radio
        v-for="(renderAsForm, renderAsFormsKey) in renderAsForms"
        :key="renderAsFormsKey"
        :native-value="renderAsForm.value"
        v-model="renderAs"
        name="render-as"
      >
        {{ renderAsForm.text }}
      </b-radio>
    </div>
  </b-field>
</template>

<script lang="ts">
import { QrCodeRenderAsOptionValue, RootState } from '~/types';
import { computed, defineComponent, reactive, useStore } from '@nuxtjs/composition-api';

interface RenderAsFormOption {
  value: QrCodeRenderAsOptionValue;
  text: string;
}

export default defineComponent({
  name: 'RenderAsField',
  setup () {
    const store = useStore<RootState>();
    const renderAs = computed<QrCodeRenderAsOptionValue>({
      get: () => {
        return store.state.qrCodeGenerator.renderAs;
      },
      set: (val) => {
        store.commit('qrCodeGenerator/setRenderAs', val);
      },
    });
    const renderAsForms = reactive<RenderAsFormOption[]>([
      { value: 'svg', text: 'SVG' },
      { value: 'canvas', text: 'Canvas' },
    ]);

    return {
      renderAs,
      renderAsForms,
    };
  },
});
</script>
