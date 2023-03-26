import { QrCodeErrorCorrectionLevel, QrCodeRenderAsOptionValue } from './index';

export interface QrCodeGeneratorState {
  value: string;
  size: number;
  level: QrCodeErrorCorrectionLevel;
  renderAs: QrCodeRenderAsOptionValue;
  backGround: string;
  foreGround: string;
}
