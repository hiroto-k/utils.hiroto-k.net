<template>
  <footer class="bg-zinc-50 p-10">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-6">
        <p v-text="footerTitle" class="text-xl">
        </p>
      </div>
      <div class="col-span-6">
        <p v-text="footerLinksTitle" class="text-xl"></p>
        <p
          v-for="(pageLink, allPageLinksKey) in allPageLinks"
          :key="allPageLinksKey"
          class="py-1"
        >
          <nuxt-link
            :to="pageLink.to"
            :title="pageLink.title"
          >
            {{ pageLink.title }}
          </nuxt-link>
        </p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Link } from '~/types';

export default defineNuxtComponent({
  name: 'PageFooter',
  setup () {
    const allPageLinks = ref<Link[]>([
      {
        title: 'トップページ',
        to: '/',
      },
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
      {
        title: '録画サーバーの保存先のパスを生成',
        to: '/epgs/recorded-name',
      },
    ]);
    const footerTitle = ref<string>('© 2019 hiroxto');
    const footerLinksTitle = ref<string>('Page links');

    return {
      allPageLinks,
      footerTitle,
      footerLinksTitle,
    };
  },
});
</script>

<style scoped>
</style>
