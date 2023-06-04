<template>
  <div class="app bg-white scroll-smooth h-screen">
    <main class="p-10">
      <slot>
      </slot>
    </main>

    <page-footer>
    </page-footer>
  </div>
</template>

<script lang="ts">
import PageFooter from '~/components/layouts/PageFooter';

export default defineNuxtComponent({
  components: {
    PageFooter,
  },
  setup () {
    useHead({
      titleTemplate: '%s | utils.hiroxto.net',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Generic description.' },
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '192x192', href: '/apple-touch-icon.png' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Sans+JP&display=swap' },
      ],
    });
  },
});
</script>
