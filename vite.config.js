import webExtension from '@samrum/vite-plugin-web-extension';
import { defineConfig } from 'vite';
import { manifest } from './src/manifest';

export default defineConfig({
  plugins: [
    webExtension({
      manifest: manifest,
      useDynamicUrlWebAccessibleResources: false
    })
  ]
});
