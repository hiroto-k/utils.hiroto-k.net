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
import { defineComponent, useMeta, ref } from '@nuxtjs/composition-api';
import PlaySound from '~/components/pages/cl-sound/PlaySound';
import Specification from '~/components/pages/cl-sound/Specification';

export default defineComponent({
  layout: 'tailwind',
  head: {},
  setup () {
    const title = ref<string>('EMVコンタクトレスのサウンドをWeb Audio APIで再生');
    const description = ref<string>('EMVコンタクトレスのサウンドをWeb Audio APIで再生');

    useMeta(() => ({
      title: title.value,
      meta: [
        { hid: 'description', name: 'description', content: description.value },
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
