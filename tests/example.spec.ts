import { test, expect } from '@playwright/test';

test('test go to management boxes', async ({ page, baseURL }) => {
  // baseURL is taken directly from your web server,
  // e.g. http://localhost:4200
  await page.goto(baseURL + '/management/boxes');
  // Alternatively, just use relative path, because baseURL is already
  // set for the default context and page.
  // For example, this will result in http://localhost:4200/foo
  await page.goto('/management/boxes');
});
