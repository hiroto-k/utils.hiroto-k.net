<template>
  <train-number-page
    :title="title"
    :source="source"
  >
  </train-number-page>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';
import TrainNumberPage from '~/components/pages/train-number/TrainNumberPage';
import contentSource from '~/assets/train-number/2018-03-17.md';

export default defineComponent({
  name: 'TrainNumber20180317Page',
  components: {
    TrainNumberPage,
  },
  setup () {
    const title = computed<string>(() => '2018年3月17日 改正');
    const source = computed<string>(() => contentSource);

    return {
      title,
      source,
    };
  },
});
</script>
