import { test } from '@playwright/test';
import { LoginPage } from './pom/Login';
import { SidebarPage } from './pom/Sidebar';
import { OutOfOfficePage } from './pom/OutOfOffice';

test('EmployeeDeleteOutOfOfficeRequest', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const outOfOfficePage = new OutOfOfficePage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginEmployee();
    await sidebarPage.verifyLoggedInEmployee();  
    await sidebarPage.goToOutOfOfficeForms();
    await outOfOfficePage.employeeSendOutOfOfficeRequest('New vacation request.', '1');
    await outOfOfficePage.employeeSeePendingOutOfOfficeRequest('New vacation request.');
    await outOfOfficePage.employeeDeleteRequest();
});

test('EmployeeSendOutOfOfficeRequest', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const outOfOfficePage = new OutOfOfficePage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginEmployee();
    await sidebarPage.verifyLoggedInEmployee();  
    await sidebarPage.goToOutOfOfficeForms();
    await outOfOfficePage.employeeSendOutOfOfficeRequest('New vacation request.', '1');
    await outOfOfficePage.employeeSeePendingOutOfOfficeRequest('New vacation request.');
    await outOfOfficePage.employeeSendRequestToApproval();
});

test('ManagerAcceptOutOfOfficeRequest', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const outOfOfficePage = new OutOfOfficePage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginManager();
    await sidebarPage.verifyLoggedInManager();  
    await sidebarPage.goToOutOfOfficeForms();
    await outOfOfficePage.managerAcceptOutOfOfficeRequest();
});

test('EmployeeSeeAcceptedOutOfOfficeRequest', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const outOfOfficePage = new OutOfOfficePage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginEmployee();
    await sidebarPage.verifyLoggedInEmployee();  
    await sidebarPage.goToOutOfOfficeForms();
    await outOfOfficePage.employeeSeeAcceptedOutOfOfficeRequest();
});

test('EmployeeSendOutOfOfficeRequest2', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const outOfOfficePage = new OutOfOfficePage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginEmployee();
    await sidebarPage.verifyLoggedInEmployee();  
    await sidebarPage.goToOutOfOfficeForms();
    await outOfOfficePage.employeeSendOutOfOfficeRequest('Sickness', '2');
    await outOfOfficePage.employeeSendRequestToApproval();
});

test('ManagerDeclineOutOfOfficeRequest', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const outOfOfficePage = new OutOfOfficePage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginManager();
    await sidebarPage.verifyLoggedInManager();  
    await sidebarPage.goToOutOfOfficeForms();
    await outOfOfficePage.managerDeclineOutOfOfficeRequest();
});

test('EmployeeSeeDeclinedOutOfOfficeRequest', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const outOfOfficePage = new OutOfOfficePage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginEmployee();
    await sidebarPage.verifyLoggedInEmployee();  
    await sidebarPage.goToOutOfOfficeForms();
    await outOfOfficePage.employeeSeeDeclinedOutOfOfficeRequest();
});
