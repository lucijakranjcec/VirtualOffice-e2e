import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {

  readonly page: Page;	
  readonly inputUsername: Locator;
  readonly inputPassword: Locator;
  readonly buttonLogin: Locator;
  readonly mandatoryFieldMessage: Locator;
  readonly invalidCredentialsMessage: Locator;
  readonly helloMessage: Locator;
  
  constructor(page: Page) {

    this.page = page;
    this.inputUsername = page.locator('//input[@id="Input_Email"]');
    this.inputPassword = page.locator('//input[@id="Input_Password"]');
    this.buttonLogin = page.locator('//input[@name="login-submit"]');   
    this.mandatoryFieldMessage = page.locator('//*[text()="The Email field is required."]');
    this.invalidCredentialsMessage = page.locator('//*[text()="Invalid login attempt."]');
    this.helloMessage = page.locator('//*[contains(text(), "Hello, lkranjcec!")]');

  }

  async verifyHomePageElements() {
    await expect(this.inputUsername).toBeVisible();
    await expect(this.inputPassword).toBeVisible();
    await expect(this.buttonLogin).toBeVisible();
  }

  async loginWithInvalidCredentials() {
    await this.inputUsername.fill(process.env.EMPLOYEER_USERNAME!);
    await this.inputPassword.fill("incorrect");
    await this.buttonLogin.click();

    await expect(this.invalidCredentialsMessage).toBeVisible();
  }
 
async loginEmployeer() {
  await this.inputUsername.fill(process.env.EMPLOYEER_USERNAME!);
  await this.inputPassword.fill(process.env.EMPLOYEER_PASSWORD!);
  await this.buttonLogin.click();
}

async loginEmployee() {
  await this.inputUsername.fill(process.env.EMPLOYEE_PASSWORD!);
  await this.inputPassword.fill(process.env.EMPLOYEE_PASSWORD!);
  await this.buttonLogin.click();
}
}
