<template>
  <div class="container">
    <h1 class="title" v-text="title">
    </h1>

    <p class="subtitle" v-text="description">
    </p>

    <div class="content">
      <div class="qr-setting-fields">
        <value-field>
        </value-field>

        <size-field>
        </size-field>

        <error-correction-level-field>
        </error-correction-level-field>

        <render-as-field>
        </render-as-field>

        <back-ground-field>
        </back-ground-field>

        <fore-ground-field>
        </fore-ground-field>
      </div>

      <qr-code-vue
        :value="value"
        :size="size"
        :level="level"
        :render-as="renderAs"
        :background="backGround"
        :foreground="foreGround"
        class="qr-code"
      >
      </qr-code-vue>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useMeta, useStore } from '@nuxtjs/composition-api';
import QrCodeVue from 'qrcode.vue';
import ValueField from '~/components/pages/qr-code/ValueField';
import SizeField from '~/components/pages/qr-code/SizeField';
import ErrorCorrectionLevelField from '~/components/pages/qr-code/ErrorCorrectionLevelField';
import RenderAsField from '~/components/pages/qr-code/RenderAsField';
import BackGroundField from '~/components/pages/qr-code/BackGroundField';
import ForeGroundField from '~/components/pages/qr-code/ForeGroundField';
import { QrCodeErrorCorrectionLevel, QrCodeRenderAsOptionValue, RootState } from '~/types';

export default defineComponent({
  layout: 'tailwind',
  head: {},
  setup () {
    const title = ref<string>('QRコード生成');
    const description = ref<string>('ブラウザでQRコードを生成．');

    useMeta(() => ({
      title: title.value,
      meta: [
        { hid: 'description', name: 'description', content: description.value },
      ],
    }));

    const store = useStore<RootState>();
    const value = computed<string>(() => store.state.qrCodeGenerator.value);
    const size = computed<number>(() => store.state.qrCodeGenerator.size);
    const level = computed<QrCodeErrorCorrectionLevel>(() => store.state.qrCodeGenerator.level);
    const renderAs = computed<QrCodeRenderAsOptionValue>(() => store.state.qrCodeGenerator.renderAs);
    const backGround = computed<string>(() => store.state.qrCodeGenerator.backGround);
    const foreGround = computed<string>(() => store.state.qrCodeGenerator.foreGround);

    return {
      title,
      description,
      value,
      size,
      level,
      renderAs,
      backGround,
      foreGround,
    };
  },
  components: {
    QrCodeVue,
    ValueField,
    SizeField,
    ErrorCorrectionLevelField,
    RenderAsField,
    BackGroundField,
    ForeGroundField,
  },
});
</script>

<style scoped lang="scss">
.qr-setting-fields > .field {
  margin-top: 1rem;
  margin-bottom: 1.5rem;
}
.qr-code {
  margin-top: 3rem;
}
</style>
