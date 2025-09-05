const {test,expect}=require('@playwright/test')

test.describe('Mouse hover', () => {
    test('Mouse hover', async function({page}){
        await page.goto("https://freelance-learn-automation.vercel.app/login")
        await page.getByPlaceholder("Enter Email").fill("admin@email.com")
        await page.getByPlaceholder("Enter Password").fill("admin@123")
        await page.locator("//button[text()='Sign in']").click()
        await page.locator("//h1[text()='Learn Automation Courses']").waitFor()
        await page.waitForTimeout(5000)
        await page.locator("//span[text()='Manage']").hover()
        await page.screenshot({path:'screenshot.png',fullPage:true})
        await page.waitForTimeout(3000)
        await page.locator("//a[text()='Manage Courses']").click()      
        await page.locator("//h1[text()='Manage Courses']").waitFor()
        await expect(page.locator("//h1[text()='Manage Courses']")).toBeVisible()
        await page.waitForTimeout(3000)
    })
})
