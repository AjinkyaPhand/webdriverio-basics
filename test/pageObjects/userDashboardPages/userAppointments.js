const CommonBrowserUtils = require('../../utils/commonUtils')

class PayAndBookAppointmentPage extends CommonBrowserUtils {

    get bookedProviderName() { return $("//div[contains(@class,'Appointment_appt_margin_xl__g4R3m')][1]/div[1]/div[1]/div/div[2]/div[1]/a") }
    get bookedProviderTimeSlot() { return $("//div[contains(@class,'Appointment_appt_margin_xl__g4R3m')][1]/div[1]/div[2]/div/div[1]") }
    get findAProviderLink() { return $("button=Find a provider")}

   
    async bookedProviderDetails(prividerName,bookedAppointmentTimeSlot){
        await expect(this.bookedProviderName).toHaveText(prividerName)
        await expect(this.bookedProviderTimeSlot).toHaveText(bookedAppointmentTimeSlot)

    }

    async clickOnFindProviderLink(){
        await this.findAProviderLink.click()
    }

}

module.exports = new PayAndBookAppointmentPage()