<template>
  <div class="container">
    <h1 class="title" v-text="title">
    </h1>

    <p class="subtitle" v-text="description">
    </p>

    <div class="content">
      <number-calc>
      </number-calc>

      <how-to-calc>
      </how-to-calc>
    </div>
  </div>
</template>

<script lang="ts">
import NumberCalc from '~/components/pages/train-number-calc/NumberCalc';
import HowToCalc from '~/components/pages/train-number-calc/HowToCalc';

export default defineNuxtComponent({
  head: {},
  setup () {
    const title = ref<string>('列車番号から列車種別を計算');
    const description = ref<string>('列車番号から列車種別(特急客, 臨急客, 臨特急客, 高速貨A, 臨専貨A, など)を計算できるページ．');

    useHead(() => ({
      title: title.value,
      meta: [
        { name: 'description', content: description.value },
        { property: 'og:title', content: title.value },
        { property: 'og:description', content: description.value },
        { property: 'og:url', content: 'https://utils.hiroxto.net/train-number-calc' },
      ],
    }));

    return {
      title,
      description,
    };
  },
  components: {
    NumberCalc,
    HowToCalc,
  },
});
</script>
