import { QrCodeErrorCorrectionLevel, QrCodeRenderAsOptionValue, Route, TicketType } from './index';

export interface FareTicketRouteStore {
  type: TicketType
  month: string
  day: string
  skipDate: boolean
  routes: Route[],
  routes1: Route[],
  routes2: Route[],
  departure: string
  via: string
  destination: string
}

export interface QrCodeGeneratorState {
  value: string;
  size: number;
  level: QrCodeErrorCorrectionLevel;
  renderAs: QrCodeRenderAsOptionValue;
  backGround: string;
  foreGround: string;
}
