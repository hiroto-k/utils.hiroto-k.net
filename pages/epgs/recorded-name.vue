<template>
  <div class="container">
    <h1 class="title" v-text="title">
    </h1>

    <div class="xl:grid xl:grid-cols-12 xl:gap-4">
      <div class="col-span-12">
        <h2 class="section-title">
          設定
        </h2>
      </div>

      <div class="col-span-2">
        <label class="block mb-2 text-gray-900">
          放送開始年
        </label>
        <input
          v-model="year"
          type="number"
          class="input rounded-md block w-full p-2.5"
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
        <h2 class="section-title">
          出力
        </h2>
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
      <div class="col-span-12">
        <h2 class="section-title">
          保存先のルール
        </h2>

        <h3 class="subsection-title">
          基本構成
        </h3>
        <ul class="rule-list">
          <li>
            <span class="code-block-inline">
              年/放送時期/番組名
            </span>
          </li>
        </ul>
        <h3 class="subsection-title">
          年
        </h3>
        <ul class="rule-list">
          <li>
            西暦を4桁で書く
          </li>
        </ul>
        <h3 class="subsection-title">
          シーズン
        </h3>
        <ul class="rule-list">
          <li>
            アニメの場合は以下のルールを利用する
            <ul class="pl-5 list-disc list-inside">
              <li>プレフィクスは00番台を利用する</li>
              <li>
                冬アニメは<span class="code-block-inline">01_winter</span>
              </li>
              <li>
                春アニメは<span class="code-block-inline">02_spring</span>
              </li>
              <li>
                夏アニメは<span class="code-block-inline">03_summer</span>
              </li>
              <li>
                秋アニメは<span class="code-block-inline">04_autumn</span>
              </li>
              <li>
                連続した複数のシーズンに跨がって放送する場合，初回放送の時期を利用し，時期が変わっても同じディレクトリに保存する
              </li>
            </ul>
          </li>
          <li>アニメ以外の番組では<span class="code-block-inline">10_other</span>を利用する</li>
        </ul>
        <h3 class="subsection-title">
          番組名
        </h3>
        <ul class="rule-list">
          <li>
            基本的にアルファベットで書く
          </li>
          <li>
            番組名のアルファベットは公式サイトのドメインやSNSのアカウント名などを利用する
          </li>
          <li>
            番組が再放送の場合，頭に<span class="code-block-inline">repeat_</span>を付与する
          </li>
          <li>
            特番などで分類が不要な場合，上記ルールを適用せずに<span class="code-block-inline">10_other</span>を利用する
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
type SeasonName = '冬アニメ' | '春アニメ' | '夏アニメ' | '秋アニメ' | 'アニメ以外';
type SeasonValue = '01_winter' | '02_spring' | '03_summer' | '04_autumn' | '10_other';

interface Season {
  name: SeasonName
  value: SeasonValue
  isCurrentSeason: (month: number)=> boolean
}

export default defineNuxtComponent({
  head: {},
  setup () {
    const title = ref<string>('録画サーバーの保存先のパスを生成');
    const description = ref<string>('録画サーバーの保存先のパスを生成する');

    const year = ref<number>(new Date().getFullYear());
    const seasonsList = ref<Season[]>([
      {
        name: '冬アニメ',
        value: '01_winter',
        // @note 準備期間を考慮して放送月より1月前からの3ヶ月分を入れる
        isCurrentSeason: (month) => [12, 1, 2].includes(month),
      },
      {
        name: '春アニメ',
        value: '02_spring',
        isCurrentSeason: (month) => [3, 4, 5].includes(month),
      },
      {
        name: '夏アニメ',
        value: '03_summer',
        isCurrentSeason: (month) => [6, 7, 8].includes(month),
      },
      {
        name: '秋アニメ',
        value: '04_autumn',
        isCurrentSeason: (month) => [9, 10, 11].includes(month),
      },
      {
        name: 'アニメ以外',
        value: '10_other',
        isCurrentSeason: () => false,
      },
    ]);

    const currentMonth = new Date().getMonth() + 1;
    const currentSeasonIndex = seasonsList.value.map((season) => season.isCurrentSeason(currentMonth)).indexOf(true);
    const season = ref<SeasonValue>(seasonsList.value[currentSeasonIndex === -1 ? 0 : currentSeasonIndex].value);
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

    useHead(() => ({
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

.subsection-title {
  @apply text-lg text-gray-900 my-2;
}

.rule-list {
  @apply text-gray-900 list-disc list-inside;
}

.code-block-inline {
  @apply bg-gray-200 text-rose-600 p-1;
}
</style>
