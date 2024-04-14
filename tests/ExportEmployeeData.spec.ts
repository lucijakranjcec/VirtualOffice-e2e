import { test } from '@playwright/test';
import { LoginPage } from './pom/Login';
import { SidebarPage } from './pom/Sidebar';
import { ExportEmployeeDataPage } from './pom/ExportEmployeeData';

test('ExportEmployeeData', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const exportEmployeeDataPage = new ExportEmployeeDataPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginManager();
    await sidebarPage.verifyLoggedInManager();  
    await sidebarPage.goToDataExport();
    await exportEmployeeDataPage.exportEmployeeData();
});
