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
import { computed, defineComponent, ref, useMeta, useStore } from '@nuxtjs/composition-api';
import LinksMenu from '~/components/ui/LinksMenu';
import { Link, PageLinksState } from '~/types';

export default defineComponent({
  head: {},
  setup () {
    const title = ref<string>('utils.hiroxto.net');
    const description = ref<string>('Utility site for me.');
    const linksStore = useStore<PageLinksState>();
    const pageLinks = computed<Link[]>(() => linksStore.getters['pageLinks/pageLinks']);

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
