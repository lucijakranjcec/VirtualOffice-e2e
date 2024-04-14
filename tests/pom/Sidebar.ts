import { expect, Locator, Page } from '@playwright/test';

export class SidebarPage {

  readonly page: Page;
  
  readonly evaluationFormLink: Locator;
  readonly outOfOfficeLink: Locator;
  readonly equipmentManagementLink: Locator;
  readonly clockInLink: Locator;
  readonly employeeManagementLink: Locator;
  readonly teamManagementLink: Locator;
  readonly dataExportLink: Locator;
  readonly helloMessage: Locator;

  readonly userProfileButton: Locator;
  readonly logoutButton: Locator;
  readonly userSettingsButton: Locator;
  readonly confirmLogoutButton: Locator;
  readonly loginPage: Locator;

  constructor(page: Page) {

    this.page = page;

    this.evaluationFormLink = page.getByRole('link', { name: 'Evaluation Form' });
    this.outOfOfficeLink = page.getByRole('link', { name: 'Out of Office Forms' });
    this.equipmentManagementLink = page.getByRole('link', { name: 'Equipment Management' });
    this.clockInLink = page.getByRole('link', { name: 'Clock In - Clock Out' });
    this.employeeManagementLink = page.getByRole('link', { name: 'Employee Management' });
    this.teamManagementLink = page.getByRole('link', { name: 'Team Management' });
    this.dataExportLink = page.getByRole('link', { name: 'Data Export' });
    this.helloMessage = page.locator('//*[contains(@class, "top-card")]');

    this.userProfileButton = page.locator('//*[contains(@class, "user-circle")]');
    this.logoutButton = page.getByText('Logout');
    this.userSettingsButton = page.locator('//*[@id="settings"]');
    this.confirmLogoutButton = page.locator('//button[@type="submit"]');
    this.loginPage = page.locator('//h1[text()="Log in"]');

  }

  async verifyLoggedInManager() {
    await expect(this.helloMessage).toContainText('Hello, lkranjcec!');
    await expect(this.evaluationFormLink).toBeVisible();
    await expect(this.outOfOfficeLink).toBeVisible();
    await expect(this.equipmentManagementLink).toBeVisible();
    await expect(this.clockInLink).toBeVisible();
    await expect(this.employeeManagementLink).toBeVisible();
    await expect(this.teamManagementLink).toBeVisible();
    await expect(this.dataExportLink).toBeVisible();
  }

  async verifyLoggedInEmployee() {
    await expect(this.helloMessage).toContainText('Hello, mmarkic!');
    await expect(this.evaluationFormLink).toBeVisible();
    await expect(this.outOfOfficeLink).toBeVisible();
    await expect(this.equipmentManagementLink).toBeVisible();
    await expect(this.clockInLink).toBeVisible();
    await expect(this.employeeManagementLink).not.toBeVisible();
    await expect(this.teamManagementLink).not.toBeVisible();
    await expect(this.dataExportLink).not.toBeVisible();
  }

  async goToEvaluationForms() {
    await this.evaluationFormLink.click();
  }

  async goToOutOfOfficeForms() {
    await this.outOfOfficeLink.click();
  }

  async goToEquipmentManagement() {
    await this.equipmentManagementLink.click();
  }

  async goToClockIn() {
   await this.clockInLink.click();
  }

  async goToEmployeeManagement() {
    await this.employeeManagementLink.click();
  }

  async goToTeamManagement() {
    await this.teamManagementLink.click();
  }

  async goToDataExport() {
    await this.dataExportLink.click();
  }

  async logout() {
    await this.userProfileButton.click();
    await this.logoutButton.click();

    await this.confirmLogoutButton.click();

    await expect(this.loginPage).toBeVisible();
  }
}
