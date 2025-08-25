import { test, expect } from '@playwright/test';

test.describe('Squads Feature', () => {
	// Helper function to login
	async function login(page) {
		await page.goto('/');
		await page.click('text=Login');
		await page.fill('input[type="email"]', 'test@example.com');
		await page.fill('input[type="password"]', 'password123');
		await page.click('button[type="submit"]');
		await expect(page).toHaveURL('/dashboard');
	}

	test('user can access squads hub after login', async ({ page }) => {
		await login(page);
		
		// Navigate to squads
		await page.goto('/dashboard/squads');
		
		// Should see squads hub
		await expect(page.locator('text=Squads Hub')).toBeVisible();
		await expect(page.locator('text=Collaborative Learning & Accountability')).toBeVisible();
	});

	test('user can create a new squad', async ({ page }) => {
		await login(page);
		await page.goto('/dashboard/squads');
		
		// Click create squad button
		await page.click('text=Create Squad');
		
		// Should open modal
		await expect(page.locator('text=Create New Squad')).toBeVisible();
		
		// Fill step 1
		await page.fill('input[placeholder*="Gold Trading Masters"]', 'Test Squad');
		await page.fill('textarea[placeholder*="Describe your squad"]', 'This is a test squad for automated testing purposes');
		
		// Proceed to next step
		await page.click('text=Next Step');
		
		// Step 2: Select category
		await page.click('text=Trading Strategies');
		await page.click('text=Open');
		
		// Proceed to next step
		await page.click('text=Next Step');
		
		// Step 3: Settings (defaults should be fine)
		await page.click('text=Next Step');
		
		// Step 4: Create squad
		await page.click('text=Create Squad');
		
		// Should see success message and switch to My Squads tab
		await expect(page.locator('text=Test Squad')).toBeVisible();
	});

	test('squad discovery and filtering works', async ({ page }) => {
		await login(page);
		await page.goto('/dashboard/squads');
		
		// Should see sample squads
		await expect(page.locator('text=Gold Trading Masters')).toBeVisible();
		
		// Test search functionality
		await page.fill('input[placeholder*="Search squads"]', 'Gold');
		await expect(page.locator('text=Gold Trading Masters')).toBeVisible();
		
		// Test category filter
		// Note: This would need the Select component to be properly implemented
	});
});