import { expect, Locator, Page } from '@playwright/test';

export class EmployeeManagementPage {

  readonly page: Page;
  readonly createNewEmployeeButton: Locator;
  readonly employeeFirstNameInput: Locator;
  readonly employeeLastNameInput: Locator;
  readonly employeeDateOfBirthInput: Locator;
  readonly employeeTeamSelect: Locator;
  readonly saveEmployeeButton: Locator;

  constructor(page: Page) {

    this.page = page;
    this.createNewEmployeeButton = page.getByText('NEW EMPLOYEE');
    this.employeeFirstNameInput = page.locator('//input[@id="FirstName"]');
    this.employeeLastNameInput = page.locator('//input[@id="LastName"]');
    this.employeeDateOfBirthInput = page.locator('//input[@id="DateOfBirth"]');
    this.employeeTeamSelect = page.locator('//select[@id="TeamId"]');
    this.saveEmployeeButton = page.locator('//button[@type="submit"]');
  }

  async createNewEmployee() {
    await this.createNewEmployeeButton.click();
    await this.employeeFirstNameInput.fill('Automation Employee Name');
    await this.employeeLastNameInput.fill('Automation Employee Surname');
    await this.employeeTeamSelect.selectOption({ value: '5' });

    await this.saveEmployeeButton.click();
  }

  async verifyNewEmployee() {
    await expect(this.page.getByText('Automation Employee Name')).toBeVisible();
    await expect(this.page.getByText('Automation Employee Surname')).toBeVisible();
  }

  async editEmployee() {
    await this.page.getByText('Edit').nth(2).click();
    await this.employeeFirstNameInput.fill('Automation Employee Edit Name');
    await this.employeeLastNameInput.fill('Automation Employee  Edit Surname');
    await this.saveEmployeeButton.click();
  }

  async verifyEditedEmployee() {
    await expect(this.page.getByText('Automation Employee Edit Name')).toBeVisible();
    await expect(this.page.getByText('Automation Employee Edit Surname')).toBeVisible();
  }

  async deleteEmployee() {
    await this.page.getByText('Delete').nth(2).click();
  }

  async verifyDeletedEmployee() {
    await expect(this.page.getByText('Automation Employee Edit Name')).not.toBeVisible();
    await expect(this.page.getByText('Automation Employee Edit Surname')).not.toBeVisible();
  }
}
