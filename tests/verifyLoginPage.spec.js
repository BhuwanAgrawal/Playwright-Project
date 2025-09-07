const { test, expect } = require('@playwright/test');
const testData = JSON.parse(JSON.stringify(require('../testData/testdata.json')));
const { LoginPage } = require('../pages/loginPage.js');
const { DashboardPage } = require('../pages/dashboardPage.js');

test.describe('Verify Login Page', () => {
    let browserContext, page, loginPage;

    test.beforeAll(async ({ browser }) => {
        browserContext = await browser.newContext({ viewport: { width: 1620, height: 1080 } });
        page = await browserContext.newPage();
        loginPage = new LoginPage(page);
        await page.goto(testData.loginPage.url);
        await page.waitForLoadState('networkidle');
    });

    test.afterAll(async () => {
        await page.waitForLoadState('networkidle');
        await browserContext.close();
    });

    test('should display all login page elements', async () => {
        await expect(loginPage.username).toBeVisible();
        await expect(loginPage.password).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
        await expect(loginPage.forgotPasswordLink).toBeVisible();
    });

    test('should login successfully with valid credentials', async () => {
        await loginPage.loginToApplication(testData.loginPage.validUser.username, testData.loginPage.validUser.password);
        await expect(page).toHaveURL(testData.dashboardPage.expectedUrl);
    });

    test('should show error for invalid credentials', async () => {
        await loginPage.loginToApplication(testData.loginPage.invalidUser.username, testData.loginPage.invalidUser.password);
        await expect(loginPage.invalidCredentialsError).toBeVisible();
        await expect(loginPage.invalidCredentialsError).toHaveText("Invalid credentials");
    });

    test('should show error for empty username and password', async () => {
        await loginPage.loginToApplication('', '');
        await expect(loginPage.emptyUsernameError).toBeVisible();
        await expect(loginPage.emptyUsernameError).toHaveText("Required");
        await expect(loginPage.emptyPasswordError).toBeVisible();
        await expect(loginPage.emptyPasswordError).toHaveText("Required");
    });

    test('should show error for empty username', async () => {
        await loginPage.loginToApplication('', testData.loginPage.validUser.password);
        await expect(loginPage.emptyUsernameError).toBeVisible();
        await expect(loginPage.emptyUsernameError).toHaveText("Required");
        await expect(loginPage.emptyPasswordError).not.toBeVisible();
    });

    test('should show error for empty password', async () => {
        await loginPage.loginToApplication(testData.loginPage.validUser.username, '');
        const passwordErrorLocator = await loginPage.getEmptyPasswordErrorLocator();
        await expect(passwordErrorLocator).toBeVisible();
        await expect(passwordErrorLocator).toHaveText("Required");
        const errors = page.locator("//span[text()='Required']");
        await expect(await errors.count()).toBe(1);
    });

    test('should show error for whitespace username and password', async () => {
        await loginPage.loginToApplication('   ', '   ');
        await expect(loginPage.emptyUsernameError).toBeVisible();
        await expect(loginPage.emptyUsernameError).toHaveText("Required");
        await expect(loginPage.emptyPasswordError).toBeVisible();
        await expect(loginPage.emptyPasswordError).toHaveText("Required");
    });
});