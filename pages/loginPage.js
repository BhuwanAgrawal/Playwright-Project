class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = this.page.locator("//input[@placeholder='Username']");
        this.password = this.page.locator("//input[@placeholder='Password']");
        this.loginButton = this.page.locator("//button[text()=' Login ']");
        this.forgotPasswordLink = this.page.locator("//p[text()='Forgot your password? ']");
        this.invalidCredentialsError = this.page.locator("//p[text()='Invalid credentials']");
        this.emptyUsernameError = this.page.locator("(//span[text()='Required'])[1]");
        this.emptyPasswordError = this.page.locator("(//span[text()='Required'])[2]");
    }

    async loginToApplication(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    getEmptyPasswordErrorLocator = async () => {
        const errors = this.page.locator("//span[text()='Required']");
        const count = await errors.count();
        return count === 2 ? errors.nth(1) : errors.nth(0);
    }
}

module.exports = { LoginPage };