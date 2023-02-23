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

      <div class="content routes">
        <h3>
          経路
        </h3>
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

export default defineComponent({
  head: {},
  setup () {
    const title = ref<string>('乗車券の経路作成');
    const description = ref<string>('複雑な経路の乗車券を窓口で作る際に紙に書く経路を作るツール');
    const type = ref<string>('');
    const date = ref<string>('');
    const departure = ref<string>('');
    const destination = ref<string>('');
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
      output,
    };
  },
  components: {
  },
});
</script>

<style scoped lang="scss">
</style>
