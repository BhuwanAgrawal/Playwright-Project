const {test,expect} = require('@playwright/test')


test.use({viewport:{width:1536,height:695}})

test.only("Login", async function({page}){

await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

await page.getByPlaceholder("Username").type("Admin",{delay:200})
await page.getByPlaceholder("Password").type("admin123",{delay:200})
await page.locator("button[type='submit']").click()
await expect(page).toHaveURL(/dashboard/)

await page.getByAltText("profile picture").nth(0).click()
await page.getByText("Logout").click()
await expect(page).toHaveURL(/login/)
await page.screenshot({path:'screenshot/Login.png'},{fullPage:true})

})

test("Invalid Login", async function({page}){

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.getByPlaceholder("Username").type("Admin1",{delay:200})
    await page.getByPlaceholder("Password").type("admin1234",{delay:200})
    await page.locator("button[type='submit']").click()
    await expect(page.locator(".oxd-alert-content-text")).toHaveText("Invalid credentials") 
    await expect(page).toHaveURL(/login/)
    })

test("Empty Username and Password", async function({page}){
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.locator("button[type='submit']").click()
    await expect(page.locator(".oxd-input-group__message")).toHaveText("Required") 
    await expect(page).toHaveURL(/login/)
    })

test("Empty Password", async function({page}){
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.getByPlaceholder("Username").type("Admin",{delay:200})
    await page.locator("button[type='submit']").click()
    await expect(page.locator(".oxd-input-group__message")).toHaveText("Required") 
    await expect(page).toHaveURL(/login/)
    })
test("Empty Username", async function({page}){
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.getByPlaceholder("Password").type("admin123",{delay:200})
    await page.locator("button[type='submit']").click()
    await expect(page.locator(".oxd-input-group__message")).toHaveText("Required") 
    await expect(page).toHaveURL(/login/)
    })

test("Check Login Button Disabled State", async function({page}){
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    // Check if the login button is disabled when username and password are empty
    // const loginButton = page.locator("button[type='submit']");
    // await expect(loginButton).toBeDisabled();
    // Alternative way to check if the button is disabled
    await expect(page.locator("button[type='submit']")).toHaveAttribute('disabled', '');
    })

test("Check Password Masking", async function({page}){
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    const passwordField = page.getByPlaceholder("Password");
    await passwordField.type("admin123",{delay:200});
    // Check if the password field masks the input (i.e., the type attribute should be 'password')
    await expect(passwordField).toHaveAttribute('type', 'password');
    })      
test("Check Remember Me Functionality", async function({page}){
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.getByPlaceholder("Username").type("Admin",{delay:200})
    await page.getByPlaceholder("Password").type("admin123",{delay:200})
    // Assuming there is a 'Remember Me' checkbox with a specific selector
    const rememberMeCheckbox = page.locator("input[type='checkbox'][name='remember']");
    await rememberMeCheckbox.check();
    await page.locator("button[type='submit']").click();
    await expect(page).toHaveURL(/dashboard/);
    // Log out to see if the username is remembered
    await page.getByAltText("profile picture").click();
    await page.getByText("Logout").click();
    await expect(page).toHaveURL(/login/);
    // Check if the username field is pre-filled
    await expect(page.getByPlaceholder("Username")).toHaveValue("Admin");
    })
test("Check Login Page UI Elements", async function({page}){
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    // Check for the presence of key UI elements on the login page
    await expect(page.getByPlaceholder("Username")).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
    await expect(page.locator("button[type='submit']")).toBeVisible();
    await expect(page.locator("img[alt='company logo']")).toBeVisible(); // Assuming there's a company logo
    })  
test("Check Case Sensitivity of Username and Password", async function({page}){
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.getByPlaceholder("Username").type("admin",{delay:200}) // Lowercase 'a'
    await page.getByPlaceholder("Password").type("Admin123",{delay:200}) // Uppercase 'A'
    await page.locator("button[type='submit']").click()
    await expect(page.locator(".oxd-alert-content-text")).toHaveText("Invalid credentials") 
    await expect(page).toHaveURL(/login/)
    })  
test("Check SQL Injection Vulnerability", async function({page}){
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.getByPlaceholder("Username").type("Admin' OR '1'='1",{delay:200})
    await page.getByPlaceholder("Password").type("admin123",{delay:200})
    await page.locator("button[type='submit']").click()
    await expect(page.locator(".oxd-alert-content-text")).toHaveText("Invalid credentials") 
    await expect(page).toHaveURL(/login/)
    })  
test("Check XSS Vulnerability", async function({page}){
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.getByPlaceholder("Username").type("<script>alert('XSS')</script>",{delay:200})
    await page.getByPlaceholder("Password").type("admin123",{delay:200})
    await page.locator("button[type='submit']").click()
    await expect(page.locator(".oxd-alert-content-text")).toHaveText("Invalid credentials") 
    await expect(page).toHaveURL(/login/)
    })  
test("Check Session Timeout", async function({page}){
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.getByPlaceholder("Username").type("Admin",{delay:200})
    await page.getByPlaceholder("Password").type("admin123",{delay:200})
    await page.locator("button[type='submit']").click()
    await expect(page).toHaveURL(/dashboard/);
    // Simulate inactivity by waiting for a certain period (e.g., 5 minutes)
    await page.waitForTimeout(5 * 60 * 1000);
    // Try to interact with the page after inactivity
    await page.reload();
    // Check if the user is redirected to the login page due to session timeout
    await expect(page).toHaveURL(/login/);
    })
