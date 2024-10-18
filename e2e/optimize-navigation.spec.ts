import { expect, test } from './fixtures';
import { closeInitialPopUps, getPopupUrl } from './utils';
import { NavigationOption } from '../src/lib/features/optimize-navigation';
import { getRootDomain } from '../src/lib/utils';

test.describe('When activating optimize-navigation feature, it', () => {
  test('should hide bundle link in menu', async ({ extensionId, context }) => {
    const extensionPage = await context.newPage();
    await extensionPage.goto(getPopupUrl(extensionId));
    const featureCheckbox = extensionPage.locator('input[name=optimize-navigation]');

    const aliexpressPage = await context.newPage();
    await aliexpressPage.goto('https://aliexpress.com');
    await closeInitialPopUps(aliexpressPage);
    const bundleLink = aliexpressPage.locator('a[data-spm="3fornn"]');

    featureCheckbox.uncheck();

    await expect(bundleLink).toBeVisible();

    featureCheckbox.check();

    await expect(bundleLink).not.toBeVisible();
  });

  test('should hide choice link in menu', async ({ extensionId, context }) => {
    const extensionPage = await context.newPage();
    await extensionPage.goto(getPopupUrl(extensionId));
    const featureCheckbox = extensionPage.locator('input[name=optimize-navigation]');

    const aliexpressPage = await context.newPage();
    await aliexpressPage.goto('https://aliexpress.com');
    await closeInitialPopUps(aliexpressPage);
    const bundleLink = aliexpressPage.locator('a[data-spm="choicetab"]');

    featureCheckbox.uncheck();

    await expect(bundleLink).toBeVisible();

    featureCheckbox.check();

    await expect(bundleLink).not.toBeVisible();
  });

  test('should add navigation dropdown in header', async ({ extensionId, context }) => {
    const extensionPage = await context.newPage();
    await extensionPage.goto(getPopupUrl(extensionId));
    const featureCheckbox = extensionPage.locator('input[name=optimize-navigation]');

    const aliexpressPage = await context.newPage();
    await aliexpressPage.goto('https://aliexpress.com');
    await closeInitialPopUps(aliexpressPage);
    const dropdown = aliexpressPage.locator('#bae-dropdown');

    featureCheckbox.uncheck();

    await expect(dropdown).not.toBeVisible();

    featureCheckbox.check();

    await expect(dropdown).toBeVisible();
  });

  test('should be able to navigate using the dropdown in header', async ({ extensionId, context }) => {
    const extensionPage = await context.newPage();
    await extensionPage.goto(getPopupUrl(extensionId));
    const featureCheckbox = extensionPage.locator('input[name=optimize-navigation]');

    const aliexpressPage = await context.newPage();
    await aliexpressPage.goto('https://aliexpress.com');
    await closeInitialPopUps(aliexpressPage);
    const dropdown = aliexpressPage.locator('#bae-dropdown');

    featureCheckbox.check();

    const getSelectedValue = async () => await dropdown.evaluate((select) => (select as HTMLSelectElement).value);

    await expect(dropdown).toBeVisible();
    let selectedValue = await getSelectedValue();
    expect(selectedValue).toBe(NavigationOption.Normal);

    await dropdown.selectOption(NavigationOption.Choice);
    await aliexpressPage.waitForURL('**/ssr/**');
    expect(aliexpressPage.url()).toContain('aliexpress.com/ssr');
    selectedValue = await getSelectedValue();
    expect(selectedValue).toBe(NavigationOption.Choice);

    await dropdown.selectOption(NavigationOption.Bundle);
    await aliexpressPage.waitForURL('**/gcp/**');
    expect(aliexpressPage.url()).toContain('aliexpress.com/gcp');
    selectedValue = await getSelectedValue();
    expect(selectedValue).toBe(NavigationOption.Bundle);

    await dropdown.selectOption(NavigationOption.Normal);
    await aliexpressPage.waitForURL(getRootDomain(aliexpressPage.url()));
    expect(aliexpressPage.url()).toBe(`${getRootDomain(aliexpressPage.url())}/`);
    selectedValue = await getSelectedValue();
    expect(selectedValue).toBe(NavigationOption.Normal);
  });
});
