import { Feature } from './feature.ts';
import { hideSocialIcons, showSocialIcons } from './hide-social-icons.ts';
import { optimizeSearchResultsLayout, unoptimizeSearchResultsLayout } from './optimize-search-results-layout.ts';
import { hideSidebarAds, showSidebarAds } from './hide-sidebar-ads.ts';
import { hideFullscreenPopups, showFullscreenPopups } from './hide-fullscreen-popups.ts';
import { openResultsInNewTab, openResultsInSameTab } from './open-results-in-same-tab.ts';
import {
  openBundlePageForBundleProducts,
  openDetailsPageForBundleProducts
} from './open-details-page-for-bundle-products.ts';
import { optimizeNavigation, unoptimizeNavigation } from './optimize-navigation.ts';

export const features: Feature[] = [
  {
    key: 'optimize-search-results-layout',
    label: 'Optimize search results layout',
    activate: () => optimizeSearchResultsLayout(),
    disable: () => unoptimizeSearchResultsLayout()
  },
  {
    key: 'optimize-navigation',
    label: 'Optimize navigation',
    activate: () => optimizeNavigation(),
    disable: () => unoptimizeNavigation()
  },
  {
    key: 'hide-social-icons',
    label: 'Hide social icons',
    activate: () => hideSocialIcons(),
    disable: () => showSocialIcons()
  },

  {
    key: 'hide-sidebar-ads',
    label: 'Hide sidebar ads',
    activate: () => hideSidebarAds(),
    disable: () => showSidebarAds()
  },
  {
    key: 'hide-fullscreen-popups',
    label: 'Hide fullscreen popups',
    activate: () => hideFullscreenPopups(),
    disable: () => showFullscreenPopups()
  },
  {
    key: 'open-results-in-same-tab',
    label: 'Open results in same tab',
    activate: () => openResultsInSameTab(),
    disable: () => openResultsInNewTab()
  },
  {
    key: 'open-details-page-for-bundle-products',
    label: 'Open details page for bundle products',
    activate: () => openDetailsPageForBundleProducts(),
    disable: () => openBundlePageForBundleProducts()
  }
];
