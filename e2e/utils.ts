import { Page } from '@playwright/test';

export function getPopupUrl(extensionId: string) {
  return `chrome-extension://${extensionId}/src/popup/index.html`;
}

export async function closeInitialPopUps(page: Page) {
  await page.locator('.Sk1_X._1-SOk').click(); //close notifications popup
  await page.locator('.esm--upload-close--1x0SREz').click(); //close image search popup
  await page.locator('.global-gdpr-btn-wrap :nth-child(2)').click(); //close cookie banner
}
