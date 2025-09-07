class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = "//input[@placeholder='Username']";
        this.password = "//input[@placeholder='Password']";
        this.loginButton = "//button[text()=' Login ']";
    }   
    async loginToApplication(username, password) {
        await this.page.fill(this.username,username);
        await this.page.fill(this.password,password);
        await this.page.click(this.loginButton);
    }
}

module.exports = { LoginPage };