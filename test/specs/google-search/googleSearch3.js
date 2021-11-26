const googlePageObject = require('../../pageObjects/googlePage')

describe("Third Test Suite",()=>{


    before(async ()=>{
        await driver.url('https://www.google.com')
        await driver.maximizeWindow()
    })

    it("3rd google search in using page object", async ()=>{
        await googlePageObject.searchAndVerifyTitle('apple','apple - Google Search')
    })


})