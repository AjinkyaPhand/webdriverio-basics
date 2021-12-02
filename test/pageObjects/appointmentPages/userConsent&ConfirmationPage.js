const CommonBrowserUtils = require('../../utils/commonUtils')

class UserConsentAndConfirmationPage extends CommonBrowserUtils {

    get howWeMayHelpDropdownButton() { return $("//div[text()[contains(.,'How may we help?')]]/following-sibling::div//div[contains(@class,'react-select__value-container')]") }
    get howWeMayHelpDropdownMenuItem() { return "//div[contains(@class,'react-select__menu-list')]/div[text()='placeholderValue']" }
    get appointmentTypeDropdown() { return $("//div[text()[contains(.,'Appointment Type')]]/following-sibling::div//div[contains(@class,'react-select__value-container')]") }
    get appointmentTypeDropdownMenuItem() { return "//div[contains(@class,'react-select__menu-list')]/div[text()='placeholderValue']" }
    get appointmentForDropdownButton() { return $("//div[text()[contains(.,'Who is this appointment for?')]]/following-sibling::div//div[contains(@class,'react-select__value-container')]") }
    get appointmentForDropdownMenuitem() { return "//div[contains(@class,'react-select__menu-list')]/div[text()='placeholderValue']" }
    get patientFirstNameLabelField() { return $("//input[@aria-label='First Name' and contains(@name,'firstName')]/parent::div/preceding-sibling::div") }
    get patientFirstNameField() { return $("//input[@aria-label='First Name' and contains(@name,'firstName')]") }
    get patientLastNameField() { return $("//input[@aria-label='Last Name' and contains(@name,'lastName')]") }
    get patientEmailField() { return $("//input[@aria-label='Email Address' and contains(@name,'email')]") }
    get patientGenderField() { return $("//div[contains(text(),'Gender Identity')]/following-sibling::div") }
    get patientDOBField() { return $("//input[@aria-label='Date of Birth' and contains(@name,'dateOfBirth')]") }
    get patientRelationship() { return $("//div[contains(text(),'Relationship with Patient')]/following-sibling::div") }
    get clientAggrementCheckBox() { return $("//div[text()[contains(.,'Client Agreement')]]/following-sibling::div//input") }
    get continueButton() { return $("button=Continue") }

    async setPatientAppointmentInformation(counsellingType, appointmentMode, appointmentFor) {
        // ---Select How we may help option----
        await super.scrollToElemAndClick(this.howWeMayHelpDropdownButton)
        await driver.$(this.howWeMayHelpDropdownMenuItem.replace('placeholderValue',counsellingType)).click()

        // ----Select Appointment Type option---
        await this.appointmentTypeDropdown.click()
        await driver.$(this.appointmentTypeDropdownMenuItem.replace('placeholderValue',appointmentMode)).click()

        // ----Select Appointment For option---
        await this.appointmentForDropdownButton.click()
        await driver.$(this.appointmentForDropdownMenuitem.replace('placeholderValue',appointmentFor)).click()
    }

    async verifyPatientPersonalDetailsPopulated(fName,lName,email,gender,dob,relnshpWithPatient) {
        await this.patientFirstNameLabelField.scrollIntoView({block: "center"})
        await expect(this.patientFirstNameField).toHaveValue(fName)
        await expect(this.patientLastNameField).toHaveValue(lName)
        await expect(this.patientEmailField).toHaveValue(email)
        await expect(this.patientGenderField).toHaveTextContaining(gender)
        await expect(this.patientDOBField).toHaveValue(dob)
        await expect(this.patientRelationship).toHaveTextContaining(relnshpWithPatient)
    }

    async verifyClientAgreementAndContinue(){
        await this.clientAggrementCheckBox.scrollIntoView({block: "center"})
        await expect(this.clientAggrementCheckBox).toBeSelected()
        await super.scrollToElemAndClick(this.continueButton)
    }

}

module.exports = new UserConsentAndConfirmationPage()