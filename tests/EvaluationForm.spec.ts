import { test } from '@playwright/test';
import { LoginPage } from './pom/Login';
import { SidebarPage } from './pom/Sidebar';
import { EvaluationPage } from './pom/EvaluationForm';

test('ManagerEvaluateEmployee', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const evaluationForm = new EvaluationPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginManager();
    await sidebarPage.verifyLoggedInManager();  
    await sidebarPage.goToEvaluationForms();
    await evaluationForm.managerEvaluateEmployee();
});

test('EmployeeEvaluateManager', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const evaluationForm = new EvaluationPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginEmployee();
    await sidebarPage.verifyLoggedInEmployee();  
    await sidebarPage.goToEvaluationForms();
    await evaluationForm.employeeEvaluateManager();
});

test('ManagerVerifyEmployeesEvaluation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const evaluationForm = new EvaluationPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginManager();
    await sidebarPage.verifyLoggedInManager();  
    await sidebarPage.goToEvaluationForms();
    await evaluationForm.managerVerifyEmployeesEvaluation();
});
