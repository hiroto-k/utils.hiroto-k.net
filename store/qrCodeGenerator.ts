import { defineStore } from 'pinia';
import type { QrCodeGeneratorState } from '~/types';

export const useQrCodeGeneratorStore = defineStore<'QrCodeGenerator', QrCodeGeneratorState>('QrCodeGenerator', {
  state: () => ({
    value: '',
    size: 250,
    margin: 0,
    level: 'H',
    renderAs: 'canvas',
    backGround: '#ffffff',
    foreGround: '#000000',
  }),
  actions: {
  },
});
