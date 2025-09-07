const { test, expect } = require('@playwright/test');
const testData = JSON.parse(JSON.stringify(require('../testData/testdata.json')));
const { LoginPage } = require('../pages/loginPage.js');
const { DashboardPage } = require('../pages/dashboardPage.js');

test.describe('Verify Dashboard Page', () => {
    let browserContext, page, loginPage, dashboardPage;

    test.beforeAll(async ({ browser }) => {
        browserContext = await browser.newContext({ viewport: { width: 1620, height: 1080 } });
        page = await browserContext.newPage();
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        await page.goto(testData.loginPage.url);
        await page.waitForLoadState('networkidle');
        await loginPage.loginToApplication(testData.loginPage.validUser.username, testData.loginPage.validUser.password);
    });

    test.afterAll(async () => {
        await dashboardPage.logoutUser();
        await page.waitForLoadState('networkidle');
        await browserContext.close();
    });

    test('Verify Dashboard Page Title', async () => {
        await expect(page).toHaveTitle(testData.dashboardPage.expectedTitle);
    });

    test('Verify Dashboard Page URL', async () => {
        await expect(page).toHaveURL(testData.dashboardPage.expectedUrl);
    });

    test('Verify Dashboard Page Logo', async () => {
        const logo = page.locator(dashboardPage.companyBranding);
        await expect(logo).toBeVisible();
    });

    test('Verify Dashboard Page', async () => {
        const dashboard = page.locator(dashboardPage.dashboard);
        await expect(dashboard).toBeVisible();
    });

    test('Verify Dashboard Page User Profile', async () => {
        const profile = page.locator(dashboardPage.profile);
        await expect(profile).toBeVisible();
    });

    test('Verify Dashboard Page Admin Link', async () => {
        const admin = page.locator(dashboardPage.admin);
        await expect(admin).toBeVisible();
    });

    test('Verify User Avatar is Visible', async () => {
        const avatar = page.locator(dashboardPage.userAvatar);
        await expect(avatar).toBeVisible();
    });

    test('Verify Logout Button is Present', async () => {
        await page.click(dashboardPage.profile);
        const logoutBtn = page.locator(dashboardPage.logoutButton);
        await expect(logoutBtn).toBeVisible();
    });
});

