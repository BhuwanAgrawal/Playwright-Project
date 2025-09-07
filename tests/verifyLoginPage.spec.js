const {test, expect} = require('@playwright/test');
const testData = JSON.parse(JSON.stringify(require('../testData/testdata.json')));
const {LoginPage} = require('../pages/loginPage.js');

test.describe('Verify Login Page', () => {
    let loginPage;
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await page.waitForLoadState('networkidle');
        await page.setViewportSize({width: 1920, height: 1080});
        await loginPage.loginToApplication(testData[0].username, testData[0].password);

    });
    test('Verify Login Page Title', async ({page}) => {
        await expect(page).toHaveTitle('OrangeHRM');
    });
    test('Verify Login Page URL', async ({page}) => {
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    }); 
    test('Verify Login Page Logo', async ({page}) => {
        const logo = page.locator("//img[@alt='company-branding']");
        await expect(logo).toBeVisible();
    });
    test('Verify Login Page Dashboard', async ({page}) => {
        const dashboard = page.locator("//h6[text()='Dashboard']");
        await expect(dashboard).toBeVisible();
    });
    test('Verify Login Page Profile', async ({page}) => {
        const profile = page.locator("//p[@class='oxd-userdropdown-name']");
        await expect(profile).toBeVisible();
    });
    test('Verify Login Page Admin', async ({page}) => {
        const admin = page.locator("//span[text()='Admin']");
        await expect(admin).toBeVisible();
    });
});