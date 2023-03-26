<template>
  <mark-down-only-content :source="source">
  </mark-down-only-content>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, useMeta } from '@nuxtjs/composition-api';
import MarkDownOnlyContent from '~/components/MarkDownOnlyContent';

export default defineComponent({
  name: 'TrainNumberPage',
  props: {
    title: {
      required: true,
      type: String,
    } as PropType<string>,
    source: {
      required: true,
      type: String,
    } as PropType<string>,
  },
  head: {},
  setup (props) {
    const description = computed<string>(() => `列車番号メモ ${props.title}`);

    useMeta(() => ({
      title: props.title,
      meta: [
        { hid: 'description', name: 'description', content: description.value },
      ],
    }));

    return {
      description,
    };
  },
  components: {
    MarkDownOnlyContent,
  },
});
</script>
