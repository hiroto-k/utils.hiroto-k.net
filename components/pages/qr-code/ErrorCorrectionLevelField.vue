<template>
  <div class="my-5">
    <label for="size" class="block text-lg font-semibold text-slate-700">
      誤り訂正レベル
    </label>
    <div class="flex">
      <div
        v-for="(levelForm, levelFormsKey) in levelForms"
        :key="levelFormsKey"
        class="flex items-center mr-4"
      >
        <input
          v-model="level"
          :id="`error-correction-level-${levelForm.value}`"
          :value="levelForm.value"
          type="radio"
          name="error-correction-level"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        >
        <label
          :for="`error-correction-level-${levelForm.value}`"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {{ levelForm.text }}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { QrCodeErrorCorrectionLevel, RootState } from '~/types';
import { computed, defineComponent, reactive, useStore } from '@nuxtjs/composition-api';

interface ErrorCorrectionLevelFormOption {
  value: QrCodeErrorCorrectionLevel;
  text: string;
}

export default defineComponent({
  name: 'ErrorCorrectionLevelField',
  setup () {
    const store = useStore<RootState>();
    const level = computed<QrCodeErrorCorrectionLevel>({
      get: () => {
        return store.state.qrCodeGenerator.level;
      },
      set: (val) => {
        store.commit('qrCodeGenerator/setLevel', val);
      },
    });
    const levelForms = reactive<ErrorCorrectionLevelFormOption[]>([
      { value: 'L', text: 'Level L (7%)' },
      { value: 'M', text: 'Level M (15%)' },
      { value: 'Q', text: 'Level Q (25%)' },
      { value: 'H', text: 'Level H (30%)' },
    ]);

    return {
      level,
      levelForms,
    };
  },
});
</script>
