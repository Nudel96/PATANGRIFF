import { test, expect } from '@playwright/test';

test.describe('Trading Journal', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/');
    await page.click('text=Login');
    await page.fill('input[type="email"]', 'warrior@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.goto('/dashboard/journal');
  });

  test('can view trading journal page', async ({ page }) => {
    await expect(page.locator('text=Trading Journal')).toBeVisible();
    await expect(page.locator('text=R-Multiple Performance Tracking')).toBeVisible();
    await expect(page.locator('text=Total R')).toBeVisible();
  });

  test('can open new trade form', async ({ page }) => {
    await page.click('text=New Trade');
    
    await expect(page.locator('text=New Trade Entry')).toBeVisible();
    await expect(page.locator('input[placeholder*="EURUSD"]')).toBeVisible();
    await expect(page.locator('text=Direction')).toBeVisible();
  });

  test('can create a new trade', async ({ page }) => {
    await page.click('text=New Trade');
    
    // Fill trade form
    await page.fill('input[placeholder*="EURUSD"]', 'GBPUSD');
    await page.fill('input[placeholder*="0.00000"]:nth-of-type(1)', '1.2500');
    await page.fill('input[placeholder*="0.00000"]:nth-of-type(2)', '1.2450');
    await page.fill('input[placeholder*="0.00000"]:nth-of-type(3)', '1.2600');
    
    // Submit form
    await page.click('text=Create Trade');
    
    // Should see new trade in list
    await expect(page.locator('text=GBPUSD')).toBeVisible();
    await expect(page.locator('text=pending')).toBeVisible();
  });

  test('displays trading statistics correctly', async ({ page }) => {
    // Should show stats cards
    await expect(page.locator('text=Total R')).toBeVisible();
    await expect(page.locator('text=Win Rate')).toBeVisible();
    await expect(page.locator('text=Expectancy')).toBeVisible();
    await expect(page.locator('text=Avg Discipline')).toBeVisible();
  });
});