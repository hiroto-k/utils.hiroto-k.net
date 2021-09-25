import { Link, PageLinksState, RootState } from '~/types';
import { GetterTree } from 'vuex';

export const state = (): PageLinksState => ({
  topPageLink: {
    title: 'Top page',
    to: '/',
  },
  trainNumberPageLink: {
    title: '列車番号メモ',
    to: '/train-number',
  },
  trainNumber20180317PageLink: {
    title: '2018年3月17日 改正',
    to: '/train-number/2018-03-17',
  },
  trainNumber20190316PageLink: {
    title: '2019年3月16日 改正',
    to: '/train-number/2019-03-16',
  },
  trainNumber20200314PageLink: {
    title: '2020年3月14日 改正',
    to: '/train-number/2020-03-14',
  },
  trainNumber20210313PageLink: {
    title: '2021年3月13日 改正',
    to: '/train-number/2021-03-13',
  },
  trainNumberCalcPageLink: {
    title: '列車番号から列車種別を計算',
    to: '/train-number-calc',
  },
  qrCodeGeneratorPageLink: {
    title: 'QRコード生成',
    to: '/qr-code',
  },
  contactlessSoundPage: {
    title: 'EMVコンタクトレスのサウンドをWeb Audio APIで再生',
    to: '/cl-sound',
  },
});

export const getters: GetterTree<PageLinksState, RootState> = {
  allPageLinks (state: PageLinksState): Link[] {
    return [
      state.topPageLink,
      state.trainNumberPageLink,
      state.trainNumberCalcPageLink,
      state.qrCodeGeneratorPageLink,
      state.contactlessSoundPage,
    ];
  },
  pageLinks (state: PageLinksState): Link[] {
    return [
      state.trainNumberPageLink,
      state.trainNumberCalcPageLink,
      state.qrCodeGeneratorPageLink,
      state.contactlessSoundPage,
    ];
  },
  trainNumberContentPageLinks (state: PageLinksState): Link[] {
    return [
      state.trainNumber20180317PageLink,
      state.trainNumber20190316PageLink,
      state.trainNumber20200314PageLink,
      state.trainNumber20210313PageLink,
    ];
  },
};
