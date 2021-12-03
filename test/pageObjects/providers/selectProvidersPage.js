const CommonBrowserUtils = require('../../utils/commonUtils')
const expectChai = require('chai').expect


class selectProvidersPage extends CommonBrowserUtils {

    get userLoginIcon() { return $("//div[contains(@class,'Navbar_profile_btn')]") }
    get allProvidersSelectableTimeSlots() { return "//div[contains(@class,'selectable-item')]" }
    get paginationDropdownButton() { return $("//div[@class=' css-16n2thc']") }
    get paginationSelectValue() { return $("//div[@class=' css-yt9ioa-option' and text()='30']") }
    get allVisibleProvidersCards() { return $$("//div[contains(@class,'provider-list-card-item')]") }
    get singleProviderCardFromAllCards() { return "./div/div[1]/div" }
    get avaliableNextDayTimeSlotsForMatchedProvider() { return "./div/div[3]/div/div/div[1]/div[1]/div[1]/div[2]/div[contains(@class,'selectable-item')]" }
    get bookAppointmentBtnForProvider() { return "=Book Appointment" }
    get selectedProviderTimeSlotDetails() { return $("//div[contains(@class,'BookingProviderPreview_editTimeCard__2rRsx')]/div[1]") }
    get clearFilterBtn() { return $("span=Clear Filters")}
    get filterDateDropdownBtn() { return $("//span[@class='FilterDropdownWrapper_pill_label__wInei mr-2 ' and contains(text(),'Today')]") } 
    get filterDateToBeSelected() { return "//div[contains(@aria-label,'placeholder')]" }
    get filterSelectDateBtn() { return $("//button[text()='Select Date']") } 
    get fisrtDisplayedDateHeader() { return $("//div[contains(@class,'ProvidersAndMap_results_container__1CYkM')]/following-sibling::div//button[contains(@class,'DatePaginator_date_paginator_button')][1]/following-sibling::div[1]/div[1]") }
    get filterAppointmentTypeDrpdwnBtn() { return $("//span[contains(@class,'FilterDropdownWrapper_pill_label') and contains(text(),'Appointment Type')]")}
    get filterSelectAppointmentTypeOption() { return "//div[contains(@class,'AppointmentModeFilter_container__2w5mB')]//span[contains(text(),'placeholder')]" } 
    get lastPageValueFromPagination() { return $("//button[contains(text(),'Next') and @type='button']/parent::div/div/button[last()]") }
    get nextPageBtn() { return $("//button[text()='Next']") }
    get providerNameFromProviderCard() { return "./div/div[1]/div/div/div[2]/div[1]/a"}
    get providerAvaliableAppointmentTypeFromCard() { return "./div/div[1]/div/div/div[2]/div[1]/div/div" }


    async verifyUserLoginSuccess(){
        await this.userLoginIcon.waitForDisplayed()
    }

    async waitForProvidersToLoad(){
        await super.waitForElemsToLoad(this.allProvidersSelectableTimeSlots, "No Providers were found")
        await driver.pause(2500)
    }

    async setPaginationValue(){
        await this.paginationDropdownButton.click()
        await this.paginationSelectValue.click()
        await this.waitForProvidersToLoad()
    }

    async getProviderAndSelectTimeSlot(providerName){
        // ----Select Provider----
        let matchedProviderCard = null
        for (let eachProviderCard of await this.allVisibleProvidersCards) {
            const tempProviderString = await eachProviderCard.$(this.singleProviderCardFromAllCards).getText()
            if (tempProviderString.includes(providerName)) {
                matchedProviderCard = eachProviderCard
                break
            }
        }

        // ----Select first avaliable slot from next day timeslots-----
        await matchedProviderCard.$$(this.avaliableNextDayTimeSlotsForMatchedProvider)[0].scrollIntoView({block: "center"})
        const selectedTime = await matchedProviderCard.$$(this.avaliableNextDayTimeSlotsForMatchedProvider)[0].getText() 
        await matchedProviderCard.$$(this.avaliableNextDayTimeSlotsForMatchedProvider)[0].click()
        // ----Click on book appointment btn------
        await super.waitForElemToBeClickableAndClick(await matchedProviderCard.$(this.bookAppointmentBtnForProvider))
        return selectedTime
    }

    async clickOnClearFilterBtn(){
        await super.waitForElemToBeClickableAndClick(this.clearFilterBtn)
    }

    async applyDateFilter(dateToSelectStr){
        await this.filterDateDropdownBtn.click()
        await $(this.filterDateToBeSelected.replace('placeholder',dateToSelectStr)).click()
        await super.waitForElemToBeClickableAndClick(this.filterSelectDateBtn)
    }

    async verifyFirstDateHeaderDisplayed(dateToVerifyDay,dateToVerifyDate){
        await expect(this.fisrtDisplayedDateHeader).toHaveTextContaining(dateToVerifyDay,{ignoreCase:true})
        await expect(this.fisrtDisplayedDateHeader).toHaveTextContaining(dateToVerifyDate,{ignoreCase:true})
    }

    async verifyDateFilterWorking(dateToSelectStr,afterFilterDateHeaderDay,afterFilterDateHeaderDate,afterClearFilterDateHeaderDay,afterClearFilterDateHeaderDate){
        await this.applyDateFilter(dateToSelectStr)
        await this.waitForProvidersToLoad()
        await this.verifyFirstDateHeaderDisplayed(afterFilterDateHeaderDay,afterFilterDateHeaderDate)
        await this.clickOnClearFilterBtn()
        await this.waitForProvidersToLoad()
        await this.verifyFirstDateHeaderDisplayed(afterClearFilterDateHeaderDay,afterClearFilterDateHeaderDate)
    }

    async applyAppointmentFilter(appointmentType){
        await this.filterAppointmentTypeDrpdwnBtn.click()
        await driver.$(this.filterSelectAppointmentTypeOption.replace('placeholder',appointmentType)).click()
    }

    async getTotalPagesValue(){
        return parseInt(await this.lastPageValueFromPagination.getText())
    }

    async iterateOverProvidersCardAndVerifyDetails(detailType,detailValue){
        await this.waitForProvidersToLoad()
        const totalPages = await this.getTotalPagesValue()
        if(detailType == "providerName"){

        }
        else if(detailType=="providerAvaliableApptmtTypes"){
            for(let i=1;i<=totalPages;i++){
                await this.allVisibleProvidersCards[0].scrollIntoView({block: "center"})
                var allProvidersCard = await this.allVisibleProvidersCards;
                for(let i = 0; i<allProvidersCard.length; i++){
                    if(!(await allProvidersCard[i].$(this.providerAvaliableAppointmentTypeFromCard).getText()).includes(detailValue)){
                        return false
                    }
                }
                if(i==totalPages){
                    return true
                }
                await driver.pause(300)
                await super.scrollToElemAndClick(this.nextPageBtn)
                await this.waitForProvidersToLoad()
            }
        }
        else{

        }
    }

    async verifyAppointmentTypeFilterWorks(appointmentTypeToSelect){
        await this.applyAppointmentFilter(appointmentTypeToSelect)    
        expectChai(await this.iterateOverProvidersCardAndVerifyDetails("providerAvaliableApptmtTypes",appointmentTypeToSelect)).to.be.true;
        await this.clickOnClearFilterBtn()
    }

}

module.exports= new selectProvidersPage()