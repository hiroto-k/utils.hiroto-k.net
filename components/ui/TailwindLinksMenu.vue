<template>
  <aside class="menu">
    <p class="menu-label" v-text="label">
    </p>

    <ul class="py-1 list-unstyled fw-normal small">
      <li
        v-for="(link, linksKey) in links"
        :key="linksKey"
      >
        <nuxt-link
          :to="link.to"
          :title="link.title"
          v-text="link.title"
          class="ml-5 py-2 transition-colors duration-200 relative flex items-center flex-wrap hover:text-gray-900 text-gray-500 hover:bg-slate-100"
        >
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts">
import { defineComponent, PropOptions } from '@nuxtjs/composition-api';
import { Link } from '~/types';

export default defineComponent({
  name: 'TailwindLinksMenu',
  props: {
    links: {
      required: true,
      type: Array,
    } as PropOptions<Link[]>,
    label: {
      type: String,
      default (): string {
        return 'pages';
      },
    } as PropOptions<string>,
  },
});
</script>
