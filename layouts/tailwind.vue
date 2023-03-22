<template>
  <div class="app">
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
