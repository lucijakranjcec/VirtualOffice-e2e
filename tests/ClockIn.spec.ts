import { test } from '@playwright/test';
import { LoginPage } from './pom/Login';
import { SidebarPage } from './pom/Sidebar';
import { ClockInPage } from './pom/ClockIn';

test('EmployeeClockIn', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const clockInPage = new ClockInPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginEmployee();
    await sidebarPage.verifyLoggedInEmployee();  
    await sidebarPage.goToClockIn();
    await clockInPage.employeeClockIn();
});

test('EmployeeTryToClockInAgain', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const clockInPage = new ClockInPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginEmployee();
    await sidebarPage.verifyLoggedInEmployee();  
    await sidebarPage.goToClockIn();
    await clockInPage.alreadyClockedIn();
});

test('EmployeeClockOut', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const clockInPage = new ClockInPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginEmployee();
    await sidebarPage.verifyLoggedInEmployee();  
    await sidebarPage.goToClockIn();
    await clockInPage.employeeClockOut();
});

test('ManagerVerifyEmployeeClockIn', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const clockInPage = new ClockInPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginManager();
    await sidebarPage.verifyLoggedInManager();  
    await sidebarPage.goToClockIn();
    await clockInPage.managerVerifyEmployeeClockIn();
});
