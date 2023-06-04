<template>
  <div class="my-5">
    <span class="block text-lg font-semibold text-slate-700">
      背景色
    </span>
    <input
      v-model="backGround"
      type="color"
      class="mt-1 px-3 py-2 bg-white shadow-sm border border-2 focus:outline-none block w-full rounded-md h-11"
    >
  </div>
</template>

<script lang="ts">
import { useQrCodeGeneratorStore } from '~/store/qrCodeGenerator';

export default defineComponent({
  name: 'BackGroundField',
  setup () {
    const store = useQrCodeGeneratorStore();
    const backGround = computed<string>({
      get: () => {
        return store.backGround;
      },
      set: (backGround) => {
        store.backGround = backGround;
      },
    });

    return {
      backGround,
    };
  },
});
</script>
