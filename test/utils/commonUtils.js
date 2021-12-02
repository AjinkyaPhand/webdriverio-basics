class CommonBrowserUtils {

    /**
     * 
     * @param {element} element - Element locator to be clicked
     */
    async waitForElemToBeClickableAndClick(element) {
        await element.waitForClickable()
        await element.click()
    }

    /**
     * 
     * @param {element} element - Element locator to be scrolled to and clicked
     */
    async scrollToElemAndClick(element){
        await element.scrollIntoView()
        await element.click()
    }

    /**
     * 
     * @param {*} elementsToWaitFor - Element locator ($$) for which to wait to load
     * @param {*} timeoutMsg - if Element is not loaded then display this msg
     */
    async waitForElemsToLoad(elementsToWaitFor,timeoutMsg,timeout = 30000){
        await driver.waitUntil(async () => {
            const foundElements = await $$(elementsToWaitFor)
            return foundElements.length > 0 ? foundElements : false
        }, {
            timeout: timeout,
            timeoutMsg: timeoutMsg
        })
    }

    /**
     * 
     * @param {*} element - Element locator in which value to be entered
     * @param {*} valueToEnter - value to enter
     */
    async enterValue(element,valueToEnter){
        await element.clearValue()
        await element.setValue(valueToEnter)
    }

    /**
     * 
     * @param {*} element - Element locator to wait for it to be clickable
     */
    async expectElemToBeClickable(element){
        await expect(element).toBeClickable()
    }

}

module.exports = CommonBrowserUtils;