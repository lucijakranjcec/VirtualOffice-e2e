import { test } from '@playwright/test';
import { LoginPage } from './pom/Login';

test('VerifyLoginPageElements', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto(process.env.BASE_URL!);
  await loginPage.verifyHomePageElements();   
});

test('LoginInvalidCredentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginWithInvalidCredentials();   
});

test('VerifyLoginEmployeer', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto(process.env.BASE_URL!);
  await loginPage.loginEmployeer();
});

test('VerifyLoginEmployee', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginEmployee();
});
