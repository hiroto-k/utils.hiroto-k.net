import { Formatter, Route } from '~/types';

/**
 * デフォルトの横向き出力フォーマッター
 */
export class DefaultFormatter implements Formatter {
  private routes: Route[];

  constructor (routes: Route[]) {
    this.routes = routes;
  }

  format (): string {
    return this.routes.length === 0 ? '' : this.createRoutesOutput();
  }

  createRoutesOutput (): string {
    const exceptLastRoutes = this.routes.slice(0, this.routes.length - 1);
    const lastRoute = this.routes.slice(-1)[0];
    const output = exceptLastRoutes.map(route => `${route.line} (${route.station})`).join(' ') + ` ${lastRoute.line}`;

    return output.trim();
  }
}
