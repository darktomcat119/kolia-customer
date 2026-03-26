import { test, expect } from '@playwright/test';

test('home loads and has primary CTA', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /authentic african cuisine/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /explore restaurants/i })).toBeVisible();
});

test('restaurants page loads', async ({ page }) => {
  await page.goto('/restaurants');
  await expect(page.getByText(/find restaurants/i)).toBeVisible();
});

test('protected route redirects guests to login', async ({ page }) => {
  await page.goto('/cart');
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible();
});

test('language switcher updates home hero copy', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('language-switcher').selectOption('fr');
  await expect(
    page.getByRole('heading', { name: /cuisine africaine authentique, sublimée/i }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /explorer les restaurants/i })).toBeVisible();
});

