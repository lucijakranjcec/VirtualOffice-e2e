import { test } from '@playwright/test';
import { LoginPage } from './pom/Login';
import { SidebarPage } from './pom/Sidebar';

test('VerifyHomePageElements', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto(process.env.BASE_URL!);
  await loginPage.verifyHomePageElements();   
});

test('VerifyLoginPageElements', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto(process.env.BASE_URL!);
  await loginPage.verifyLoginPageElements();   
});

test('LoginInvalidCredentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginWithInvalidCredentials();   
});

test('VerifyLoginManager', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const sidebarPage = new SidebarPage(page);
  await page.goto(process.env.BASE_URL!);
  await loginPage.loginManager();
  await sidebarPage.verifyLoggedInManager();
});

test('VerifyLoginEmployee', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    await page.goto(process.env.BASE_URL_MANAGER!);
    await sidebarPage.logout();
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginEmployee();
    await sidebarPage.verifyLoggedInEmployee();
});
