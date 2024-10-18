import browser from 'webextension-polyfill';
import { ToggleFeatureMessage } from '../lib/messages/toggle-feature-message.ts';
import { MessageTypes } from '../lib/messages/message-types.ts';
import { features } from '../lib/features/features.ts';
import { ConfigStore } from '../lib/config/config-store.ts';

browser.runtime.onInstalled.addListener(() => {
  console.log('Better AliExpress extension installed');
});

browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'complete' || !tab.url || !tab.url.includes('aliexpress.com')) {
    return;
  }

  const configStore = ConfigStore.getInstance();
  await configStore.load();
  const configs = configStore.getState();

  for (const feature of features) {
    const featureActive = configs.find((config) => config.featureKey === feature.key)?.active;

    const message: ToggleFeatureMessage = {
      type: MessageTypes.ToggleFeature,
      featureKey: feature.key,
      active: featureActive ?? false
    };

    try {
      await browser.tabs.sendMessage(tabId, message);
    } catch (ex) {
      //TODO
    }
  }
});

console.log('Run background script');
