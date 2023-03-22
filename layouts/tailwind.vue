<template>
  <div class="app bg-white scroll-smooth h-screen p-10">
    <main>
      <nuxt>
      </nuxt>
    </main>
    <page-footer>
    </page-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  components: {
  },
});
</script>

<style scoped>
.app {
  font-family: "Noto Sans JP", "Helvetica", sans-serif;
}
</style>
