<template>
  <section class="section">
    <div class="container">
      <h1 class="title" v-text="title">
      </h1>

      <h2 class="subtitle" v-text="description">
      </h2>

      <div class="content settings">
        <h3>
          設定
        </h3>
        <div class="buttons">
          <b-button @click="setUndefinedDate" type="is-info is-light">
            利用日未定
          </b-button>
          <b-button @click="removeAllSettings" type="is-danger">
            全ての設定を削除
          </b-button>
        </div>

        <div class="columns">
          <div class="column is-2">
            <b-field label="券種">
              <b-select
                v-model="type"
                placeholder="乗車券の種類を選択"
                expanded
              >
                <option
                  v-for="(option, typesIndex) in types"
                  :value="option"
                  :key="typesIndex"
                >
                  {{ option }}
                </option>
              </b-select>
            </b-field>
          </div>
          <div class="column is-2">
            <b-field label="利用開始日">
              <b-input
                v-model="month"
                type="text"
                placeholder="月"
              ></b-input>
              <p class="control">
                <span class="button is-static">月</span>
              </p>

              <b-input
                v-model="day"
                type="text"
                placeholder="日"
              ></b-input>
              <p class="control">
                <span class="button is-static">日</span>
              </p>
            </b-field>
          </div>
          <div class="column">
            <b-field label="発駅">
              <b-input
                v-model="departure"
                type="text"
                placeholder="発駅"
              ></b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="着駅">
              <b-input
                v-model="destination"
                type="text"
                placeholder="着駅"
              ></b-input>
            </b-field>
          </div>
        </div>
      </div>

      <div class="content routes">
        <h3>
          経路
        </h3>
        <div class="buttons">
          <b-button @click="addRoute(-1)" type="is-info">
            追加
          </b-button>
          <b-button @click="reverseRoutes" type="is-info is-light">
            逆向き
          </b-button>
          <b-button @click="removeEmptyRoutes" type="is-danger is-light">
            空の経路を削除
          </b-button>
          <b-button @click="removeAllRoutes" type="is-danger">
            全ての経路を削除
          </b-button>
        </div>

        <div
          v-for="(route, routeIndex) in routes"
          :key="routeIndex"
          class="columns"
        >
          <div class="column is-1">
            <p>
              路線数: {{ routeIndex + 1 }}
            </p>
            <button
              @click="deleteRoute(routeIndex)"
              class="delete"
              tabindex="-1"
            ></button>
          </div>
          <div class="column">
            <b-field label="路線名">
              <b-input
                v-model="route.line"
                type="text"
                placeholder="路線名"
                @keydown.tab.native="onKeyupTab(routeIndex)"
                @keydown.shift.enter.native="addRoute(routeIndex)"
              ></b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="接続駅">
              <b-input
                v-model="route.station"
                type="text"
                placeholder="接続駅"
                @keydown.shift.enter.native="addRoute(routeIndex)"
              ></b-input>
            </b-field>
          </div>
        </div>
      </div>

      <div class="content notes">
        <h3>
          備考
        </h3>

        <b-field label="備考">
          <b-input
            v-model="notes"
            type="textarea"
            placeholder="備考"
          ></b-input>
        </b-field>
      </div>

      <div class="content output">
        <h3>
          出力
        </h3>
        <b-button @click="copyOutput" size="is-small">
          Copy
        </b-button>
        <pre v-text="output"></pre>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useMeta } from '@nuxtjs/composition-api';
import { SnackbarProgrammatic as Snackbar } from 'buefy';

interface Route {
  line: string;
  station: string;
}

export default defineComponent({
  head: {},
  setup () {
    const title = ref<string>('乗車券の経路作成');
    const description = ref<string>('複雑な経路の乗車券を窓口で作る際に紙に書く経路を作るツール');

    const types = [
      '片道乗車券',
      '往復乗車券',
      '連続乗車券',
    ];
    const type = ref<string>('片道乗車券');
    const month = ref<string>('');
    const day = ref<string>('');
    const departure = ref<string>('');
    const destination = ref<string>('');
    const removeAllSettings = () => {
      type.value = types[0];
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
    const setUndefinedDate = () => {
      const undefinedDate = '     ';
      month.value = undefinedDate;
      day.value = undefinedDate;
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
    const createRoutesOutput = () => {
      const exceptLastRoutes = valuedRoutes.value.slice(0, valuedRoutes.value.length - 1);
      const lastRoute = valuedRoutes.value.slice(-1)[0];
      const output = exceptLastRoutes.map(route => `${route.line} (${route.station})`).join(' ') + ` ${lastRoute.line}`;
      return output.trim();
    };
    const output = computed<string>(() => {
      const header = `${type.value}\n\n利用開始日: ${month.value}月${day.value}日\n\n区間: ${departure.value}→${destination.value}`;
      const routesOutput = valuedRoutes.value.length === 0 ? '' : createRoutesOutput();
      const content = `経由: ${routesOutput}`;
      const footer = notes.value.trim() === '' ? '' : `備考: ${notes.value.trim()}`;
      return `${header}\n\n${content}\n\n${footer}`.trim();
    });
    const copyOutput = () => {
      navigator.clipboard.writeText(output.value)
        .then((t) => {
          Snackbar.open({
            message: 'Copied!',
            pauseOnHover: true,
            type: 'is-link',
          });
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
      departure,
      destination,
      removeAllSettings,
      createRoute,
      routes,
      notes,
      setUndefinedDate,
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

<style scoped lang="scss">
</style>
