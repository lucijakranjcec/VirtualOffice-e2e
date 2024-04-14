import { expect, Locator, Page } from '@playwright/test';

export class ExportEmployeeDataPage {

  readonly page: Page;
  readonly exportDataButton: Locator;

  constructor(page: Page) {

    this.page = page;
    this.exportDataButton = page.locator('//button[@id="exportButton"]');
    
  }

  async exportEmployeeData() {
    const [ download ] = await Promise.all([
        this.page.waitForEvent('download'),
        this.exportDataButton.click(),
      ]);
      
      // assert filename
      expect(download.suggestedFilename()).toBe("Employees.xlsx");
  }
}
