import browser from 'webextension-polyfill';
import { ToggleFeatureMessage } from '../lib/messages/toggle-feature-message.ts';
import { MessageTypes } from '../lib/messages/message-types.ts';
import { features } from '../lib/features/features.ts';
import { ConfigStore } from '../lib/config/config-store.ts';

browser.runtime.onMessage.addListener((message: any, _) => {
  console.log('received message', message);
  if (message.type !== MessageTypes.ToggleFeature) return undefined;

  const toggleFeatureMessage = message as ToggleFeatureMessage;

  const feature = features.find((feature) => feature.key === toggleFeatureMessage.featureKey);

  if (!feature) return undefined;

  toggleFeatureMessage.active ? feature.activate() : feature.disable();

  return undefined;
});

const configStore = ConfigStore.getInstance();
await configStore.load();
const configs = configStore.getState();

for (const feature of features) {
  const featureActive = configs.find((config) => config.featureKey === feature.key)?.active;

  featureActive ? feature.activate() : feature.disable();
}

console.log('content script injected');
