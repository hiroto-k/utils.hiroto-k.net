<template>
  <div class="number-calc">
    <div class="field">
      <validation-provider
        name="列車番号"
        rules="numeric|between:1,9999|not-starts-with-zero"
        v-slot="{ errors }"
      >
        <label class="label">列車番号</label>
        <div class="control">
          <input
            v-model="trainNumber"
            :class="getInputClass(errors)"
            class="input"
            type="text"
            placeholder="列車番号を入力"
          >
        </div>

        <p class="help is-danger">
          {{ errors[0] }}
        </p>
      </validation-provider>
    </div>

    <b-tag
      v-if="isRenderTrainType"
      v-text="trainType"
      type="is-info"
      size="is-large"
      rounded
    >
    </b-tag>
  </div>
</template>

<script lang="ts">
import { ValidationProvider, extend, localize } from 'vee-validate';
import { numeric, between } from 'vee-validate/dist/rules';
import ja from 'vee-validate/dist/locale/ja.json';
import TrainNumberCalc from '~/lib/TrainNumberCalc';
import { TrainNumberType } from '~/types';
import { computed, defineComponent, ref } from '@nuxtjs/composition-api';

ja.messages['not-starts-with-zero'] = '{_field_}は不正な値です。';
extend('numeric', numeric);
extend('between', between);
extend('not-starts-with-zero', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate: (value: any): boolean => {
    if (typeof value === 'string') {
      return !value.startsWith('0');
    } else {
      return false;
    }
  },
});
localize('ja', {
  messages: ja.messages,
});

export default defineComponent({
  name: 'NumberCalc',
  setup () {
    const trainNumber = ref('');
    const numberCalc = computed<TrainNumberCalc>(() => new TrainNumberCalc(trainNumber.value));
    const trainType = computed<TrainNumberType|null>(() => numberCalc.value.calc());
    const isRenderTrainType = computed<boolean>(() => (trainType.value !== null));
    const getInputClass = (errors: string[]): string => errors.length === 0 ? 'is-success' : 'is-danger';

    return {
      trainNumber,
      numberCalc,
      trainType,
      isRenderTrainType,
      getInputClass,
    };
  },
  components: {
    ValidationProvider,
  },
});
</script>
