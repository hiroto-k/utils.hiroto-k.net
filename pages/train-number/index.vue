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
import { computed, defineComponent, useMeta, useStore } from '@nuxtjs/composition-api';
import LinksMenu from '~/components/ui/LinksMenu';
import { Link, RootState } from '~/types';

export default defineComponent({
  setup () {
    const store = useStore<RootState>();
    const title = computed<string>(() => '列車番号メモ');
    const description = computed<string>(() => '入出場，車輪転削などの予定臨や，パターンが概ね決まっている臨工や臨単の列車番号のメモ．');
    const trainNumberContentPageLinks = computed<Link[]>(() => store.getters['pageLinks/trainNumberContentPageLinks']);

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
