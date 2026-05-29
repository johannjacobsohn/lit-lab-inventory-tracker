import { test, expect } from '@playwright/test';

const apiBaseUrl = process.env.BASE_URL || 'http://localhost:8080';

test.beforeAll(async ({ request }) => {
  await request.delete(`${apiBaseUrl}/api/devices`);
});

test.describe('LIT - Lab Inventory Tracker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('home page loads with welcome message and branding', async ({ page }) => {
    await expect(page.getByText(/Welcome to/)).toBeVisible();
    await expect(page.getByText(/LIT/).first()).toBeVisible();
    await expect(page.getByText(/Lab Inventory Tracker/).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create test data' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Delete all devices' })).toBeVisible();
  });

  test('navigation sidebar links are visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Home/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Devices/ })).toBeVisible();
  });

  test('navigates to devices page via sidebar', async ({ page }) => {
    await page.getByRole('link', { name: /Devices/ }).click();
    await expect(page.getByRole('heading', { name: 'Devices' })).toBeVisible();
    await expect(page).toHaveURL(/\/devices$/);
  });

  test('navigates back to home via branding logo', async ({ page }) => {
    await page.getByRole('link', { name: /Lab Inventory Tracker/ }).click();
    await expect(page).toHaveURL('/');
  });
});

test.describe('Device data management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('create test data shows success alert', async ({ page }) => {
    await page.getByRole('button', { name: 'Create test data' }).click();
    await expect(page.getByText('Test data created')).toBeVisible({ timeout: 10000 });
  });

  test('delete all devices shows success alert', async ({ page }) => {
    await page.getByRole('button', { name: 'Delete all devices' }).click();
    await expect(page.getByText('All devices deleted')).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Device list and views', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Create test data' }).click();
    await expect(page.getByText('Test data created')).toBeVisible({ timeout: 10000 });
  });

  test('devices page displays list of devices', async ({ page }) => {
    await page.getByRole('link', { name: /Devices/ }).click();
    await expect(page.getByText('Devices')).toBeVisible();
    await page.waitForTimeout(1000);
    const deviceItems = page.locator('.list-group-item');
    const count = await deviceItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('devices page shows loading state initially', async ({ page }) => {
    await page.getByRole('link', { name: /Devices/ }).click();
    await expect(page.getByText('Devices')).toBeVisible();
  });

  test('toggles to table view', async ({ page }) => {
    await page.getByRole('link', { name: /Devices/ }).click();
    await expect(page.getByText('Devices')).toBeVisible();
    await page.waitForTimeout(500);
    await page.getByLabel('View').selectOption('table');
    await expect(page.locator('table')).toBeVisible();
  });

  test('sorts devices by a column', async ({ page }) => {
    await page.getByRole('link', { name: /Devices/ }).click();
    await expect(page.getByText('Devices')).toBeVisible();
    await page.waitForTimeout(500);
    await page.getByLabel('Sort by').selectOption('type');
    const firstItem = page.locator('.list-group-item').first();
    await expect(firstItem).toBeVisible();
  });
});

test.describe('Device CRUD operations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Create test data' }).click();
    await expect(page.getByText('Test data created')).toBeVisible({ timeout: 10000 });
  });

  test('opens add device form and creates a new device', async ({ page }) => {
    await page.getByRole('link', { name: /Devices/ }).click();
    await expect(page.getByRole('heading', { name: 'Devices' })).toBeVisible();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: '+' }).click();
    await expect(page.getByText('Add new Device')).toBeVisible();
    await page.getByLabel('Location').fill('Test Lab');
    await page.getByLabel('Type').fill('Spectrometer');
    await page.getByLabel('Device Health').fill('good');
    await page.getByLabel('Last Used').fill('2025-01-15');
    await page.getByLabel('Price').fill('15000');
    await page.getByLabel('Color').fill('blue');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('link', { name: /Devices/ }).click();
    await expect(page.getByRole('heading', { name: 'Devices' })).toBeVisible();
    await expect(page.getByText('Spectrometer @ Test Lab')).toBeVisible({ timeout: 15000 });
  });

  test('opens device detail view by clicking on a device', async ({ page }) => {
    await page.getByRole('link', { name: /Devices/ }).click();
    await expect(page.getByText('Devices')).toBeVisible();
    const deviceLink = page.locator('.list-group-item').first();
    await deviceLink.waitFor({ state: 'visible', timeout: 15000 });
    await deviceLink.click();
    await expect(page.locator('table')).toBeVisible({ timeout: 10000 });
  });

  test('opens edit form from device detail view', async ({ page }) => {
    await page.getByRole('link', { name: /Devices/ }).click();
    await expect(page.getByText('Devices')).toBeVisible();
    const deviceLink = page.locator('.list-group-item').first();
    await deviceLink.waitFor({ state: 'visible', timeout: 15000 });
    await deviceLink.click();
    const editLink = page.locator('a[title="Edit this Device"]');
    await editLink.waitFor({ state: 'visible', timeout: 10000 });
    await editLink.click();
    await expect(page.getByText(/Edit device/)).toBeVisible({ timeout: 10000 });
  });

  test('deletes a device using the delete button', async ({ page }) => {
    await page.getByRole('link', { name: /Devices/ }).click();
    await expect(page.getByText('Devices')).toBeVisible();
    const deviceListItems = page.locator('.list-group-item');
    await deviceListItems.first().waitFor({ state: 'visible', timeout: 15000 });
    const firstCheckbox = page.locator('.form-check-input').nth(1);
    await firstCheckbox.check();
    await page.locator('button').filter({ hasText: 'Delete' }).click();
    await expect(page.getByRole('heading', { name: 'Devices' })).toBeVisible();
  });
});

