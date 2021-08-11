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
      const oscillator = ctx.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.value = 1500;
      oscillator.connect(ctx.destination);
      oscillator.start();

      window.setTimeout(() => {
        oscillator.stop();
      }, 500);
    };

    return {
      audioContext,
      playSuccessTone,
    };
  },
});
</script>
