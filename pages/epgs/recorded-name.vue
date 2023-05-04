<template>
  <div class="container">
    <h1 class="title" v-text="title">
    </h1>

    <p class="subtitle" v-text="description">
    </p>

    <div class="xl:grid xl:grid-cols-12 xl:gap-4">
      <div class="col-span-12">
        <h3 class="section-title">
          設定
        </h3>
      </div>

      <div class="col-span-2">
        <label class="block mb-2 text-gray-900">
          放送開始年
        </label>
        <input
          v-model="year"
          type="text"
          class="input rounded-md block flex-1 p-2.5"
          placeholder="西暦4桁"
        >
      </div>
      <div class="col-span-2">
        <label class="block mb-2 text-gray-900">
          シーズン
        </label>
        <select
          v-model="season"
          id="type"
          class="input rounded-lg block w-full p-2.5"
        >
          <option
            v-for="(option, seasonsIndex) in seasonsList"
            :value="option.value"
            :key="seasonsIndex"
          >
            {{ option.name }}
          </option>
        </select>
      </div>

      <div class="col-span-6">
        <label class="block mb-2 text-gray-900">
          番組名
        </label>
        <input
          v-model="programName"
          type="text"
          :disabled="isUnclassifiable"
          :class="{
            'rounded-md w-full p-2.5 bg-gray-100 border-gray-300 text-gray-900': isUnclassifiable,
            'input rounded-md w-full p-2.5': !isUnclassifiable
          }"
          placeholder="番組名"
        >
      </div>
      <div class="col-span-2">
        <label class="block mb-2 text-gray-900">
          番組名オプション
        </label>

        <div class="flex">
          <div class="flex items-center mr-4">
            <input
              v-model="isUnclassifiable"
              type="checkbox"
              id="isUnclassifiable"
              class="input checkbox rounded-md"
            >
            <label for="isUnclassifiable" class="ml-2 text-gray-900">
              分類不要
            </label>
          </div>
          <div class="flex items-center mr-4">
            <input
              v-model="isRepeat"
              :disabled="isUnclassifiable"
              type="checkbox"
              id="isRepeat"
              class="input checkbox rounded-md"
            >
            <label for="isRepeat" class="ml-2 text-gray-900">
              再放送
            </label>
          </div>
        </div>
      </div>
      <div class="col-span-12">
        <h3 class="section-title">
          出力
        </h3>
        <button
          @click="copyOutput"
          class="button button-control"
        >
          コピー
        </button>
        <pre
          v-text="output"
          class="bg-gray-100 p-5 rounded-md"
        ></pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useMeta } from '@nuxtjs/composition-api';

type SeasonName = '冬アニメ' | '春アニメ' | '夏アニメ' | '秋アニメ' | 'アニメ以外';
type SeasonValue = '01_winter' | '02_spring' | '03_summer' | '04_autumn' | '10_other';

interface Season {
  name: SeasonName
  value: SeasonValue
}

export default defineComponent({
  head: {},
  setup () {
    const title = ref<string>('録画サーバーの保存先のパスを生成');
    const description = ref<string>('録画サーバーの保存先のパスを生成する');

    const year = ref<string>(String(new Date().getFullYear()));
    const seasonsList = ref<Season[]>([
      {
        name: '冬アニメ',
        value: '01_winter',
      },
      {
        name: '春アニメ',
        value: '02_spring',
      },
      {
        name: '夏アニメ',
        value: '03_summer',
      },
      {
        name: '秋アニメ',
        value: '04_autumn',
      },
      {
        name: 'アニメ以外',
        value: '10_other',
      },
    ]);
    const season = ref<SeasonValue>(seasonsList.value[0].value);
    const isUnclassifiable = ref<boolean>(false);
    const isRepeat = ref<boolean>(false);
    const programName = ref<string>('');
    const name = computed<string>(() => {
      if (isUnclassifiable.value) {
        return '10_other';
      }
      const prefix = isRepeat.value ? 'repeat_' : '';
      return `${prefix}${programName.value}`;
    });
    const output = computed<string>(() => {
      return [year.value, season.value, name.value].join('/');
    });
    const copyOutput = () => {
      navigator.clipboard.writeText(output.value)
        .then((t) => {
          alert('Copied!');
          return t;
        })
        .catch(e => {
          console.error(e);
        });
    };

    useMeta(() => ({
      title: title.value,
      meta: [
        { hid: 'description', name: 'description', content: description.value },
      ],
    }));

    return {
      title,
      description,
      year,
      seasonsList,
      season,
      isUnclassifiable,
      isRepeat,
      programName,
      output,
      copyOutput,
    };
  },
  components: {
  },
});
</script>

<style scoped lang="postcss">
.input {
  @apply bg-white border border-gray-300 focus:border-blue-300;
}

.checkbox {
  @apply w-4 h-4 text-blue-600 rounded focus:ring-blue-500;
}

.button {
  @apply rounded-md px-2 py-2 mb-2;
}

.button-control {
  @apply bg-gray-400 text-white;
}

.section-title {
  @apply text-2xl my-5;
}
</style>
