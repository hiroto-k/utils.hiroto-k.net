<template>
  <div class="app bg-white scroll-smooth h-screen">
    <main class="p-10">
      <slot>
      </slot>
    </main>

    <page-footer>
    </page-footer>
  </div>
</template>

<script lang="ts">
import PageFooter from '~/components/layouts/PageFooter';

export default defineNuxtComponent({
  components: {
    PageFooter,
  },
});
</script>
