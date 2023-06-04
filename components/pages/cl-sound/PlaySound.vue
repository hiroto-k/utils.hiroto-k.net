<template>
  <div class="play-container">
    <div class="my-3">
      <button
        class="bg-green-400 hover:bg-green-300 text-white rounded-full px-4 py-2 mb-3 mr-3"
        @click="playSuccessTone"
      >
        Play Success Tone
      </button>
      <button
        class="bg-red-400 hover:bg-red-300 text-white rounded-full px-4 py-2 mb-3 mr-3"
        @click="playAlertTone"
      >
        Play Alert Tone
      </button>
    </div>
  </div>
</template>

<script lang="ts">
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
