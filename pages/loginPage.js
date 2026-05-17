const {
    Builder,
    By,
    until,
    Key
} = require("selenium-webdriver")
const assert = require("assert")
const HomePage = require("../pages/homePage")

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.username = By.id("user-name")
        this.password = By.id("password")
        this.loginBtn = By.id("login-button")
        this.errorMsg = By.css(".error-message-container")
    }

    async open(url) {
        await this.driver.get(url)
    }

    async login(username, password) {
        await this.driver.findElement(this.username).sendKeys(username)
        await this.driver.findElement(this.password).sendKeys(password)
        await this.driver.findElement(this.loginBtn).click()

        return new HomePage(this.driver)
    }

    async loginFailed(username, password) {
        await this.driver.findElement(this.username).sendKeys(username)
        await this.driver.findElement(this.password).sendKeys(password)
        await this.driver.findElement(this.loginBtn).click()
    }

    async getErrorMessageLogin() {
        const errorMessage = await this.driver.wait(until.elementLocated(this.errorMsg), 10000)

        return await errorMessage.getText()
    }
    async verifyFailedLogin(expectedText, message) {
        const errorVisible = await this.getErrorMessageLogin();

        assert.strictEqual(errorVisible.includes(expectedText), true, message)
    }
}

module.exports = LoginPage;