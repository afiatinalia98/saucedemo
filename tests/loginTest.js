require("chromedriver")

const {
    Builder,
    by,
    until,
    Key
} = require("selenium-webdriver")
const chrome = require("selenium-webdriver/chrome")
const testdata = require("../fixtures/testData.json")
const LoginPage = require("../pages/loginPage")
const HomePage = require("../pages/homePage")

async function LoginTest() {
    describe("Login Test Suite", function () {
        this.timeout(12000)
        let driver;
        // let browserName = "chrome";
        let options = new chrome.Options();
        options.addArguments("--headless");
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        options.addArguments('--window-size=1920,1080');
        let loginPage;
        let homePage;

        beforeEach(async function () {
            let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
            loginPage = new LoginPage(driver);
            homePage = new HomePage(driver)

            await loginPage.open(testdata.url)
        })

        it("TNL001 - Failed Login using Invalid Username", async function () {
            await loginPage.loginFailed(testdata.invalidCred.username, testdata.validCred.password)

            await loginPage.verifyFailedLogin(testdata.expectedText.errorMessage, testdata.message.errorMessageDissapear)
        })

        it("TNL002 - Failed Login using Invalid Password", async function () {
            await loginPage.loginFailed(testdata.validCred.username, testdata.invalidCred.password)

            await loginPage.verifyFailedLogin(testdata.expectedText.errorMessage, testdata.message.errorMessageDissapear)
        })

        it("TPL003 - Success Login using Valid Credential", async function () {
            await loginPage.login(testdata.validCred.username, testdata.validCred.password)

            await homePage.verifySuccessLogin(testdata.expectedText.productItem1, testdata.message.productItemDisappear)
        })

        afterEach(async function () {
            if (driver) {
                await driver.quit()
            }
        })
    })
}

LoginTest();