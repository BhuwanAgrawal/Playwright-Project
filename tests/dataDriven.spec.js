const { test, expect } = require('@playwright/test');
const testData = JSON.parse(JSON.stringify(require('../testData/testData.json')))

test.describe('Data Driven Tests', () => {
    for (const data of testData) {
        test(`Test with data: ${data.id}`, async ({ page }) => {
            await page.goto('https://freelance-learn-automation.vercel.app/login');
            await page.locator("//input[@id='email1']").fill(data.username);
            await page.locator("//input[@id='password1']").fill(data.password);
            await page.waitForTimeout(2000);
            console.log(`Executed test with data id: ${data.id}`);
        });
    }
});
