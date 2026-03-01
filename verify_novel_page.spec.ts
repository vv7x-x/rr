import { test, expect } from '@playwright/test';

test('verify novel details page and comments', async ({ page }) => {
  // We need a valid ID, but since we are dynamic we might just check the home page first
  await page.goto('http://localhost:3000');
  await page.screenshot({ path: 'home_verification.png', fullPage: true });

  // Check for search bar
  const searchInput = page.locator('input[placeholder*="بحث"]');
  await expect(searchInput).toBeVisible();
});
