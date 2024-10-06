import { test, expect } from '@playwright/test';

test('Add Single Item to Cart', async ({ page }) => {

  //navigation, login and validation
  await page.goto('https://www.saucedemo.com');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  //extra validation
  const visibleLogo = await page.locator('app_logo').isVisible();
  const visibleTitle = await page.locator('title').isVisible();

  //add one item to cart
  await page.click('#add-to-cart-sauce-labs-bolt-t-shirt');

  //verify cart
  const cartLink = await page.locator('.shopping_cart_badge');
  await expect(cartLink).toHaveText('1');

});

test('Add Multiple Items to Cart', async ({ page }) => {

  //navigation, login and validation
  await page.goto('https://www.saucedemo.com');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  //extra validation
  const visibleLogo = await page.locator('app_logo').isVisible();
  const visibleTitle = await page.locator('title').isVisible();

  //add three items to cart
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('#add-to-cart-sauce-labs-bike-light');
  await page.click('#add-to-cart-sauce-labs-bolt-t-shirt');

  //verify cart
  const cartLink = await page.locator('.shopping_cart_badge');
  await expect(cartLink).toHaveText('3');

});

test('Remove Items from Cart', async ({ page }) => {

  //navigation, login and validation
  await page.goto('https://www.saucedemo.com');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  //extra validation
  const visibleLogo = await page.locator('app_logo').isVisible();
  const visibleTitle = await page.locator('title').isVisible();

  //add two items to cart and remove them
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('#add-to-cart-sauce-labs-bike-light');
  await page.click('#remove-sauce-labs-backpack');
  await page.click('#remove-sauce-labs-bike-light');

  //verify cart
  const cartLink = await page.locator('.shopping_cart_badge');
  await expect(cartLink).toBeHidden();

});

test('Checkout', async ({ page }) => {

  //navigation, login and validation
  await page.goto('https://www.saucedemo.com');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  //extra validation
  const visibleLogo = await page.locator('app_logo').isVisible();
  const visibleTitle = await page.locator('title').isVisible();

  //add two items to cart
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('#add-to-cart-sauce-labs-bike-light');

  //verify cart
  const cartLink = await page.locator('.shopping_cart_badge');
  await expect(cartLink).toHaveText('2');

  //proceed to cart details
  await page.locator('.shopping_cart_badge').click();

  //proceed to checkout
  await page.click('#checkout');

  //fill personal details
  await page.locator('#first-name').fill('asdf');
  await page.locator('#last-name').fill('asdf');
  await page.locator('#postal-code').fill('15127');

  //proceed with order
  await page.click('#continue');

  //complete order
  await page.click('#finish');

  //verify thank you page
  const thankYouPageMsg = await page.locator('.checkout_comlete_container').isVisible();

});