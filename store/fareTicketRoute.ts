import { defineStore } from 'pinia';
import {
  FareTicketRouteStore,
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
    routes: [createRoute()],
    routes1: [],
    routes2: [],
    departure: '',
    via: '',
    destination: '',
    notes: '',
  }),
  getters: {
    valuedRoutes () {
      return this.routes.filter((route) => route.line.trim() !== '');
    },
  },
  actions: {
    setType (type) {
      this.type = type;
    },
    resetType () {
      this.type = '片道乗車券';
    },
    setMonth (month) {
      this.month = month;
    },
    setDay (day) {
      this.day = day;
    },
    unUseDate () {
      this.skipDate = true;
      this.month = '省略';
      this.day = '省略';
    },
    useDate () {
      this.skipDate = false;
      this.month = '';
      this.day = '';
    },
    setDate (addDate) {
      const today = new Date();
      today.setDate(today.getDate() + addDate);
      this.month = (today.getMonth() + 1).toString();
      this.day = today.getDate().toString();
    },
    setUndefinedDate () {
      const undefinedDate = '     ';
      this.month = undefinedDate;
      this.day = undefinedDate;
    },
    createRoute () {
      return { line: '', station: '' };
    },
    addRoute (index) {
      if (index <= -1) {
        this.routes.push(this.createRoute());
      } else {
        this.routes.splice(index + 1, 0, this.createRoute());
      }
    },
    deleteRoute (index) {
      this.routes.splice(index, 1);
    },
    deleteEmptyRoutes () {
      const newRoutes = this.routes.filter(route => {
        return route.line.trim() !== '' || route.station.trim() !== '';
      });
      this.routes = newRoutes.length === 0 ? [this.createRoute()] : newRoutes;
    },
    deleteAllRoutes () {
      this.routes = [this.createRoute()];
    },
    reverseRoutes () {
      this.deleteEmptyRoutes();
      this.routes = this.routes.reverse().map((route, index, orig) => {
        route.station = orig[index + 1] == null ? '' : orig[index + 1].station;
        return route;
      });
    },
    reverseStationsAndRoutes () {
      this.reverseStations();
      this.reverseRoutes();
    },
    setDeparture (departure) {
      this.departure = departure;
    },
    setVia (via) {
      this.via = via;
    },
    setDestination (destination) {
      this.destination = destination;
    },
    reverseStations () {
      const newDeparture = this.destination;
      this.destination = this.departure;
      this.departure = newDeparture;
    },
    resetStations () {
      this.departure = '';
      this.via = '';
      this.destination = '';
    },
    resetNotes () {
      this.notes = '';
    },
  },
});
