export type TicketType = '片道乗車券' | '往復乗車券' | '連続乗車券' | '往復乗車券(別線)';

export interface Route {
  line: string;
  station: string;
}

export interface Formatter {
  format(): string
}
