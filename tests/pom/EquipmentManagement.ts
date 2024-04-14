import { expect, Locator, Page } from '@playwright/test';

export class EquipmentManagementPage {

  readonly page: Page;
  
  readonly newRequestButton: Locator;
  readonly summaryInput: Locator;
  readonly additionalInfoInput: Locator;
  readonly equipmentTypeSelect: Locator;
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
    this.equipmentTypeSelect = page.locator('//select[@id="inputRequestType"]');
    this.sendRequestButton = page.locator('//input[@type="submit"]');
    this.sendToApprovalButton = page.locator('//button[text()="Send to Approval"]');
    this.deleteRequestButton = page.locator('//button[text()="Delete"]');

    this.approveRequestButton = page.locator('//button[@onclick="approveEquipmentRequest()"]');
    this.declineRequestButton = page.locator('//button[@onclick="showEquipmentCommentSection()"]');
    this.reasonForRejectionInput = page.locator('//input[@id="inputEquipmentComment"]');
    this.submitDecliningRequestButton = page.locator('//button[@type="submit"]');

  }

  async employeeSendEquipmentRequest(summary: string, equipmentType: string) {
    await this.newRequestButton.click();
    await this.summaryInput.fill(summary);
    await this.additionalInfoInput.fill('Old laptop has become very slow.');
    await this.equipmentTypeSelect.selectOption({ value: equipmentType});
    await this.sendRequestButton.click();
  }

  async managerAcceptEquipmentRequest() {
    await expect(this.page.getByText('New laptop request.')).toBeVisible();
    await expect(this.page.getByText('Laptop Macbook')).toBeVisible();
    await expect(this.page.getByText('In progress')).toBeVisible();
    await expect(this.page.getByText('Marko Markic')).toBeVisible();
    await this.page.getByText('New laptop request.').click();

    await expect(this.summaryInput).toHaveValue('New laptop request.');
    await expect(this.additionalInfoInput).toHaveValue('Old laptop has become very slow.');

    await expect(this.approveRequestButton).toBeVisible();
    await expect(this.declineRequestButton).toBeVisible();

    await this.approveRequestButton.click();
  }

  async managerDeclineEquipmentRequest() {
    await expect(this.page.getByText('New computer request.')).toBeVisible();
    await expect(this.page.getByText('Laptop HP')).toBeVisible();
    await expect(this.page.getByText('In progress')).toBeVisible();
    await this.page.getByText('New computer request.').click();

    await expect(this.summaryInput).toHaveValue('New computer request.');
    await expect(this.additionalInfoInput).toHaveValue('Old laptop has become very slow.');

    await this.declineRequestButton.click();
    await this.reasonForRejectionInput.fill('No need for new equipment.');
    await this.submitDecliningRequestButton.click();
    await expect(this.page.getByText('Declined')).toBeVisible();
  }

  async employeeSeePendingEquipmentRequest(summary: string) {
    await expect(this.page.getByText(summary)).toBeVisible();
    await expect(this.page.getByText('Laptop Macbook')).toBeVisible();

    await expect(this.sendToApprovalButton).toBeVisible();
    await expect(this.deleteRequestButton).toBeVisible();
  }

  async employeeSendRequestToApproval() {
    await this.sendToApprovalButton.click();
    await expect(this.page.getByText('In progress')).toBeVisible();
  }

  async employeeDeleteRequest() {
    await expect(this.page.getByText('New laptop request.')).toBeVisible();
    await expect(this.page.getByText('Laptop Macbook')).toBeVisible();
    await this.deleteRequestButton.click();
    await expect(this.page.getByText('New laptop request.')).not.toBeVisible();
    await expect(this.page.getByText('Laptop Macbook')).not.toBeVisible();
  }

  async employeeSeeAcceptedEquipmentRequest() {
    await expect(this.page.locator('//table[@id="tableEquipmentContainer"]//td[text()="Laptop Macbook"]')).toBeVisible();
    
    await expect(this.page.locator('//table[@id="tableContainer"]//p[text()="New laptop request."]')).toBeVisible();
    await expect(this.page.locator('//table[@id="tableContainer"]//td[text()="Laptop Macbook"]')).toBeVisible();
    await expect(this.page.locator('//table[@id="tableContainer"]//td[text()="Approved"]')).toBeVisible();
}

  async employeeSeeDeclinedEquipmentRequest() {
    await expect(this.page.locator('//table[@id="tableEquipmentContainer"]//td[text()="Laptop HP"]')).not.toBeVisible();
    
    await expect(this.page.locator('//table[@id="tableContainer"]//p[text()="New computer request."]')).toBeVisible();
    await expect(this.page.locator('//table[@id="tableContainer"]//td[text()="Laptop HP"]')).toBeVisible();
    await expect(this.page.locator('//table[@id="tableContainer"]//td[text()="Declined"]')).toBeVisible();
  }

  async employeeSeeEquipment() {
    await expect(this.page.getByText('Mouse Logitech')).toBeVisible();
    await expect(this.page.getByText('Keyboard Logitech')).toBeVisible();
  }
}
