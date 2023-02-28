export interface Route {
  line: string;
  station: string;
}

export interface Formatter {
  format(): string
}
