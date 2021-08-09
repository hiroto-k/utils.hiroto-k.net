<template>
  <b-field>
    <div class="block">
      <label class="label">
        レンダリング方式
      </label>

      <div
        v-for="(renderAsForm, renderAsFormsKey) in renderAsForms"
        :key="renderAsFormsKey"
        class="field"
      >
        <b-radio
          :native-value="renderAsForm.value"
          v-model="renderAs"
          name="name"
        >
          {{ renderAsForm.text }}
        </b-radio>
      </div>
    </div>
  </b-field>
</template>

<script lang="ts">
import { QrCodeRenderAsOptionValue, RootState } from '~/types';
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api';

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
    const renderAsForms = computed<RenderAsFormOption[]>(() => [
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
