<template>
  <section class="section">
    <div class="container">
      <h1 class="title" v-text="title">
      </h1>

      <h2 class="subtitle" v-text="description">
      </h2>

      <links-menu :links="pageLinks">
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
    const title = ref<string>('utils.hiroxto.net');
    const description = ref<string>('Utility site for me.');
    const pageLinks = ref<Link[]>([
      {
        title: '列車番号メモ',
        to: '/train-number',
      },
      {
        title: '列車番号から列車種別を計算',
        to: '/train-number-calc',
      },
      {
        title: 'QRコード生成',
        to: '/qr-code',
      },
      {
        title: 'EMVコンタクトレスのサウンドをWeb Audio APIで再生',
        to: '/cl-sound',
      },
      {
        title: '乗車券の経路作成',
        to: '/fare-ticket-route',
      },
    ]);

    useMeta(() => ({
      title: title.value,
      titleTemplate: '',
      meta: [
        { hid: 'description', name: 'description', content: description.value },
      ],
    }));

    return {
      title,
      description,
      pageLinks,
    };
  },
  components: {
    LinksMenu,
  },
});
</script>
