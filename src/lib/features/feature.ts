import { FeatureKey } from './feature-key.ts';

export type Feature = {
  key: FeatureKey;
  label: string;
  activate: () => void;
  disable: () => void;
};
