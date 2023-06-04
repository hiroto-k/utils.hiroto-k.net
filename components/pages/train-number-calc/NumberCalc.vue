<template>
  <div>
    <div class="mt-5">
      <span class="block text-lg font-semibold text-slate-700">
        列車番号
      </span>
      <input
        @input="handleChange"
        v-model="value"
        type="text"
        class="mt-1 px-3 py-2 bg-white shadow-sm border-2 placeholder-slate-400 focus:outline-none block w-full rounded-md"
        :class="inputClass"
        placeholder="列車番号を入力"
      >

      <p class="text-red-500" v-if="errorMessage != null">
        {{ errorMessage }}
      </p>
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
import { useField, defineRule } from 'vee-validate';
import { numeric, between } from '@vee-validate/rules';
import TrainNumberCalc from '~/lib/TrainNumberCalc';
import { TrainNumberType } from '~/types';

defineRule('numeric', numeric);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
defineRule('between', between);
defineRule('not-starts-with-zero', (value) => typeof value === 'string' ? !value.startsWith('0') : false);

export default defineComponent({
  name: 'NumberCalc',
  setup () {
    const { value, errorMessage, handleChange } = useField('列車番号', 'numeric|between:1,9999|not-starts-with-zero', { initialValue: '' });
    const numberCalc = computed<TrainNumberCalc>(() => new TrainNumberCalc(value.value));
    const trainType = computed<TrainNumberType|null>(() => numberCalc.value.calc());
    const isRenderTrainType = computed<boolean>(() => (trainType.value !== null));
    const inputClass = computed<string>(() => errorMessage.value == null ? 'border-green-300 focus:border-green-500' : 'border-red-300 focus:border-red-500');

    return {
      numberCalc,
      trainType,
      isRenderTrainType,
      inputClass,
      value,
      errorMessage,
      handleChange,
    };
  },
});
</script>
