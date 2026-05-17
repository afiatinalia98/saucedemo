const{Builder, By, until, Key} = require("selenium-webdriver")
const assert = require("assert")
const HomePage = require("../pages/homePage")

class LoginPage{
    constructor(driver){
        this.driver = driver;
        this.username = By.id("user-name")
        this.password = By.id("password")
        this.loginBtn = By.id("login-button")
    }

    async open(url){
        await this.driver.get(url)
    }

    async login(username, password){
        await this.driver.findElement(this.username).sendKeys(username)
        await this.driver.findElement(this.password).sendKeys(password)
        await this.driver.findElement(this.loginBtn).click()

        return new HomePage(this.driver)
    }
}

module.exports = LoginPage;