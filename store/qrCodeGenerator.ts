import { defineStore } from 'pinia';
import { QrCodeGeneratorState } from '../types';

export const useQrCodeGeneratorStore = defineStore<'QrCodeGenerator', QrCodeGeneratorState>('QrCodeGenerator', {
  state: () => ({
    value: '',
    size: 250,
    level: 'H',
    renderAs: 'canvas',
    backGround: '#ffffff',
    foreGround: '#000000',
  }),
  actions: {
  },
});
