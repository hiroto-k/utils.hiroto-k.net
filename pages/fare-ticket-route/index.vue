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
        <div class="columns">
          <div class="column">
            <b-field label="券種">
              <b-input
                v-model="type"
                type="text"
                placeholder="券種"
              ></b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="利用開始日">
              <b-input
                v-model="date"
                type="text"
                placeholder="利用開始日"
              ></b-input>
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

      <div class="content routes block">
        <h3>
          経路
        </h3>
        <div class="buttons">
          <b-button @click="addRoute" type="is-info">
            追加
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
          </div>
          <div class="column">
            <b-field label="路線名">
              <b-input
                v-model="route.line"
                type="text"
                placeholder="路線名"
                @keydown.tab.native="onKeyupTab(routeIndex)"
              ></b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="接続駅">
              <b-input
                v-model="route.station"
                type="text"
                placeholder="接続駅"
              ></b-input>
            </b-field>
          </div>
          <div class="column is-1">
            <button class="delete" tabindex="-1"></button>
          </div>
        </div>
      </div>

      <div class="content routes">
        <h3>
          出力
        </h3>
        <pre v-text="output"></pre>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useMeta } from '@nuxtjs/composition-api';

interface Route {
  line: string;
  station: string;
}

export default defineComponent({
  head: {},
  setup () {
    const title = ref<string>('乗車券の経路作成');
    const description = ref<string>('複雑な経路の乗車券を窓口で作る際に紙に書く経路を作るツール');
    const type = ref<string>('');
    const date = ref<string>('');
    const departure = ref<string>('');
    const destination = ref<string>('');
    const createRoute = (): Route => {
      return { line: '', station: '' };
    };
    const routes = ref<Route[]>([createRoute()]);
    const addRoute = () => routes.value.push(createRoute());
    const removeEmptyRoutes = () => {
      const newRoutes = routes.value.filter(route => {
        return route.line.trim() !== '' || route.station.trim() !== '';
      });
      routes.value = newRoutes.length === 0 ? [createRoute()] : newRoutes;
    };
    const removeAllRoutes = () => (routes.value = [createRoute()]);
    const onKeyupTab = (index: number) => {
      if (routes.value.length - 1 === index) {
        addRoute();
      }
    };
    const output = computed<string>(() => {
      return `券種: ${type.value}\n\n利用開始日: ${date.value}\n\n区間: ${departure.value}→${destination.value}\n\n`;
    });

    useMeta(() => ({
      title: title.value,
      meta: [
        { hid: 'description', name: 'description', content: description.value },
      ],
    }));

    return {
      title,
      description,
      type,
      date,
      departure,
      destination,
      createRoute,
      routes,
      addRoute,
      removeEmptyRoutes,
      removeAllRoutes,
      onKeyupTab,
      output,
    };
  },
  components: {
  },
});
</script>

<style scoped lang="scss">
</style>
