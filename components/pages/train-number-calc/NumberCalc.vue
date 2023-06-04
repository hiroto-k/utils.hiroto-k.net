<template>
  <div>
    <div class="mt-5">
      <validation-provider
        name="列車番号"
        rules="numeric|between:1,9999|not-starts-with-zero"
        v-slot="{ errors }"
      >
        <span class="block text-lg font-semibold text-slate-700">
          列車番号
        </span>
        <input
          v-model="trainNumber"
          type="text"
          class="mt-1 px-3 py-2 bg-white shadow-sm border border-2 placeholder-slate-400 focus:outline-none block w-full rounded-md"
          :class="getInputClass(errors)"
          placeholder="列車番号を入力"
        >

        <p class="text-red-500">
          {{ errors[0] }}
        </p>
      </validation-provider>
    </div>

    <button
      v-if="isRenderTrainType"
      v-text="trainType"
      class="bg-blue-600 my-5 text-white rounded-full px-4 py-2 mb-3 mr-3"
    >
    </button>
  </div>
</template>

<script lang="ts">
import { ValidationProvider, extend, localize } from 'vee-validate';
import { numeric, between } from 'vee-validate/dist/rules';
import ja from 'vee-validate/dist/locale/ja.json';
import TrainNumberCalc from '~/lib/TrainNumberCalc';
import { TrainNumberType } from '~/types';

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
    const getInputClass = (errors: string[]): string => errors.length === 0 ? 'border-green-300 focus:border-green-500' : 'border-red-300 focus:border-red-500';

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
