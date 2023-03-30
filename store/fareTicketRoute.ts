import { defineStore } from 'pinia';
import {
  FareTicketRouteStore,
  TicketType,
  FareTicketRouteStoreActions,
  FareTicketRouteStoreGetters,
  Route,
} from '../types';

const createRoute = (): Route => {
  return { line: '', station: '' };
};

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
    notes: '',
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
    addRoute (index: number): void {
      if (index <= -1) {
        this.routes.push(createRoute());
      } else {
        this.routes.splice(index + 1, 0, createRoute());
      }
    },
    deleteRoute (index: number): void {
      this.routes.splice(index, 1);
    },
    deleteRmptyRoutes (): void {
      const newRoutes = this.routes.filter(route => {
        return route.line.trim() !== '' || route.station.trim() !== '';
      });
      this.routes = newRoutes.length === 0 ? [createRoute()] : newRoutes;
    },
    deleteAllRoutes(): void {
      this.routes = [createRoute()]
    },
    reverseRoutes (): void {
      this.routes = this.routes.reverse().map((route, index, orig) => {
        route.station = orig[index + 1] == null ? '' : orig[index + 1].station;
        return route;
      });
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
    reverseStations (): void {
      const newDeparture = this.destination;
      this.destination = this.departure;
      this.departure = newDeparture;
    },
    resetStations (): void {
      this.departure = '';
      this.via = '';
      this.destination = '';
    },
    resetNotes (): void {
      this.notes = '';
    },
  },
});
