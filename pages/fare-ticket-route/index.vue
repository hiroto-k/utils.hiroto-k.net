<template>
  <div class="container">
    <h1 class="title" v-text="title">
    </h1>

    <p class="subtitle" v-text="description">
    </p>

    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-10">
        <h3 class="section-title">
          設定
        </h3>

        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-2">
            <label for="type" class="block mb-2 text-gray-900">
              券種
            </label>
            <select
              v-model="type"
              id="type"
              class="border border-gray-300 rounded-lg block w-full p-2.5"
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
                v-model="month"
                type="text"
                class="rounded-none bg-white border block flex-1 w-full border-gray-300 p-2.5 rounded-l-lg"
                placeholder="月"
              >
              <span class="inline-flex items-center px-3 text-sm text-black bg-gray-200 border border-r-0 border-gray-300">
                月
              </span>
              <input
                v-model="day"
                type="text"
                class="rounded-none bg-white border block flex-1 w-full border-gray-300 p-2.5"
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
              v-model="departure"
              type="text"
              class="mt-1 px-3 py-2 bg-white shadow-sm border border-2 placeholder-slate-400 focus:outline-none block w-full rounded-md"
            >
          </div>
          <div class="col-span-4">
            <label for="date" class="block mb-2 text-gray-900">
              着駅
            </label>
            <input
              v-model="destination"
              type="text"
              class="mt-1 px-3 py-2 bg-white shadow-sm border border-2 placeholder-slate-400 focus:outline-none block w-full rounded-md"
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
          {{ skipDate ? '利用日非省略' : '利用日省略' }}
        </button>
        <button
          @click="reverseRoutes"
          class="button button-control"
        >
          逆向き
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
          v-for="(route, routeIndex) in routes"
          :key="routeIndex"
          class="grid grid-cols-12 gap-4"
        >
          <div class="col-span-2">
            <p>
              路線数: {{ routeIndex + 1 }}
            </p>
            <button
              @click="deleteRoute(routeIndex)"
              class="delete"
              tabindex="-1"
            >
              x
            </button>
          </div>
          <div class="col-span-5">
            <span class="text-lg font-semibold text-slate-700">
              路線名
            </span>
            <input
              v-model="route.line"
              type="text"
              placeholder="路線名"
              class="mt-1 px-3 py-2 bg-white shadow-sm border border-2 placeholder-slate-400 focus:outline-none block w-full rounded-md"
              @keydown.tab.native="onKeyupTab(routeIndex)"
              @keydown.shift.enter.native="addRoute(routeIndex)"
            >
          </div>
          <div class="col-span-5">
            <span class="text-lg font-semibold text-slate-700">
              接続駅
            </span>
            <input
              v-model="route.station"
              type="text"
              placeholder="接続駅"
              class="mt-1 px-3 py-2 bg-white shadow-sm border border-2 placeholder-slate-400 focus:outline-none block w-full rounded-md"
              @keydown.tab="onKeyupTab(routeIndex)"
              @keydown.shift.enter="addRoute(routeIndex)"
            >
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <button
          @click="addRoute(-1)"
          class="button button-control"
        >
          経路追加
        </button>
        <button
          @click="removeEmptyRoutes"
          class="button button-danger-light"
        >
          空経路削除
        </button>
      </div>

      <div class="col-span-10">
        <span class="text-lg block font-semibold text-slate-700">
          備考
        </span>
        <textarea
          v-model="notes"
          placeholder="備考"
          class="mt-1 px-3 py-2 bg-white shadow-sm border border-2 placeholder-slate-400 focus:outline-none block w-full rounded-md"
        ></textarea>
      </div>
      <div class="col-span-2">
        <button
          @click="notes = ''"
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
          class="bg-gray-200 p-5 rounded-md"
        ></pre>
      </div>
      <div class="col-span-2">
        <button
          @click="copyOutput"
          class="button button-control"
        >
          コピー
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useMeta } from '@nuxtjs/composition-api';
import { SnackbarProgrammatic as Snackbar } from 'buefy';
import { DefaultFormatter } from '~/lib/fare-ticket-route/formatter/default-formatter';
import { Route } from '~/types';

