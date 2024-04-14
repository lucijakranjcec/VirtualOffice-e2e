import { test } from '@playwright/test';
import { LoginPage } from './pom/Login';
import { SidebarPage } from './pom/Sidebar';
import { EquipmentManagementPage } from './pom/EquipmentManagement';

test('EmployeeSeeEquipment', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const equipmentManagementPage = new EquipmentManagementPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginEmployee();
    await sidebarPage.verifyLoggedInEmployee();  
    await sidebarPage.goToEquipmentManagement();
    await equipmentManagementPage.employeeSeeEquipment();
});

test('EmployeeDeleteEquipmentRequest', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const equipmentManagementPage = new EquipmentManagementPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginEmployee();
    await sidebarPage.verifyLoggedInEmployee();  
    await sidebarPage.goToEquipmentManagement();
    await equipmentManagementPage.employeeSendEquipmentRequest('New laptop request.', '4');
    await equipmentManagementPage.employeeSeePendingEquipmentRequest('New laptop request.');
    await equipmentManagementPage.employeeDeleteRequest();
});

test('EmployeeSendEquipmentRequest', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const equipmentManagementPage = new EquipmentManagementPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginEmployee();
    await sidebarPage.verifyLoggedInEmployee();  
    await sidebarPage.goToEquipmentManagement();
    await equipmentManagementPage.employeeSendEquipmentRequest('New laptop request.', '4');
    await equipmentManagementPage.employeeSeePendingEquipmentRequest('New laptop request.');
    await equipmentManagementPage.employeeSendRequestToApproval();
});

test('ManagerAcceptEquipmentRequest', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const equipmentManagementPage = new EquipmentManagementPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginManager();
    await sidebarPage.verifyLoggedInManager();  
    await sidebarPage.goToEquipmentManagement();
    await equipmentManagementPage.managerAcceptEquipmentRequest();
});

test('EmployeeSeeAcceptedEquipmentRequest', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const equipmentManagementPage = new EquipmentManagementPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginEmployee();
    await sidebarPage.verifyLoggedInEmployee();  
    await sidebarPage.goToEquipmentManagement();
    await equipmentManagementPage.employeeSeeAcceptedEquipmentRequest();
});

test('EmployeeSendEquipmentRequest2', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const equipmentManagementPage = new EquipmentManagementPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginEmployee();
    await sidebarPage.verifyLoggedInEmployee();  
    await sidebarPage.goToEquipmentManagement();
    await equipmentManagementPage.employeeSendEquipmentRequest('New computer request.', '3');
    await equipmentManagementPage.employeeSendRequestToApproval();
});

test('ManagerDeclineEquipmentRequest', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const equipmentManagementPage = new EquipmentManagementPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginManager();
    await sidebarPage.verifyLoggedInManager();  
    await sidebarPage.goToEquipmentManagement();
    await equipmentManagementPage.managerDeclineEquipmentRequest();
});

test('EmployeeSeeDeclinedEquipmentRequest', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const equipmentManagementPage = new EquipmentManagementPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginEmployee();
    await sidebarPage.verifyLoggedInEmployee();  
    await sidebarPage.goToEquipmentManagement();
    await equipmentManagementPage.employeeSeeDeclinedEquipmentRequest();
});
