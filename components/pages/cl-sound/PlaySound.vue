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

      <b-button
        size="is-medium"
        type="is-danger"
        icon-left="contactless-payment"
        rounded
        @click="playAlertTone"
      >
        Play Alert Tone
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
      osc.stop(0.5);
    };

    const playAlert = (ctx: AudioContext, start: number, stop: number): void => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 750;
      osc.connect(ctx.destination);
      osc.start(start);
      osc.stop(stop);
    };
    const playEmpty = (ctx: AudioContext, start: number, stop: number): void => {
      const emptySource = ctx.createBufferSource();
      emptySource.start(start);
      emptySource.stop(stop);
    };
    const playAlertTone = (): void => {
      const ctx = new AudioContext();
      playAlert(ctx, 0, 0.2);
      playEmpty(ctx, 0.2, 0.4);
      playAlert(ctx, 0.4, 0.6);
    };

    return {
      audioContext,
      playSuccessTone,
      playAlertTone,
    };
  },
});
</script>
