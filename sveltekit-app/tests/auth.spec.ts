import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('user can access landing page without authentication', async ({ page }) => {
    await page.goto('/');
    
    // Should see marketing content
    await expect(page.locator('h1')).toContainText('ELIMINATE EMOTIONAL TRADING');
    await expect(page.locator('text=Login')).toBeVisible();
    await expect(page.locator('text=Join Now')).toBeVisible();
  });

  test('user can open login modal', async ({ page }) => {
    await page.goto('/');
    
    // Click login button
    await page.click('text=Login');
    
    // Modal should appear
    await expect(page.locator('text=WARRIOR ACCESS')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('user can login and access dashboard', async ({ page }) => {
    await page.goto('/');
    
    // Open login modal
    await page.click('text=Login');
    
    // Fill login form
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('text=Welcome back, Warrior')).toBeVisible();
  });

  test('protected routes redirect to home when not authenticated', async ({ page }) => {
    await page.goto('/dashboard/journal');
    
    // Should redirect to home
    await expect(page).toHaveURL('/');
  });
});