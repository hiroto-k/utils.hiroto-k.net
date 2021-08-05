<template>
  <div v-html="markedContent">
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropOptions } from '@nuxtjs/composition-api';
import marked, { MarkedOptions } from 'marked';

export default defineComponent({
  name: 'MarkDownContent',
  props: {
    source: {
      required: true,
      type: String,
    } as PropOptions<string>,
    options: {
      required: false,
      type: Object,
      default (): MarkedOptions {
        return {};
      },
    } as PropOptions<MarkedOptions>,
  },
  setup (props) {
    const markedContent = computed<string>(() => marked(props.source, props.options));

    return {
      markedContent,
    };
  },
});
</script>
