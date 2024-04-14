import { expect, Locator, Page } from '@playwright/test';

export class OutOfOfficePage {

  readonly page: Page;
  
  readonly newRequestButton: Locator;
  readonly summaryInput: Locator;
  readonly additionalInfoInput: Locator;
  readonly dayOffTypeSelect: Locator;
  readonly outOfOfficeDays: Locator;
  readonly sendRequestButton: Locator;
  readonly sendToApprovalButton: Locator;
  readonly deleteRequestButton: Locator;

  readonly approveRequestButton: Locator;
  readonly declineRequestButton: Locator;
  readonly reasonForRejectionInput: Locator;
  readonly submitDecliningRequestButton: Locator;

  constructor(page: Page) {

    this.page = page;

    this.newRequestButton = page.getByText('NEW REQUEST');
    this.summaryInput = page.locator('//input[@id="inputSummary"]');
    this.additionalInfoInput = page.locator('//input[@id="inputAdditionalInfo"]');
    this.dayOffTypeSelect = page.locator('//select[@id="inputRequestType"]');
    this.outOfOfficeDays = page.locator('//input[@id="inputQuantity"]');
    this.sendRequestButton = page.locator('//input[@type="submit"]');
    this.sendToApprovalButton = page.locator('//button[text()="Send to Approval"]');
    this.deleteRequestButton = page.locator('//button[text()="Delete"]');

    this.approveRequestButton = page.locator('//button[@onclick="approveRequest()"]');
    this.declineRequestButton = page.locator('//button[@onclick="showCommentSection()"]');
    this.reasonForRejectionInput = page.locator('//input[@id="inputComment"]');
    this.submitDecliningRequestButton = page.locator('//button[@type="submit"]');

  }

  async employeeSendOutOfOfficeRequest(summary: string, dayOffType: string) {
    await this.newRequestButton.click();
    await this.summaryInput.fill(summary);
    await this.additionalInfoInput.fill('Need free days for vacation');
    await this.dayOffTypeSelect.selectOption({ value: dayOffType});
    await this.outOfOfficeDays.fill('5');
    await this.sendRequestButton.click();
  }

  async managerAcceptOutOfOfficeRequest() {
    await expect(this.page.getByText('New vacation request.')).toBeVisible();
    await expect(this.page.getByText('Day Off')).toBeVisible();
    await expect(this.page.getByText('In progress')).toBeVisible();
    await expect(this.page.getByText('Marko Markic')).toBeVisible();
    await this.page.getByText('New vacation request.').click();

    await expect(this.summaryInput).toHaveValue('New vacation request.');
    await expect(this.additionalInfoInput).toHaveValue('Need free days for vacation');

    await expect(this.approveRequestButton).toBeVisible();
    await expect(this.declineRequestButton).toBeVisible();

    await this.approveRequestButton.click();
  }

  async managerDeclineOutOfOfficeRequest() {
    await expect(this.page.getByText('Sickness')).toBeVisible();
    await expect(this.page.getByText('Sick Leave')).toBeVisible();
    await expect(this.page.getByText('In progress')).toBeVisible();
    await this.page.getByText('Sickness').click();

    await expect(this.summaryInput).toHaveValue('Sickness');
    await expect(this.additionalInfoInput).toHaveValue('Need free days for vacation');

    await this.declineRequestButton.click();
    await this.reasonForRejectionInput.fill('No need for a sick leave.');
    await this.submitDecliningRequestButton.click();
    await expect(this.page.getByText('Approved').first()).toBeVisible();
  }

  async employeeSeePendingOutOfOfficeRequest(summary: string) {
    await expect(this.page.getByText(summary)).toBeVisible();
    await expect(this.page.getByText('Day Off')).toBeVisible();

    await expect(this.sendToApprovalButton).toBeVisible();
    await expect(this.deleteRequestButton).toBeVisible();
  }

  async employeeSendRequestToApproval() {
    await this.sendToApprovalButton.click();
    await expect(this.page.getByText('In progress')).toBeVisible();
  }

  async employeeDeleteRequest() {
    await expect(this.page.getByText('New vacation request.')).toBeVisible();
    await expect(this.page.getByText('Day Off')).toBeVisible();
    await this.deleteRequestButton.click();
    await expect(this.page.getByText('New vacation request.')).not.toBeVisible();
    await expect(this.page.getByText('Day Off')).not.toBeVisible();
  }

  async employeeSeeAcceptedOutOfOfficeRequest() {
    await expect(this.page.locator('//table[@id="tableContainer"]//p[text()="New vacation request."]')).toBeVisible();
    await expect(this.page.locator('//table[@id="tableContainer"]//td[text()="Day Off"]')).toBeVisible();
    await expect(this.page.locator('//table[@id="tableContainer"]//td[text()="Approved"]')).toBeVisible();
}

  async employeeSeeDeclinedOutOfOfficeRequest() {
    await expect(this.page.locator('//table[@id="tableContainer"]//p[text()="Sickness"]')).toBeVisible();
    await expect(this.page.locator('//table[@id="tableContainer"]//td[text()="Sick Leave"]')).toBeVisible();
    await expect(this.page.locator('//table[@id="tableContainer"]//td[text()="Approved"]').first()).toBeVisible();
  }
}
