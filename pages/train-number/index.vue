<template>
  <section class="section">
    <div class="container">
      <h1 class="title" v-text="title">
      </h1>

      <h2 class="subtitle" v-text="description">
      </h2>

      <links-menu :links="trainNumberContentPageLinks">
      </links-menu>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, useMeta } from '@nuxtjs/composition-api';
import LinksMenu from '~/components/ui/LinksMenu';
import { Link } from '~/types';

export default defineComponent({
  head: {},
  setup () {
    const title = ref<string>('列車番号メモ');
    const description = ref<string>('入出場，車輪転削などの予定臨や，パターンが概ね決まっている臨工や臨単の列車番号のメモ．');
    const trainNumberContentPageLinks = ref<Link[]>([
      {
        title: '2018年3月17日 改正',
        to: '/train-number/2018-03-17',
      },
      {
        title: '2019年3月16日 改正',
        to: '/train-number/2019-03-16',
      },
      {
        title: '2020年3月14日 改正',
        to: '/train-number/2020-03-14',
      },
      {
        title: '2021年3月13日 改正',
        to: '/train-number/2021-03-13',
      },
    ]);

    useMeta(() => ({
      title: title.value,
      meta: [
        { hid: 'description', name: 'description', content: description.value },
      ],
    }));

    return {
      title,
      description,
      trainNumberContentPageLinks,
    };
  },
  components: {
    LinksMenu,
  },
});
</script>
