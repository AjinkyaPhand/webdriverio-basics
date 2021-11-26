const googlePageObject = require('../../pageObjects/googlePage')

describe("Fourth Test Suite",()=>{

    before(async ()=>{
        await driver.url('https://www.google.com')
        await driver.maximizeWindow()
    })

    it("4th google search in using page object", async ()=>{
        await googlePageObject.searchAndVerifyTitle('elon','elon musk - Google Search')
    })


})