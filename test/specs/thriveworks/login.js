const googlePageObject = require('../../pageObjects/googlePage')

describe("Second Test Suite", () => {

    before(async () => {
        await driver.url('https://qa-thriveworks.vercel.app/app/providers')
        await driver.maximizeWindow()
    })

    it("first thriveworks TC", async () => {

        // ==========Select location============
        await $("#modal-location").setValue("florida")
        const dropdownListItems = await driver.waitUntil(async () => {
            const items = await $$("ul[class*='AddressAutocomplete_suggestion__pqIPx'] li")
            return items.length > 0 ? items : false
        }, {
            timeoutMsg: 'Matching item not found'
        })
        await dropdownListItems.find(async (elem) => {
            await elem.getText() == "Florida USA"
        }).click()

        await $("//button[text()='View Providers']").waitForClickable()
        await $("//button[text()='View Providers']").click()
        await $("=Login").click()

        // =========Login==========
        await $("#email").setValue("ajinkya.phand@velotio.com")
        await $("#password").setValue("Oscar@123")
        await $("#btn-login").click()

        await $("=Dashboard").waitForClickable();

        const providersCards = await driver.waitUntil(async () => {
            const allProviderCards = await $$("//div[@class='mb-4 provider-list-card-item']")
            return allProviderCards.length > 0 ? allProviderCards : false
        }, {
            timeout: 20000,
            timeoutMsg: 'No Providers were found'
        })


        // ====APPLY FILTERS========
        await $("//span[@class='FilterDropdownWrapper_pill_label__wInei mr-2 ' and text()='Therapy Type']").click();
        const allTherapyTypeOptions = await $$("//div[contains(@class,'CounselingFilter_container__2J6r8')]/div")
        
        const foundElem = allTherapyTypeOptions.find(async (eachOpt) => {
            const tempText = await eachOpt.getText()
            console.log((tempText));
            return tempText === "Individual Counseling"
        })
        console.log(await foundElem.getText())
        // const foundElem = allTherapyTypeOptions.find(async (eachOpt) => (await eachOpt.getText()) === "Individual Counseling")
        // console.log(await foundElem.getText());
        // for (let elem of allTherapyTypeOptions){
        //     if (await elem.getText()==="Individual Counseling"){
        //         await elem.click()
        //         break
        //     }
        // }


        // await $("//span[@class='FilterDropdownWrapper_pill_label__wInei mr-2 ' and contains(text(),'Today')]").click()
        // await $("//div[contains(@aria-label,'Choose Tuesday, November 30th, 2021')]").click()
        // await $("//button[text()='Select Date']").waitForClickable();
        // await $("//button[text()='Select Date']").click()
        // await driver.pause(5000)
    })


})