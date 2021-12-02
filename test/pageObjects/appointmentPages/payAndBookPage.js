const CommonBrowserUtils = require('../../utils/commonUtils')

class PayAndBookAppointmentPage extends CommonBrowserUtils {

    get paymentConsentAgreeChkbox() { return $("#payment-consent-agree-checkbox") }
    get bookAppointmentBtn() { return $("#book-appointment-button") }
    get bookingConfirmationModalPopup() { return $("//div[contains(@class,'modal-content card')]/div") }
    get bookingConfirmationPopupText() { return $("//div[@class='d-flex']//span") }
    get bookingConfirmPopupGoToDashbrdBtn() { return $("button=Go to Dashboard") }



    async clickOnPaymentConsentCheckboxAndBookApptment(){
        await super.scrollToElemAndClick(this.paymentConsentAgreeChkbox)
        await super.waitForElemToBeClickableAndClick(this.bookAppointmentBtn)
    }

    async verifyBookingConfirmationPopup(confirmationText){
        await this.bookingConfirmationModalPopup.waitForDisplayed()
        await expect(this.bookingConfirmationPopupText).toHaveText(confirmationText)

        // -----Go to dashboard -------
        await this.bookingConfirmPopupGoToDashbrdBtn.scrollIntoView()
        await this.bookingConfirmPopupGoToDashbrdBtn.click()
    }


}

module.exports = new PayAndBookAppointmentPage()