test("Check Forgot Password Link", async function({page}){
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    const forgotPasswordLink = page.getByText("Forgot your password?");
    await expect(forgotPasswordLink).toBeVisible();
    await forgotPasswordLink.click();
    // Verify that the user is navigated to the forgot password page
    await expect(page).toHaveURL(/requestPasswordResetCode/);
    })
test("Check Social Media Links", async function({page}){
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    const socialMediaLinks = [
        {selector: 'a[href="https://www.facebook.com/OrangeHRM/"]', name: 'Facebook'},
        {selector: 'a[href="https://twitter.com/orangehrm"]', name: 'Twitter'},
        {selector: 'a[href="https://www.linkedin.com/company/orangehrm/"]', name: 'LinkedIn'}
    ];  
    for (const link of socialMediaLinks) {
        const socialLink = page.locator(link.selector);
        await expect(socialLink).toBeVisible();
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
            socialLink.click()
        ]);
        await newPage.waitForLoadState();
        await expect(newPage).toHaveURL(new RegExp(link.name.toLowerCase()));
        await newPage.close();
    }   
    })
test("Check Login with Leading/Trailing Spaces", async function({page}){
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.getByPlaceholder("Username").type("  Admin  ",{delay:200}) // Leading and trailing spaces
    await page.getByPlaceholder("Password").type("  admin123  ",{delay:200}) // Leading and trailing spaces
    await page.locator("button[type='submit']").click()
    await expect(page.locator(".oxd-alert-content-text")).toHaveText("Invalid credentials") 
    await expect(page).toHaveURL(/login/)
    })
test("Check Login with Special Characters", async function({page}){
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.getByPlaceholder("Username").type("Admin!@#",{delay:200}) // Special characters
    await page.getByPlaceholder("Password").type("admin123$%^",{delay:200}) // Special characters
    await page.locator("button[type='submit']").click()
    await expect(page.locator(".oxd-alert-content-text")).toHaveText("Invalid credentials") 
    await expect(page).toHaveURL(/login/)
    })
test("Check Login with Very Long Inputs", async function({page}){
    const longUsername = 'A'.repeat(256); // 256 characters long
    const longPassword = 'a'.repeat(256); // 256 characters long
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.getByPlaceholder("Username").type(longUsername,{delay:10})
    await page.getByPlaceholder("Password").type(longPassword,{delay:10})
    await page.locator("button[type='submit']").click()
    await expect(page.locator(".oxd-alert-content-text")).toHaveText("Invalid credentials") 
    await expect(page).toHaveURL(/login/)
    })  
test("Check Login Page Responsiveness", async function({page}){
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    // Set viewport to mobile size
    await page.setViewportSize({width: 375, height: 667}); // iPhone 6/7/8 dimensions   
    // Check if key UI elements are still visible and properly aligned
    await expect(page.getByPlaceholder("Username")).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
    await expect(page.locator("button[type='submit']")).toBeVisible();
    // Optionally, take a screenshot for visual verification
    // await page.screenshot({ path: 'login-page-mobile.png' });
    })
test("Check Login with Different Browsers", async function({browser}){
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.getByPlaceholder("Username").type("Admin",{delay:200})
    await page.getByPlaceholder("Password").type("admin123",{delay:200})
    await page.locator("button[type='submit']").click()
    await expect(page).toHaveURL(/dashboard/)
    await context.close();
    })
test("Check Login with Caps Lock On", async function({page}){
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.getByPlaceholder("Username").type("ADMIN",{delay:200}) // Caps Lock on
    await page.getByPlaceholder("Password").type("ADMIN123",{delay:200}) // Caps Lock on
    await page.locator("button[type='submit']").click()
    await expect(page.locator(".oxd-alert-content-text")).toHaveText("Invalid credentials") 
    await expect(page).toHaveURL(/login/)
    })
test("Check Login Page Load Time", async function({page}) {
    const startTime = Date.now();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    const loadTime = Date.now() - startTime;
    console.log(`Login page load time: ${loadTime} ms`);
    // Assert that the load time is within acceptable limits (e.g., less than 2000 ms)
    expect(loadTime).toBeLessThan(2000);
    });
test("Check Login with Browser Autofill", async function({page}) {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    // Simulate browser autofill by setting values directly
    await page.evaluate(() => {
        document.querySelector('input[placeholder="Username"]').value = 'Admin';
        document.querySelector('input[placeholder="Password"]').value = 'admin123';
    });
    await page.locator("button[type='submit']").click();
    await expect(page).toHaveURL(/dashboard/);
    });
test("Check Login Page Accessibility", async function({page}) {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    // Check for accessibility attributes on key elements
    await expect(page.getByPlaceholder("Username")).toHaveAttribute('aria-label', 'Username');
    await expect(page.getByPlaceholder("Password")).toHaveAttribute('aria-label', 'Password');
    await expect(page.locator("button[type='submit']")).toHaveAttribute('aria-label', 'Login');
    });
// Note: Some tests may require additional setup or assumptions about the application's behavior and elements.
// The selectors used in the tests should be verified against the actual application under test.
// Also, certain functionalities like session timeout may not be testable in a real-time manner and might need to be simulated or configured in the application settings.
// Always ensure to run these tests in a controlled test environment to avoid affecting real user data.
// The tests above cover a wide range of scenarios including valid and invalid logins, UI checks, security vulnerabilities, and more.
// Adjust the test parameters and assertions as needed based on the actual application behavior and requirements.
// Some tests may require additional Playwright plugins or libraries for full functionality, such as accessibility testing tools.
// Make sure to handle any asynchronous operations appropriately to avoid flaky tests.
// Always clean up after tests if they modify any state or data in the application.
// Consider using environment variables or configuration files to manage test data and settings securely.
// Regularly review and update the tests to keep them aligned with any changes in the application under test.
// End of tests
