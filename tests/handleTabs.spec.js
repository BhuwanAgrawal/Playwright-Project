const { test, expect } = require('@playwright/test');

test.describe('Handle Tabs', () => {
    test('should open a new tab and verify its content', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://freelance-learn-automation.vercel.app/login')
        
        const [newpage] = await Promise.all([
            context.waitForEvent('page'),
            // Assuming the link opens in a new tab
             await page.locator("(//a[contains(@href,'facebook')])[1]").click()

        ])

        await newpage.waitForLoadState();
        await newpage.locator("(//input[@name='email'])[2]").fill("test@gmai.com")
        await newpage.locator("(//input[@name='pass'])[2]").fill("Test@1234")
        //await newpage.locator("(//button[@name='login'])[2]").click()

        await newpage.waitForTimeout(3000)

        await page.bringToFront()
        await page.locator("//input[@name='email1']").fill("test@gmail.com")
        await page.waitForTimeout(3000)
        await newpage.bringToFront()
        await newpage.waitForTimeout(3000)
        await newpage.close()
        await page.bringToFront()
        await page.waitForTimeout(3000)
        await context.close()
    });
}); 