<template>
  <div class="container">
    <h1 class="title" v-text="title">
    </h1>

    <p class="subtitle" v-text="description">
    </p>

    <div class="content">
      <play-sound>
      </play-sound>

      <specification>
      </specification>
    </div>
  </div>
</template>

<script lang="ts">
import PlaySound from '~/components/pages/cl-sound/PlaySound';
import Specification from '~/components/pages/cl-sound/Specification';

export default defineNuxtComponent({
  head: {},
  setup () {
    const title = ref<string>('EMVコンタクトレスのサウンドをWeb Audio APIで再生');
    const description = ref<string>('EMVコンタクトレスのサウンドをWeb Audio APIで再生');

    useHead(() => ({
      title: title.value,
      meta: [
        { name: 'description', content: description.value },
        { property: 'og:title', content: title.value },
        { property: 'og:description', content: description.value },
        { property: 'og:url', content: 'https://utils.hiroxto.net/cl-sound' },
        { property: 'og:image', content: 'https://utils.hiroxto.net/assets/cl-sound/ogp-default.png' },

        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:site', content: '@hiroxto' },
        { property: 'twitter:title', content: title },
        { property: 'twitter:description', content: description.value },
        { property: 'twitter:image', content: 'https://utils.hiroxto.net/assets/cl-sound/ogp-default.png' },
      ],
    }));

    return {
      title,
      description,
    };
  },
  components: {
    PlaySound,
    Specification,
  },
});
</script>
