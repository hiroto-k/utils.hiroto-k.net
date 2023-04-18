import { QrCodeErrorCorrectionLevel, QrCodeRenderAsOptionValue, Route, TicketType } from './index';
import { _GettersTree } from 'pinia';

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
  notes: string
}

export interface FareTicketRouteStoreGetters extends _GettersTree<FareTicketRouteStore> {
  valuedRoutes(): Route[]
}

export interface FareTicketRouteStoreActions {
  resetType(): void
  unUseDate(): void
  useDate(): void
  setDate(addDate: number): void
  setUndefinedDate(): void
  createRoute(): Route
  addRoute(index: number): void
  deleteRoute(index: number): void
  deleteEmptyRoutes(): void
  deleteAllRoutes(): void
  reverseRoutes(): void
  reverseStationsAndRoutes(): void
  reverseStations(): void
  resetStations(): void
  resetNotes(): void
}

export interface QrCodeGeneratorState {
  value: string;
  size: number;
  level: QrCodeErrorCorrectionLevel;
  renderAs: QrCodeRenderAsOptionValue;
  backGround: string;
  foreGround: string;
}
