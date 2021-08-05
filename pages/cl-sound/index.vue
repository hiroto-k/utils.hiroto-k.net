<template>
  <section class="section">
    <div class="container">
      <h1 class="title" v-text="title">
      </h1>

      <h2 class="subtitle" v-text="description">
      </h2>

      <div class="content">
        <play-sound>
        </play-sound>

        <specification>
        </specification>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, useMeta } from '@nuxtjs/composition-api';
import PlaySound from '~/components/pages/cl-sound/PlaySound';
import Specification from '~/components/pages/cl-sound/Specification';

export default defineComponent({
  head: {},
  setup () {
    const title = computed<string>(() => 'EMVコンタクトレスのサウンドをWeb Audio APIで再生');
    const description = computed<string>(() => 'EMVコンタクトレスのサウンドをWeb Audio APIで再生');

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
