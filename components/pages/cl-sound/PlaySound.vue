<template>
  <div class="play-container">
    <div class="buttons">
      <b-button
        size="is-medium"
        type="is-success"
        icon-left="contactless-payment"
        rounded
        @click="playSuccessTone"
      >
        Play Success Tone
      </b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'PlaySound',
  setup () {
    const audioContext = computed<AudioContext>(() => new AudioContext());
    const playSuccessTone = (): void => {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 1500;
      osc.connect(ctx.destination);
      osc.start();

      window.setTimeout(() => {
        osc.stop();
      }, 500);
    };

    return {
      audioContext,
      playSuccessTone,
    };
  },
});
</script>
