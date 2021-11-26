const googlePageObject = require('../../pageObjects/googlePage')

describe("Second Test Suite",()=>{

    before(async ()=>{
        await driver.url('https://www.google.com')
        await driver.maximizeWindow()
    })

    it("2nd google search in using page object", async ()=>{
        await googlePageObject.searchAndVerifyTitle('flipkart','flipkart - Google Search')
    })


})