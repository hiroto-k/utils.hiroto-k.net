<template>
  <div class="app bg-white scroll-smooth h-screen">
    <main class="p-10">
      <nuxt>
      </nuxt>
    </main>

    <tailwind-page-footer>
    </tailwind-page-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import TailwindPageFooter from '~/components/layouts/TailwindPageFooter';

export default defineComponent({
  components: {
    TailwindPageFooter,
  },
});
</script>
