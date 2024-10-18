import { FeatureKey } from '../features/feature-key.ts';
import { FeatureConfig } from './feature-config.ts';
import browser from 'webextension-polyfill';

export class ConfigStore {
  // Make configState readonly, so it can't be reassigned outside the class
  private readonly configState: FeatureConfig[] = []; // Internal state, shared by all uses

  // Singleton pattern ensures only one instance
  private static instance: ConfigStore;

  private constructor() {
    // The constructor does not load from localStorage anymore
  }

  public static getInstance(): ConfigStore {
    if (!ConfigStore.instance) {
      ConfigStore.instance = new ConfigStore();
    }
    return ConfigStore.instance;
  }

  // Save a config entry
  async save(featureKey: FeatureKey, active: boolean): Promise<void> {
    // Use find() to check if the config already exists
    const existingConfig = this.configState.find((config) => config.featureKey === featureKey);

    if (existingConfig) {
      // Update the existing configuration
      existingConfig.active = active;
    } else {
      // Add a new configuration if not found
      this.configState.push({ featureKey, active });
    }

    // Update localStorage with the new state
    await browser.storage.local.set({ config: this.configState });
  }

  // Load the config array from localStorage
  async load(): Promise<FeatureConfig[]> {
    const storage = await browser.storage.local.get(['config']);
    const loadedConfig = storage.config as FeatureConfig[];
    if (loadedConfig) {
      try {
        // Parse the config and set it to the state
        // Since configState is readonly, we can't reassign it, so we modify it instead
        this.configState.length = 0; // Clear the array
        this.configState.push(...loadedConfig); // Add the new values
      } catch (error) {
        console.error('Error parsing config from localStorage:', error);
        this.configState.length = 0; // Fallback to empty state in case of error
      }
    }
    return this.configState; // Return the loaded state
  }

  // Get the current state of the config
  getState(): ReadonlyArray<FeatureConfig> {
    return this.configState; // Return a readonly view of the state
  }
}
