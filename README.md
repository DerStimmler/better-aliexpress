<div align="center" width="100%">
  <img src="./public/img/logo/BetterAliExpressLogoSquared.svg" alt="Better AliExpress Logo" height="128"/>
</div>

# Better AliExpress

![build](https://github.com/DerStimmler/better-aliexpress/actions/workflows/build.yml/badge.svg)
[![GitHub license](https://img.shields.io/github/license/DerStimmler/better-aliexpress)](https://github.com/DerStimmler/better-aliexpress/blob/main/LICENSE)

Extension to enhance your AliExpress experience

## Features

<details>
  <summary>Optimize search results layout</summary>

  - increases space between results
  - show results as cards
  - remove hover effect on results
  - always show available buttons for result
  - unify order of elements in result card
  - unify button colors
  - unify height of result cards

| Before                                                                                       | After                                                                                      |
|----------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| <img src="./docs/img/optimize-layout-before.png" alt="optimize layout before" height="256"/> | <img src="./docs/img/optimize-layout-after.png" alt="optimize layout after" height="256"/> |
</details>

<details>
  <summary>Optimize navigation</summary>

- adds dropdown to header for switching between Normal, Choice and Bundle pages
- removes redundant choice and bundle links from menu

| Before                                                                      | After                                                                                      |
|-----------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| <img src="./docs/img/choice-menu-links.png" alt="sidebar ads" height="96"/> | <img src="./docs/img/navigation-dropdown.png" alt="sidebar ads" height="96"/> |
</details>

<details>
  <summary>Hide social icons</summary>

- Hides the sidebar with social icon links.

  <img src="./docs/img/social-icons.png" alt="social icons sidebar" height="128"/>
</details>

<details>
  <summary>Hide sidebar ads</summary>

- Hides popup ads on the side of the screen

  <img src="./docs/img/sidebar-ads.png" alt="sidebar ads" height="96"/>
</details>

<details>
  <summary>Hide fullscreen popups</summary>

- Hides fullscreen popup ads

  <img src="./docs/img/popup-ads.png" alt="sidebar ads" height="164"/>
</details>

<details>
  <summary>Open results in same tab</summary>

- By default clicks on a search result is opened in a new tab. When activated the details page of the result is opened in the current tab.
</details>

<details>
  <summary>Open details page for bundle products</summary>

- By default clicks on a search result of a bundle product navigates to the bundle offers page. When activated it only does that when you click on the bundle button. Otherwise clicks will open the normal details page of the product.
</details>

## Installation

The extension is not available in the Chrome Web Store or Firefox Add-ons store, so you'll need to install it manually.

1. Download the ZIP file from [GitHub Releases](https://github.com/DerStimmler/better-aliexpress/releases).
2. Extract the ZIP file to a folder.

### Google Chrome

3. Open `chrome://extensions/` in Chrome (or go to *More tools* > *Extensions*).
4. Enable *Developer mode* at the top-right.
5. Click *Load unpacked* and select the folder where you extracted the ZIP.
6. The extension will appear in your extensions list and its icon will show in the toolbar.

### Firefox

3. Open `about:addons` in Firefox (or go to *Add-ons and themes*).
4. Click the gear icon and select *Install Add-on From File...*.
5. Choose the extracted folder and select the `manifest.json` file.
6. The extension will appear in your add-ons list and its icon will show in the toolbar.

## Development

### Tips

- For easier debugging open the popup of the extension directly in a new tab. Get the extension ID in the extension details overview. `chrome-extension://<extension-id>/src/popup/index.html`
- To view the extension storage open the popup in a new tab, open DevTools and execute `chrome.storage.local.get(console.log)` in console

### Commands

- Run dev server `pnpm dev`
- Fix linting `pnpm lint:write`
- Run e2e tests with ui `pnpm test:ui`
