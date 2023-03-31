<template>
  <div class="container">
    <h1 class="title" v-text="title">
    </h1>

    <p class="subtitle" v-text="description">
    </p>

    <div class="xl:grid xl:grid-cols-12 xl:gap-4">
      <div class="col-span-10">
        <h3 class="section-title">
          設定
        </h3>

        <div class="xl:grid xl:grid-cols-12 xl:gap-4">
          <div class="col-span-2">
            <label for="type" class="block mb-2 text-gray-900">
              券種
            </label>
            <select
              v-model="store.type"
              id="type"
              class="input rounded-lg block w-full p-2.5"
            >
              <option
                v-for="(option, typesIndex) in types"
                :value="option"
                :key="typesIndex"
              >
                {{ option }}
              </option>
            </select>
          </div>
          <div class="col-span-2">
            <label class="block mb-2 text-gray-900">
              利用開始日
            </label>
            <div class="flex">
              <input
                v-model="store.month"
                type="text"
                class="input rounded-none block flex-1 w-full p-2.5 rounded-l-lg"
                placeholder="月"
              >
              <span class="inline-flex items-center px-3 text-sm text-black bg-gray-200 border border-r-0 border-gray-300">
                月
              </span>
              <input
                v-model="store.day"
                type="text"
                class="input rounded-none block flex-1 w-full p-2.5"
                placeholder="日"
              >
              <span class="inline-flex items-center px-3 text-sm text-black bg-gray-200 border border-r-0 border-gray-300 rounded-r-md">
                日
              </span>
            </div>
          </div>
          <div class="col-span-4">
            <label for="date" class="block mb-2 text-gray-900">
              発駅
            </label>
            <input
              v-model="store.departure"
              type="text"
              class="input mt-1 px-3 py-2 shadow-sm block w-full rounded-md"
              placeholder="発駅"
            >
          </div>
          <div class="col-span-4">
            <label for="date" class="block mb-2 text-gray-900">
              着駅
            </label>
            <input
              v-model="store.destination"
              type="text"
              class="input mt-1 px-3 py-2 shadow-sm block w-full rounded-md"
              placeholder="着駅"
            >
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <button
          @click="setDate(0)"
          class="button button-control"
        >
          本日
        </button>
        <button
          @click="setDate(1)"
          class="button button-control"
        >
          明日
        </button>
        <button
          @click="setDate(2)"
          class="button button-control"
        >
          明後日
        </button>
        <button
          @click="setUndefinedDate"
          class="button button-control"
        >
          利用日未定
        </button>
        <button
          @click="setSkipDate"
          class="button button-control"
        >
          {{ store.skipDate ? '利用日非省略' : '利用日省略' }}
        </button>
        <button
          @click="store.reverseStationsAndRoutes()"
          class="button button-control"
        >
          発着逆転
        </button>
        <button
          @click="removeAllSettings"
          class="button button-danger"
        >
          全設定クリア
        </button>
      </div>

      <div class="col-span-10">
        <h3 class="section-title">
          経路
        </h3>
        <div
          v-for="(route, routeIndex) in store.routes"
          :key="routeIndex"
          class="grid grid-cols-12 gap-4"
        >
          <div class="col-span-2 text-gray-900">
            <p>
              経路数: {{ routeIndex + 1 }}
            </p>
            <button
              @click="store.deleteRoute(routeIndex)"
              class="delete"
              tabindex="-1"
            >
              x
            </button>
          </div>
          <div class="col-span-5">
            <span class="text-gray-900">
              路線名
            </span>
            <input
              v-model="route.line"
              type="text"
              placeholder="路線名"
              class="input mt-1 px-3 py-2 block w-full rounded-md"
              @keydown.tab="onKeyupTab(routeIndex)"
              @keydown.shift.enter="store.addRoute(routeIndex)"
            >
          </div>
          <div class="col-span-5">
            <span class="text-gray-900">
              接続駅
            </span>
            <input
              v-model="route.station"
              type="text"
              placeholder="接続駅"
              class="input mt-1 px-3 py-2 block w-full rounded-md"
              @keydown.tab="onKeyupTab(routeIndex)"
              @keydown.shift.enter="store.addRoute(routeIndex)"
            >
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <button
          @click="store.addRoute(-1)"
          class="button button-control"
        >
          経路追加
        </button>
        <button
          @click="store.deleteEmptyRoutes()"
          class="button button-danger-light"
        >
          空経路削除
        </button>
        <p class="text-base">
          Tips: 任意の経路でShift+Enterを押すと下に経路追加，最後の経路でTabを押すと最後に経路追加
        </p>
      </div>

      <div class="col-span-10">
        <span class="text-lg block font-semibold text-slate-700">
          備考
        </span>
        <textarea
          v-model="store.notes"
          placeholder="備考"
          class="input mt-1 px-3 py-2 block w-full rounded-md"
        ></textarea>
      </div>
      <div class="col-span-2">
        <button
          @click="store.resetNotes()"
          class="button button-danger-light"
        >
          備考クリア
        </button>
      </div>

      <div class="col-span-10">
        <h3 class="section-title">
          出力
        </h3>
        <pre
          v-text="output"
          class="bg-gray-100 p-5 rounded-md"
        ></pre>
      </div>
      <div class="col-span-2">
        <button
          @click="copyOutput"
          class="button button-control"
        >
          コピー
        </button>
        <select
          v-model="usingFormatter"
          id="formatter"
          class="button button-control"
        >
          <option
            v-for="(formatterObject, formattersIndex) in formatters"
            :value="formatterObject.value"
            :key="formattersIndex"
          >
            {{ formatterObject.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useMeta } from '@nuxtjs/composition-api';
import { DefaultFormatter } from '~/lib/fare-ticket-route/formatter/default-formatter';
import { LikeMR52Formatter } from '../../lib/fare-ticket-route/formatter/like-mr52-formatter';
import { useFareTicketRoute } from '../../store/fareTicketRoute';
import { Formatter, TicketType } from '../../types';

export default defineComponent({
  head: {},
  setup () {
    const title = ref<string>('乗車券の経路作成');
    const description = ref<string>('複雑な経路の乗車券を窓口で作る際に紙に書く経路を作るツール');
    const store = useFareTicketRoute();

    const types: TicketType[] = [
      '片道乗車券',
      '往復乗車券',
      '連続乗車券',
      '別線往復乗車券',
    ];
    const formatters = ref([
      {
        name: 'デフォルト',
        value: 'default',
        create: (routes) => new DefaultFormatter(routes),
      },
      {
        name: 'MR52風',
        value: 'mr52',
        create: (routes) => new LikeMR52Formatter(routes),
      },
    ]);
    const usingFormatter = ref<string>('default');

    const removeAllSettings = () => {
      store.resetType();
      store.useDate();
      store.resetStations();
    };
    const setDate = (addDate: number) => {
      if (store.skipDate) {
        alert('利用日省略が設定されています。');
      } else {
        store.setDate(addDate);
      }
    };
    const setUndefinedDate = () => {
      if (store.skipDate) {
        alert('利用日省略が設定されています。');
      } else {
        store.setUndefinedDate();
      }
    };
    const setSkipDate = () => {
      store.skipDate = !store.skipDate;
      if (store.skipDate) {
        store.unUseDate();
      } else {
        store.useDate();
      }
    };
    const onKeyupTab = (index: number) => {
      if (store.routes.length - 1 === index) {
        store.addRoute(-1);
      }
    };
    const output = computed<string>(() => {
      const header = [
        store.type,
        store.skipDate ? null : `利用開始日: ${store.month}月${store.day}日`,
        `区間: ${store.departure}→${store.destination}`,
      ].filter((el) => el != null).join('\n\n');

      const formatter: Formatter = formatters.value.find(f => f.value === usingFormatter.value).create(store.valuedRoutes);
      const routesOutput = formatter.format();
      const content = `経由: ${routesOutput}`;

      const footer = store.notes === '' ? '' : `備考: ${store.notes.trim()}`;

      return `${header}\n\n${content}\n\n${footer}`.trim();
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
      store,
      types,
      formatters,
      usingFormatter,
      removeAllSettings,
      setDate,
      setUndefinedDate,
      setSkipDate,
      onKeyupTab,
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

.button {
  @apply rounded-md px-2 py-2 mb-2;
}

.button-control {
  @apply bg-gray-400 text-white;
}

.button-danger {
  @apply bg-red-400 text-white;
}

.button-danger-light {
  @apply bg-red-200 text-red-800;
}

.section-title {
  @apply text-2xl my-5;
}
</style>