export default defineComponent({
  layout: 'tailwind',
  head: {},
  setup () {
    const title = ref<string>('乗車券の経路作成');
    const description = ref<string>('複雑な経路の乗車券を窓口で作る際に紙に書く経路を作るツール');

    const types = [
      '片道乗車券',
      '往復乗車券',
      '連続乗車券 (連続1)',
      '連続乗車券 (連続2)',
    ];
    const type = ref<string>('片道乗車券');
    const month = ref<string>('');
    const day = ref<string>('');
    const skipDate = ref<boolean>(false);
    const departure = ref<string>('');
    const destination = ref<string>('');
    const removeAllSettings = () => {
      type.value = types[0];
      skipDate.value = false;
      [month, day, departure, destination].forEach(ref => {
        ref.value = '';
      });
    };
    const createRoute = (): Route => {
      return { line: '', station: '' };
    };
    const routes = ref<Route[]>([createRoute()]);
    const notes = ref<string>('');
    const valuedRoutes = computed<Route[]>(() => {
      return routes.value.filter((route) => route.line.trim() !== '');
    });
    const setDate = (addDate: number) => {
      if (skipDate.value) {
        alert('利用日省略が設定されています。');
      } else {
        const today = new Date();
        today.setDate(today.getDate() + addDate);
        month.value = (today.getMonth() + 1).toString();
        day.value = today.getDate().toString();
      }
    };
    const setUndefinedDate = () => {
      if (skipDate.value) {
        alert('利用日省略が設定されています。');
      } else {
        const undefinedDate = '     ';
        month.value = undefinedDate;
        day.value = undefinedDate;
      }
    };
    const setSkipDate = () => {
      skipDate.value = !skipDate.value;
      if (skipDate.value) {
        month.value = '省略';
        day.value = '省略';
      } else {
        month.value = '';
        day.value = '';
      }
    };
    const reverseRoutes = () => {
      const newDeparture = destination.value;
      destination.value = departure.value;
      departure.value = newDeparture;
      removeEmptyRoutes();
      routes.value = routes.value.reverse().map((route, index, orig) => {
        route.station = orig[index + 1] == null ? '' : orig[index + 1].station;
        return route;
      });
    };
    const addRoute = (index: number) => {
      if (index <= -1) {
        routes.value.push(createRoute());
      } else {
        routes.value.splice(index + 1, 0, createRoute());
      }
    };
    const deleteRoute = (index: number) => routes.value.splice(index, 1);
    const removeEmptyRoutes = () => {
      const newRoutes = routes.value.filter(route => {
        return route.line.trim() !== '' || route.station.trim() !== '';
      });
      routes.value = newRoutes.length === 0 ? [createRoute()] : newRoutes;
    };
    const removeAllRoutes = () => (routes.value = [createRoute()]);
    const onKeyupTab = (index: number) => {
      if (routes.value.length - 1 === index) {
        addRoute(-1);
      }
    };
    const output = computed<string>(() => {
      const header = [
        type.value,
        skipDate.value ? null : `利用開始日: ${month.value}月${day.value}日`,
        `区間: ${departure.value}→${destination.value}`,
      ].filter((el) => el != null).join('\n\n');
      const routesOutput = new DefaultFormatter(valuedRoutes.value).format();
      const content = `経由: ${routesOutput}`;
      const footer = notes.value.trim() === '' ? '' : `備考: ${notes.value.trim()}`;
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
      types,
      type,
      month,
      day,
      skipDate,
      departure,
      destination,
      removeAllSettings,
      createRoute,
      routes,
      notes,
      setDate,
      setUndefinedDate,
      setSkipDate,
      reverseRoutes,
      addRoute,
      deleteRoute,
      removeEmptyRoutes,
      removeAllRoutes,
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
.button {
  @apply rounded-md px-2 py-2;
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
