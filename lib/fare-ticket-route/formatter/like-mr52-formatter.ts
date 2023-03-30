import { Formatter, Route } from '~/types';

/**
 * MR52の経路入力画面ライクなフォーマッター
 */
export class LikeMR52Formatter implements Formatter {
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
    const output = exceptLastRoutes.map(route => `${route.line}\n     ${route.station}\n`).join('') + `${lastRoute.line}`;

    return '\n' + output.trim();
  }
}
