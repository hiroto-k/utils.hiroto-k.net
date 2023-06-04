<template>
  <div v-html="markedContent">
  </div>
</template>

<script lang="ts">
import { marked } from 'marked';

export default defineComponent({
  name: 'MarkDownContent',
  props: {
    source: {
      required: true,
      type: String,
    }, // as PropType<string>,
    options: {
      required: false,
      type: Object,
      default (): marked.MarkedOptions {
        return {};
      },
    }, // as PropType<marked.MarkedOptions>,
  },
  setup (props) {
    const markedContent = computed<string>(() => marked(props.source, props.options));

    return {
      markedContent,
    };
  },
});
</script>
