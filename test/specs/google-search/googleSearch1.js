const googlePageObject = require('../../pageObjects/googlePage')

describe("First Test Suite",()=>{

    before(async ()=>{
        await driver.url('https://www.google.com')
        await driver.maximizeWindow()
    })

    xit("First google-search test case",async ()=>{
        const inputSearchField = await $("input[class='gLFyf gsfi']")
        await inputSearchField.setValue("amazon")

        // await driver.pause(500)
        const searchResults = await $$("//ul[@class='G43f7e']/li")
        // await searchResults[0].waitForExist()
        await searchResults[0].waitUntil(async function () {
            return this.getText()==="Amazon"
        }, {
            timeout: 5000,
            timeoutMsg: 'search results list was not found after 5 seconds'
        });
        // console.log(await searchResults[0].getText());
        await searchResults[0].click()
        await expect(driver).toHaveTitle('amazon - Google Search')
    })

    xit("google search with aysnc chaining",async ()=>{
        await $("input[class='gLFyf gsfi']").setValue("amazon")
        // await driver.pause(500)
        // const li = await driver.waitUntil(async () => {
        //     const elems = await $$("//ul[@class='G43f7e']/li")
        //     if (elems.length < 0) {
        //         return false
        //     }
        //     return elems[0]
        // }, {
        //     timeoutMsg: 'Never found enough div elements'
        // })
        // await li.click()
        await $("//ul[@class='G43f7e']/li[1]/div/div[2]").waitForClickable()
        await $("//ul[@class='G43f7e']/li[1]/div/div[2]").click()
        await expect(driver).toHaveTitle('amazon - Google Search')
        
    })

    xit("google search in sync mode", ()=>{
        $("input[class='gLFyf gsfi']").setValue("amazon")
        $("//ul[@class='G43f7e']").waitForExist()
        // driver.pause(500)
        $$("//ul[@class='G43f7e']/li")[0].waitForClickable()
        $$("//ul[@class='G43f7e']/li")[0].click()
        expect(driver).toHaveTitle('amazon - Google Search')
    })

    it("1st google search in using page object", async ()=>{
        await googlePageObject.searchAndVerifyTitle('amazon','amazon - Google Search')
    })


})