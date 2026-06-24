import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

import { setupVersionBadges } from './badge';
import { setupImageZoom } from './zoom';

import './style.css';
import './badge.css';
import './zoom.css';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    setupVersionBadges();
    router.onAfterRouteChange = setupImageZoom();
  }
} satisfies Theme;
