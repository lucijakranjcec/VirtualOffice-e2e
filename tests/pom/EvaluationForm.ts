import { expect, Locator, Page } from '@playwright/test';

export class EvaluationPage {

  readonly page: Page;
  readonly startEmployeeEvaluationButton: Locator;
  readonly startManagerEvaluationButton: Locator;
  readonly evaluationTitleInput: Locator;
  readonly evaluationDescriptionInput: Locator;
  readonly evaluationRateInput: Locator;
  readonly evaluationTypeSelect: Locator;
  readonly submitEvaluationButton: Locator;

  constructor(page: Page) {

    this.page = page;
    this.startEmployeeEvaluationButton = page.locator(`//div[@onClick="showEvaluationForm('28', 'Marko Markic', '14')"]`);
    this.startManagerEvaluationButton = page.locator(`//div[@onClick="showEvaluationForm2('28', 'Marko Marko', '14', 'Lucija Kranjčec')"]`);
    this.evaluationTitleInput = page.locator('//input[@id="EvaluationForm_FormTitle"]');
    this.evaluationDescriptionInput = page.locator('//textarea[@id="EvaluationForm_FormDescription"]');
    this.evaluationRateInput = page.locator('//input[@id="ratingSlider"]');
    this.evaluationTypeSelect = page.locator('//select[@id="evaluationType"]');
    this.submitEvaluationButton = page.locator('//button[@type="submit"]');

  }

  async managerEvaluateEmployee() {
    await this.startEmployeeEvaluationButton.click();
    await this.evaluationTitleInput.fill('Employee evaluation');
    await this.evaluationDescriptionInput.fill('Empoyee evaluation description');
    await this.evaluationTypeSelect.selectOption({ value: '1'});
    await this.submitEvaluationButton.click();

    await expect(this.page.getByText('Employee evaluation')).toBeVisible();
    await expect(this.page.getByText('Empoyee evaluation description')).toBeVisible();
    await expect(this.page.locator('//td[text()="Performance Evaluation"]')).toBeVisible();
  }

  async employeeEvaluateManager() {
    await this.startManagerEvaluationButton.click();
    await this.evaluationTitleInput.fill('Manager evaluation');
    await this.evaluationDescriptionInput.fill('Manager evaluation description');
    await this.evaluationTypeSelect.selectOption({ value: '2'});
    await this.submitEvaluationButton.click();
  }

  async managerVerifyEmployeesEvaluation() {
    await expect(this.page.locator('//td[text()="Manager evaluation"]')).toBeVisible();
    await expect(this.page.locator('//td[text()="Manager evaluation description"]')).toBeVisible();
    await expect(this.page.locator('//td[text()="Behavioral Assessment"]')).toBeVisible();
  }

}
