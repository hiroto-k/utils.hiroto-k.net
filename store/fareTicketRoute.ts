import { defineStore } from 'pinia';
import { FareTicketRouteStore, TicketType, FareTicketRouteStoreActions, FareTicketRouteStoreGetters } from '../types';

export const useFareTicketRoute = defineStore<'FareTicketRoute', FareTicketRouteStore, FareTicketRouteStoreGetters, FareTicketRouteStoreActions>('FareTicketRoute', {
  state: () => ({
    type: '片道乗車券',
    month: '',
    day: '',
    skipDate: false,
    routes: [],
    routes1: [],
    routes2: [],
    departure: '',
    via: '',
    destination: '',
  }),
  actions: {
    setType (type: TicketType): void {
      this.type = type;
    },
    resetType (): void {
      this.type = '片道乗車券';
    },
    setMonth (month: string): void {
      this.month = month;
    },
    setDay (day: string): void {
      this.day = day;
    },
    unUseDate (): void {
      this.skipDate = true;
      this.month = '省略';
      this.day = '省略';
    },
    useDate (): void {
      this.skipDate = false;
      this.month = '';
      this.day = '';
    },
    setDate (addDate: number) {
      const today = new Date();
      today.setDate(today.getDate() + addDate);
      this.month = (today.getMonth() + 1).toString();
      this.day = today.getDate().toString();
    },
    setUndefinedDate (): void {
      const undefinedDate = '     ';
      this.month = undefinedDate;
      this.day = undefinedDate;
    },
    setDeparture (departure: string): void {
      this.departure = departure;
    },
    setVia (via: string): void {
      this.via = via;
    },
    setDestination (destination: string): void {
      this.destination = destination;
    },
    resetStations (): void {
      this.departure = '';
      this.via = '';
      this.destination = '';
    },
  },
});
