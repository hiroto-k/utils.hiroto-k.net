<template>
  <div class="play-container">
    <div class="buttons">
      <b-button
        size="is-medium"
        type="is-info"
        icon-left="contactless-payment"
        rounded
        @click="playSound"
      >
        Play Sound
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
    const playSound = (): void => {
      const oscillator = audioContext.value.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.value = 1500;
      oscillator.connect(audioContext.value.destination);
      oscillator.start(0);

      window.setTimeout(() => {
        oscillator.stop();
      }, 500);
    };

    return {
      audioContext,
      playSound,
    }
  },
});
</script>
