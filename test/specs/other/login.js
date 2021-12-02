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


        // ====APPLY FILTERS========
        await $("//span[@class='FilterDropdownWrapper_pill_label__wInei mr-2 ' and contains(text(),'Today')]").click()
        await $("//div[contains(@aria-label,'Choose Friday, December 3rd, 2021')]").click()
        await $("//button[text()='Select Date']").waitForClickable();
        await $("//button[text()='Select Date']").click()
        // await driver.pause(5000)
    })


})