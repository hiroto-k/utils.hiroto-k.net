<template>
  <b-field>
    <div class="block">
      <label class="label">
        誤り訂正レベル
      </label>

      <div
        v-for="(levelForm, levelFormsKey) in levelForms"
        :key="levelFormsKey"
        class="field"
      >
        <b-radio
          :native-value="levelForm.value"
          v-model="level"
          name="name"
        >
          {{ levelForm.text }}
        </b-radio>
      </div>
    </div>
  </b-field>
</template>

<script lang="ts">
import { QrCodeErrorCorrectionLevel, RootState } from '~/types';
import { computed, defineComponent, useStore } from '@nuxtjs/composition-api';

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
    const levelForms = computed<ErrorCorrectionLevelFormOption[]>(() => [
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
