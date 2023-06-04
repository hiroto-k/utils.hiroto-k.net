<template>
  <div class="my-5">
    <label for="size" class="block text-lg font-semibold text-slate-700">
      QRコードの色
    </label>
    <input
      v-model="foreGround"
      type="color"
      class="mt-1 px-3 py-2 bg-white shadow-sm border border-2 focus:outline-none block w-full rounded-md h-11"
    >
  </div>
</template>

<script lang="ts">
import { useQrCodeGeneratorStore } from '~/store/qrCodeGenerator';

export default defineComponent({
  name: 'ForeGroundField',
  setup () {
    const store = useQrCodeGeneratorStore();
    const foreGround = computed<string>({
      get: () => {
        return store.foreGround;
      },
      set: (foreGround) => {
        store.foreGround = foreGround;
      },
    });

    return {
      foreGround,
    };
  },
});
</script>
