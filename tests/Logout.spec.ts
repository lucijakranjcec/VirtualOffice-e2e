import { test } from '@playwright/test';
import { LoginPage } from './pom/Login';
import { SidebarPage } from './pom/Sidebar';

test('LogoutManager', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginManager();
    await sidebarPage.verifyLoggedInManager(); 
    await sidebarPage.logout();
});

test('LogoutEmployee', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginEmployee();
    await sidebarPage.verifyLoggedInEmployee(); 
    await sidebarPage.logout();
});
