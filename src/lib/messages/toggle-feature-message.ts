import { FeatureKey } from '../features/feature-key.ts';
import { MessageTypes } from './message-types.ts';

export type ToggleFeatureMessage = {
  type: MessageTypes;
  featureKey: FeatureKey;
  active: boolean;
};
