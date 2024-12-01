import pkg from '../package.json';

//Although Firefox supports V3 it still uses scripts / page for background
type ManifestV3AndFirefox = chrome.runtime.ManifestV3 & { background: { scripts: string[] } };

export const manifest: ManifestV3AndFirefox = {
  manifest_version: 3,
  version: pkg.version,
  description: pkg.description,
  name: 'Better AliExpress',
  icons: {
    32: 'img/logo/BetterAliExpressLogo_32x32.png',
    64: 'img/logo/BetterAliExpressLogo_64x64.png',
    128: 'img/logo/BetterAliExpressLogo_128x128.png',
    256: 'img/logo/BetterAliExpressLogo_256x256.png'
  },
  action: {
    default_popup: 'src/popup/index.html'
  },
  content_scripts: [
    {
      js: ['src/content/main.ts'],
      matches: ['https://*.aliexpress.com/*']
    }
  ],
  background: {
    service_worker: 'src/background/main.ts',
    type: 'module',
    scripts: ['src/background/main.ts']
  },
  host_permissions: ['https://*.aliexpress.com/*'],
  permissions: ['tabs', 'storage']
};
