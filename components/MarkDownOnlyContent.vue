<template>
  <div class="container">
    <mark-down-content
      :source="source"
      :options="options"
      :class="contentClass"
    >
    </mark-down-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropOptions } from '@nuxtjs/composition-api';
import MarkDownContent from '~/components/MarkDownContent';
import { MarkedOptions } from 'marked';

export default defineComponent({
  name: 'MarkDownOnlyContent',
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
  setup () {
    const classNames: string[] = [
      '[&_*]:text-base',
      '[&_*]:my-1.5',
      '[&_h1]:text-4xl',
      '[&_h1]:font-bold',
      '[&_h2]:text-3xl',
      '[&_h2]:font-bold',
      '[&_h2]:mt-5',
      '[&_h3]:text-2xl',
      '[&_h3]:font-bold',
      '[&_h3]:mt-5',
      '[&_ul]:list-disc',
      '[&_ul]:list-outside',
      '[&_ul]:ml-8',
      '[&_a]:text-purple-500',
      '[&_code]:bg-neutral-100',
      '[&_code]:text-red-500',
    ];
    const contentClass = classNames.join(' ');

    return {
      contentClass,
    };
  },
  components: {
    MarkDownContent,
  },
});
</script>
