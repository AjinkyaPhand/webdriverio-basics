class GooglePage {
    get inputSearchBox() { return $("input[class='gLFyf gsfi']") }
    get searchResultULElem() { return $("//ul[@class='G43f7e']") }
    get searchResultLIElem() { return $$("//ul[@class='G43f7e']/li") }

    async searchAndVerifyTitle(searchKeyWord, pageTitle) {
        await this.inputSearchBox.setValue(searchKeyWord)
        await driver.pause(500)
        await this.searchResultLIElem[0].click()
        await expect(driver).toHaveTitle(pageTitle)
    }
}

module.exports = new GooglePage()