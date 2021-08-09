<template>
  <footer class="footer">
    <div class="container">
      <div class="content">
        <div class="columns">
          <div class="column">
            <p v-text="footerTitle" class="footer-column-title">
            </p>
          </div>

          <div class="column">
            <p v-text="footerLinksTitle" class="footer-column-title">
            </p>
            <p
              v-for="(pageLink, allPageLinksKey) in allPageLinks"
              :key="allPageLinksKey"
              class="footer-column-item"
            >
              <nuxt-link
                :to="pageLink.to"
                :title="pageLink.title"
                v-text="pageLink.title"
                class="footer-column-link"
              >
              </nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useStore } from '@nuxtjs/composition-api';
import { Link, RootState } from '~/types';

export default defineComponent({
  name: 'PageFooter',
  setup () {
    const store = useStore<RootState>();
    const allPageLinks = computed<Link[]>(() => store.getters['pageLinks/allPageLinks']);
    const footerTitle = ref<string>('© 2019 hiroxto');
    const footerLinksTitle = ref<string>('Page links');

    return {
      allPageLinks,
      footerTitle,
      footerLinksTitle,
    };
  },
});
</script>

<style scoped>
.footer-column-title {
  color: #000000;
  font-size: 1.2rem;
  font-weight: 500;
}

.footer-column-item {
  color: #000000;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
}

.footer-column-link {
  color: #12428F;
}

.footer-column-link:hover {
  color: #3273dc;
}
</style>
