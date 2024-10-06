//users can login with valid credentials and exclude users with invalid credentials

import { test, expect } from '@playwright/test';

test('Empty Login', async ({ page }) => {
  
  //navigate to login page
  await page.goto('https://www.saucedemo.com');

  //click login button
  await page.click('#login-button');

  //validate error message
  const errorMsg = await page.locator('.error-message-container').isVisible();

});

test('Fail Login', async ({ page }) => {

  //navigate to login page
  await page.goto('https://www.saucedemo.com');

  //input invalid credentials
  await page.locator('#user-name').fill('error_user');
  await page.locator('#password').fill('secret_sos');

  //click login button
  await page.click('#login-button');

  //validate error message
  const errorMsg = await page.locator('.error-message-container').isVisible();
  
});

test('Success Login', async ({ page }) => {

  //navigate to login page
  await page.goto('https://www.saucedemo.com');

  //input valid credentials
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');

  //click login button
  await page.click('#login-button');

  //validate redirection to plp
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});
