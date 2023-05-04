<template>
  <div class="container">
    <h1 class="title" v-text="title">
    </h1>

    <p class="subtitle" v-text="description">
    </p>

    <div class="content">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useMeta } from '@nuxtjs/composition-api';

export default defineComponent({
  head: {},
  setup () {
    const title = ref<string>('録画サーバーの保存先のパスを生成');
    const description = ref<string>('録画サーバーの保存先のパスを生成する');

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
  },
});
</script>
