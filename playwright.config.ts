import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import 'dotenv/config';

dotenv.config();
require('dotenv').config();

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 10000
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 3,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'localhost:5001',
    headless: false,
    trace: 'on',
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1980, height: 1020 }
    },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }, 
  ],

  outputDir: 'test-results/',
});
