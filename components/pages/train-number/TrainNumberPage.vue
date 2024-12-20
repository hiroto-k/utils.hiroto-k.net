<template>
  <mark-down-only-content :source="source">
  </mark-down-only-content>
</template>

<script lang="ts">
import MarkDownOnlyContent from '~/components/MarkDownOnlyContent';

export default defineComponent({
  name: 'TrainNumberPage',
  props: {
    title: {
      required: true,
      type: String,
    }, // as PropType<string>,
    source: {
      required: true,
      type: String,
    }, // as PropType<string>,
  },
  head: {},
  setup (props) {
    const description = computed<string>(() => `列車番号メモ ${props.title}`);

    useHead(() => ({
      title: props.title,
      meta: [
        { name: 'description', content: description.value },
        { property: 'og:title', content: props.title },
        { property: 'og:description', content: description.value },
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
