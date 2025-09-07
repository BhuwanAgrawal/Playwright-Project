class DashboardPage {
    constructor(page) {
        this.page = page;
        this.companyBranding = "//a[@class='oxd-brand']";
        this.dashboard = "//h6[text()='Dashboard']";
        this.profile = "//p[@class='oxd-userdropdown-name']";
        this.admin = "//span[text()='Admin']";
        this.userAvatar="//img[@class='oxd-userdropdown-img']";
        this.logoutButton="//a[text()='Logout']";
    }   
    async logoutUser() {
        await this.page.click(this.profile);
        await this.page.click(this.logoutButton);
    }
}

module.exports = { DashboardPage };