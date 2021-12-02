const CommonUtils = require('../../utils/commonUtils')

class AppLandingPage extends CommonUtils {

    get locationModalInputField() { return $("#modal-location") }
    get locationModalInputSuggestions() { return $$("ul[class*='AddressAutocomplete_suggestion__pqIPx'] li") }
    get locationModalViewProvidersBtn() { return $("//button[text()='View Providers']") }
    get loginBtn() { return $("=Login") }


    async selectInitialLocationFromPopup(locationKeyword,locationToSelect) {
        await this.locationModalInputField.setValue(locationKeyword)
        const autoSuggestedLocationDropdownItems = await driver.waitUntil(async () => {
            const allLocations = await this.locationModalInputSuggestions
            return allLocations.length > 0 ? allLocations : false
        }, {
            timeoutMsg: 'No Locations were found'
        })
        for (let eachLocation of autoSuggestedLocationDropdownItems) {
            if (await eachLocation.getText() === locationToSelect) {
                await eachLocation.click()
                break
            }
        }
        await super.waitForElemToBeClickableAndClick(this.locationModalViewProvidersBtn)
    }

    async clickOnLoginLink(){
        await super.waitForElemToBeClickableAndClick(this.loginBtn)
    }

}

module.exports = new AppLandingPage()