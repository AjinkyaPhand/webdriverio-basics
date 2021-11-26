const googlePageObject = require('../../pageObjects/googlePage')

describe("Fifth Test Suite",()=>{

    before(async ()=>{
        await driver.url('https://www.google.com')
        await driver.maximizeWindow()
    })

    it("5th google search in using page object", async ()=>{
        await googlePageObject.searchAndVerifyTitle('virat','virat kohli - Google Search')
    })


})