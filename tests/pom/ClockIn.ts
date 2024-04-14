import { expect, Locator, Page } from '@playwright/test';

export class ClockInPage {

  readonly page: Page;
  
  readonly clockInButton: Locator;
  readonly clockOutButton: Locator;
  readonly clockDisplay: Locator;
  readonly alreadyClockedInMessage: Locator;

  constructor(page: Page) {

    this.page = page;

    this.clockInButton = page.locator('//button[@id="clockInButton"]');
    this.clockOutButton = page.locator('//button[@id="clockOutButton"]');
    this.clockDisplay = page.locator('//div[@id="clockDisplay"]');
    this.alreadyClockedInMessage = page.getByText('Already clocked in for today!');
    
  }

  async employeeClockIn() {
    await this.page.waitForTimeout(1000);
    var clockInTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    await this.clockInButton.click();
    await expect(this.clockDisplay).toContainText("Clock In Time: " + clockInTime);
  }

  async alreadyClockedIn() {
    await this.page.waitForTimeout(1000);
    await this.clockInButton.click();
    await expect(this.alreadyClockedInMessage).toBeVisible();
  }

  async employeeClockOut() {
    await this.page.waitForTimeout(1000);
    var clockOutTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    await this.clockOutButton.click();
    await expect(this.clockDisplay).toContainText("Clock Out Time: " + clockOutTime);
    await expect(this.clockDisplay).toContainText("Time Worked: ");
  }

  async managerVerifyEmployeeClockIn() {
    await expect(this.page.getByText('Marko')).toBeVisible();
    await expect(this.page.getByText('Markic')).toBeVisible();
  }
}
