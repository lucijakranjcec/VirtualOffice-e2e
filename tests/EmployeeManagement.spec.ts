import { test } from '@playwright/test';
import { LoginPage } from './pom/Login';
import { SidebarPage } from './pom/Sidebar';
import { EmployeeManagementPage } from './pom/EmployeeManagement';

test('CreateNewEmployee', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const employeeManagementPage = new EmployeeManagementPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginManager();
    await sidebarPage.verifyLoggedInManager();  
    await sidebarPage.goToEmployeeManagement();
    await employeeManagementPage.createNewEmployee();
    await sidebarPage.goToEmployeeManagement();
    await employeeManagementPage.verifyNewEmployee();
});

test('EditEmployee', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const employeeManagementPage = new EmployeeManagementPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginManager();
    await sidebarPage.verifyLoggedInManager();  
    await sidebarPage.goToEmployeeManagement();
    await employeeManagementPage.editEmployee();
    await sidebarPage.goToEmployeeManagement();
    await employeeManagementPage.verifyEditedEmployee();
});

test('DeleteEmployee', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const employeeManagementPage = new EmployeeManagementPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginManager();
    await sidebarPage.verifyLoggedInManager();  
    await sidebarPage.goToEmployeeManagement();
    await employeeManagementPage.deleteEmployee();
    await sidebarPage.goToEmployeeManagement();
    await employeeManagementPage.verifyDeletedEmployee();
});
