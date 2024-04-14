import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {

  readonly page: Page;	
  readonly inputUsername: Locator;
  readonly inputPassword: Locator;
  readonly loginButton: Locator;
  readonly mandatoryFieldMessage: Locator;
  readonly invalidCredentialsMessage: Locator;
  readonly helloMessage: Locator;

  readonly welcomeHeading: Locator;
  readonly teamManagementHeading: Locator;
  readonly employeesHeading: Locator;
  readonly evaluationHeading: Locator;
  readonly requestFormsHeading: Locator;
  readonly clockInHeading: Locator;
  readonly dataExportHeading: Locator;
  readonly homePageLoginButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.inputUsername = page.locator('//input[@id="Input_Email"]');
    this.inputPassword = page.locator('//input[@id="Input_Password"]');
    this.loginButton = page.locator('//button[@id="login-submit"]');   
    this.mandatoryFieldMessage = page.locator('//*[text()="The Email field is required."]');
    this.invalidCredentialsMessage = page.locator('//*[text()="Invalid login attempt."]');
    this.helloMessage = page.locator('//*[contains(text(), "Hello, lkranjcec!")]');

    this.welcomeHeading = page.getByRole('heading', { name: 'Welcome to your Virtual Office' });
    this.teamManagementHeading = page.getByRole('heading', { name: 'Team management made easy' });
    this.employeesHeading = page.getByRole('heading', { name: 'Add new Employees' });
    this.evaluationHeading = page.getByRole('heading', { name: 'Evaluation forms' });
    this.requestFormsHeading = page.getByRole('heading', { name: 'Request forms' });
    this.clockInHeading = page.getByRole('heading', { name: 'Clock in/Clock out' });
    this.dataExportHeading = page.getByRole('heading', { name: 'Data export' });
    this.homePageLoginButton = page.locator('//a[@href="/Identity/Account/Login"]');
  }

  async verifyHomePageElements() {
    await expect(this.welcomeHeading).toBeVisible();
    await expect(this.teamManagementHeading).toBeVisible();
    await expect(this.employeesHeading).toBeVisible();
    await expect(this.evaluationHeading).toBeVisible();
    await expect(this.requestFormsHeading).toBeVisible();
    await expect(this.clockInHeading).toBeVisible();
    await expect(this.dataExportHeading).toBeVisible();
    await expect(this.homePageLoginButton).toBeVisible();
  }

  async verifyLoginPageElements() {
    await this.homePageLoginButton.click();
    await expect(this.inputUsername).toBeVisible();
    await expect(this.inputPassword).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async loginWithInvalidCredentials() {
    await this.homePageLoginButton.click();
    await this.inputUsername.fill(process.env.MANAGER_USERNAME!);
    await this.inputPassword.fill("incorrect");
    await this.loginButton.click();

    await expect(this.invalidCredentialsMessage).toBeVisible();
  }
 
  async loginManager() {
    await this.homePageLoginButton.click();
    await this.inputUsername.fill(process.env.MANAGER_USERNAME!);
    await this.inputPassword.fill(process.env.MANAGER_PASSWORD!);
    await this.loginButton.click();
  }

  async loginEmployee() {
    await this.homePageLoginButton.click();
    await this.inputUsername.fill(process.env.EMPLOYEE_USERNAME!);
    await this.inputPassword.fill(process.env.EMPLOYEE_PASSWORD!);
    await this.loginButton.click();
  }
  
}
