<template>
  <div class="app bg-white scroll-smooth h-screen">
    <main class="p-10">
      <nuxt>
      </nuxt>
    </main>

    <page-footer>
    </page-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import PageFooter from '~/components/layouts/PageFooter';

export default defineComponent({
  components: {
    PageFooter,
  },
});
</script>
