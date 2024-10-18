import { expect, test } from './fixtures';
import { getPopupUrl } from './utils';

test.describe('When opening the popup, it', () => {
  test('should display the extension title', async ({ page, extensionId }) => {
    await page.goto(getPopupUrl(extensionId));
    await expect(page.locator('body header h1')).toContainText('Better AliExpress');
  });

  test('should display the extension logo', async ({ page, extensionId }) => {
    await page.goto(getPopupUrl(extensionId));
    await expect(page.locator('body header img')).toBeVisible();
  });
});

test.describe('When opening the popup and switching to light/dark mode, it', () => {
  test('should adapt color scheme', async ({ page, extensionId }) => {
    await page.goto(getPopupUrl(extensionId));

    const lightColor = 'rgb(255, 255, 255)';
    const darkColor = 'rgb(25, 25, 25)';

    await expect(page.locator('body')).toHaveCSS('background-color', lightColor);
    await expect(page.locator('h1')).toHaveCSS('color', darkColor);

    page.emulateMedia({ colorScheme: 'dark' });

    await expect(page.locator('body')).toHaveCSS('background-color', darkColor);
    await expect(page.locator('h1')).toHaveCSS('color', lightColor);
  });
});

test('When clicking on the GitHub logo inside the popup, it opens the extensions GitHub repository', async ({
  page,
  extensionId
}) => {
  await page.goto(getPopupUrl(extensionId));

  await page.locator('footer a').click();

  const [newPage] = await Promise.all([
    page.waitForEvent('popup'), // Wait for the new page to open
    page.locator('footer a').click()
  ]);

  const newPageURL = newPage.url();
  expect(newPageURL).toBe('https://github.com/DerStimmler/better-aliexpress');
});
