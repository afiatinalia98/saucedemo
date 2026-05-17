const {Builder, By, until, Key} = require("selenium-webdriver")
const assert = require("assert")

class HomePage{
    constructor(driver){
        this.driver = driver;
        this.productTitle1 = By.xpath("//div[.='Sauce Labs Backpack']")
    }

    async open(url){
        await this.driver.get(url)
    }

    async getProductItem1() {
        const product = await this.driver.wait(until.elementLocated(this.productTitle1), 10000)

        return await product.getText()
    }
    async verifySuccessLogin(expectedText, message){
        const productVisible = await this.getProductItem1();

        assert.strictEqual(productVisible.includes(expectedText), true, message)
    }
}

module.exports = HomePage;