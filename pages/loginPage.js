class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = page.locator("//input[@placeholder='Username']");
        this.password = page.locator("//input[@placeholder='Password']");
        this.loginButton = page.locator("//button[text()=' Login ']");
        this.forgotPasswordLink = page.locator("//p[text()='Forgot your password? ']");
        this.invalidCredentialsError = page.locator("//p[text()='Invalid credentials']");
        this.emptyUsernameError = page.locator("(//span[text()='Required'])[1]");
        this.emptyPasswordError = page.locator("(//span[text()='Required'])[2]");
    }

    async loginToApplication(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    getEmptyPasswordErrorLocator = async () => {
        const errors = this.page.locator("//span[text()='Required']");
        const count = await errors.count();
        // If both fields are empty, password error is at index 1 (second "Required")
        // If only password is empty, it's at index 0 (first "Required")
        return count === 2 ? errors.nth(1) : errors.nth(0);
    }
}

module.exports = { LoginPage };