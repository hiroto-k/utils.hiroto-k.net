<template>
  <div class="my-5">
    <label for="size" class="block text-lg font-semibold text-slate-700">
      レンダリング方式
    </label>
    <div class="flex">
      <div
        v-for="(renderAsForm, renderAsFormsKey) in renderAsForms"
        :key="renderAsFormsKey"
        class="flex items-center mr-4"
      >
        <input
          v-model="renderAs"
          :id="`render-as-${renderAsForm.value}`"
          :value="renderAsForm.value"
          type="radio"
          name="render-as"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        >
        <label
          :for="`render-as-${renderAsForm.value}`"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {{ renderAsForm.text }}
        </label>
      </div>
    </div>
  </div>
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
