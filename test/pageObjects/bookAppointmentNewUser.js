const fs = require('fs');

class BookNewAppointmentPage {

    userTestData = JSON.parse(fs.readFileSync('test/testData/bookAppointmentNewUserData.json'))


    get locationModalInputField() { return $("#modal-location") }
    get locationModalInputSuggestions() { return $$("ul[class*='AddressAutocomplete_suggestion__pqIPx'] li") }
    get locationModalViewProvidersBtn() { return $("//button[text()='View Providers']") }
    get allSelectableProvidersTimeSlots() { return $$("//div[contains(@class,'selectable-item')]") }
    get signUpLink() { return $("=Sign up") }
    get signUpEmailInputField() { return $("#email") }
    get signUpEmailPasswordField() { return $("#password") }
    get signUpButton() { return $("#btn-login") }
    get userDashboardLink() { return $("=Dashboard") }
    get paginationDropdownButton() { return $("//div[@class=' css-16n2thc']") }
    get paginationSelectValue() { return $("//div[@class=' css-yt9ioa-option' and text()='30']") }
    get allVisibleProvidersCards() { return $$("//div[contains(@class,'provider-list-card-item')]") }
    get singleProviderCardFromAllCards() { return "./div/div[1]/div" }
    get nextDayAvailableSlotsForProvider() { return "//div[contains(@class,'SlotGrid_slots_container__3YqCx')]/div[2]/div[contains(@class,'selectable-item')]" }
    get bookAppointmentBtnForProvider() { return "=Book Appointment" }
    get providerPreviewCard() { return $("//div[contains(@class,'ProviderPreview_content_container__2hm1')]") }
    get howWeMayHelpDropdownButton() { return $("//div[text()[contains(.,'How may we help?')]]/following-sibling::div//div[contains(@class,'react-select__value-container')]") }
    get howWeMayHelpDropdownMenuItem() { return $("//div[contains(@class,'react-select__menu-list')]/div[text()='placeholderValue']".replace('placeholderValue', this.userTestData.counsellingType)) }
    get appointmentTypeDropdown() { return $("//div[text()[contains(.,'Appointment Type')]]/following-sibling::div//div[contains(@class,'react-select__value-container')]") }
    get appointmentTypeDropdownMenuItem() { return $("//div[contains(@class,'react-select__menu-list')]/div[text()='placeholderValue']".replace('placeholderValue', this.userTestData.appointmentType)) }
    get appointmentForDropdownButton() { return $("//div[text()[contains(.,'Who is this appointment for?')]]/following-sibling::div//div[contains(@class,'react-select__value-container')]") }
    get appointmentForDropdownMenuitem() { return $("//div[contains(@class,'react-select__menu-list')]/div[text()='placeholderValue']".replace('placeholderValue', this.userTestData.appointmentFor)) }
    get patientFirstNameField() { return $("//input[@aria-label='First Name' and contains(@name,'firstName')]") }
    get patientLastNameField() { return $("//input[@aria-label='Last Name' and contains(@name,'lastName')]") }
    get patientEmailField() { return $("//input[@aria-label='Email Address' and contains(@name,'email')]") }
    get patientGenderDropdownButton() { return $("//div[text()[contains(.,'Choose how you identify')]]") }
    get patientGenderDropdownMenuItem() { return $("//div[contains(@class,'react-select__menu-list')]/div[text()='placeholderValue']".replace('placeholderValue', this.userTestData.patientGender)) }
    get patientDOBField() { return $("//input[@aria-label='Date of Birth' and contains(@name,'dateOfBirth')]") }
    get patientRelationshipDropdownButton() { return $("//div[text()[contains(.,'Choose how you’re related')]]") }
    get patientRelationshipDropdownMenuItem() { return $("//div[contains(@class,'react-select__menu-list')]/div[text()='placeholderValue']".replace('placeholderValue', this.userTestData.replationshipWithPatient)) }
    get patientPhoneNumber() { return $("//input[@aria-label='Phone Number' and contains(@name,'phoneNumber')]") }
    get clientAggrementCheckBox() { return $("//div[text()[contains(.,'Client Agreement')]]/following-sibling::div//input") }
    get acknowledgementText() { return $("//i[contains(text(),'ACKNOWLEDGEMENT: ')]") }
    get ackIAgreeButton() { return $("#patient-consent-agree-button") }
    get continueButton() { return $("button=Continue") }
    get preBillingInfoText() { return $("//div[text()='Pre-billing Information']") }
    get billingInformationPatientFirstNameField() { return $("//input[@aria-label='First Name' and contains(@name,'firstName')]") }
    get billingInformationPatientLastNameField() { return $("//input[@aria-label='Last Name' and contains(@name,'lastName')]") }
    get billingInfoAddressLine1() { return $("//input[contains(@id,'address.line1')]") }
    get billingInfoAddressSuggestions() { return $$("ul[class*='AddressAutocomplete_suggestion__pqIPx'] li") }
    get billingInfoCity() { return $("//input[contains(@id,'address.city')]") }
    get billingInfoState() { return $("//input[contains(@id,'address.state')]") }
    get billingInfoCountry() { return $("//input[contains(@id,'address.country')]") }
    get billingInfoZipCode() { return $("//input[contains(@id,'address.zipcode')]") }
    get billingInfoCardNumbIframe() { return $("//iframe[@title='Secure card number input frame']") }
    get billingInfoCardNumbInputField() { return $("//input[@name='cardnumber']") }
    get billingInfoCardExpiryIframe() { return $("//iframe[@title='Secure expiration date input frame']") }
    get billingInfoCardExpiryInputField() { return $("//input[@name='exp-date']") }
    get billingInfoCardCVCIframe() { return $("//iframe[@title='Secure CVC input frame']") }
    get billingInfoCardCVCInputField() { return $("//input[@name='cvc']") }
    get paymentConsentAgreeChkbox() { return $("#payment-consent-agree-checkbox") }
    get bookAppointmentBtn() { return $("#book-appointment-button") }
    get bookingConfirmationModalPopup() { return $("//div[contains(@class,'modal-content card')]/div") }
    get bookingConfirmationPopupText() { return $("//div[@class='d-flex']//span") }
    get bookingConfirmPopupGoToDashbrdBtn() { return $("button=Go to Dashboard") }
    get userDashboardAllApointmentCards() { return $$("//div[contains(@class,'Appointment_appt_margin_xl__g4R3m')][1]") }

    async waitForProvidersToLoad() {
        await driver.waitUntil(async () => {
            const foundTimeSlotElems = await this.allSelectableProvidersTimeSlots
            return foundTimeSlotElems.length > 0 ? foundTimeSlotElems : false
        }, {
            timeout: 20000,
            timeoutMsg: 'No Providers were found after entering location'
        })
    }

    async waitForAppointmentsToLoad() {
        await driver.waitUntil(async () => {
            const allAppointments = await this.userDashboardAllApointmentCards
            return allAppointments.length > 0 ? allAppointments : false
        }, {
            timeout: 20000,
            timeoutMsg: 'No appointments were found'
        })
    }

}

module.exports = new BookNewAppointmentPage()