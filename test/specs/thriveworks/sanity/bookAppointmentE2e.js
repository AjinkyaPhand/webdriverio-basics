const fs = require('fs');
const bookNewAppointmentPageObject = require('../../../pageObjects/bookAppointmentNewUser')
var moment = require('moment');

describe("Sanity Test Suite", () => {
    var userTestData;
    var bookingTimeSlotFormat_1,bookingTimeSlotFormat_2;

    before(async () => {
        // ====Get the test data from external source and initialize some variables====
        userTestData = JSON.parse(fs.readFileSync('test/testData/bookAppointmentNewUserData.json'))
        bookingTimeSlotFormat_1 = moment().add(1, 'days').format('ddd | MMM Do — ') + userTestData.appointmentTimeSlot.toUpperCase() + " IST"
        bookingTimeSlotFormat_2 = moment().add(1, 'days').format('ddd | MMM Do - ') + userTestData.appointmentTimeSlot.toUpperCase() + " IST"
    })

    beforeEach(async () => {
        await driver.url('https://qa-thriveworks.vercel.app/app/providers')
        await driver.maximizeWindow()
    })

    it("Book apointment for new user", async () => {

        // ===========Select location when URL visited for first time============
        await bookNewAppointmentPageObject.locationModalInputField.setValue(userTestData.userLocationSearchKeyword)
        const autoSuggestedLocationDropdownItems = await driver.waitUntil(async () => {
            const allLocations = await bookNewAppointmentPageObject.locationModalInputSuggestions
            return allLocations.length > 0 ? allLocations : false
        }, {
            timeoutMsg: 'No Locations were found'
        })
        for (let eachLocation of autoSuggestedLocationDropdownItems) {
            if (await eachLocation.getText() === userTestData.userLocationToSelect) {
                await eachLocation.click()
                break
            }
        }
        await bookNewAppointmentPageObject.locationModalViewProvidersBtn.waitForClickable()
        await bookNewAppointmentPageObject.locationModalViewProvidersBtn.click()


        // =========Wait for providers to load completely after providing location===========
        await bookNewAppointmentPageObject.waitForProvidersToLoad()


        // ------DELETE THIS PART------
        // await $("=Login").click()
        // await $("#email").setValue("ajinkya@nomail.com")
        // await $("#password").setValue("Test@123")
        // await $("#btn-login").click()
        // ----------------------------------

        // // ===========Signup new User===========
        await bookNewAppointmentPageObject.signUpLink.click()
        await bookNewAppointmentPageObject.signUpEmailInputField.setValue(userTestData.userEmail)
        await bookNewAppointmentPageObject.signUpEmailPasswordField.setValue(userTestData.userPassword)
        await bookNewAppointmentPageObject.signUpButton.click()


        // // =========Wait for providers to load completely after new user sign up===========
        await bookNewAppointmentPageObject.waitForProvidersToLoad()

        // // ========Check if Dashboard link available after signup===========
        await expect(bookNewAppointmentPageObject.userDashboardLink).toBeClickable()


        // // ===Get all visible providers card and select one to book an appointment as provided (here 'Karen Allen')===
        // ----Set Paginatin to 30------
        await bookNewAppointmentPageObject.paginationDropdownButton.click()
        await bookNewAppointmentPageObject.paginationSelectValue.click()
        await bookNewAppointmentPageObject.waitForProvidersToLoad()

        // // ----Select Provider----
        let matchedProviderCard = null
        for (let eachProviderCard of await bookNewAppointmentPageObject.allVisibleProvidersCards) {
            const tempProviderString = await eachProviderCard.$(bookNewAppointmentPageObject.singleProviderCardFromAllCards).getText()
            if (tempProviderString.includes(userTestData.providerToBeBookedName)) {
                matchedProviderCard = eachProviderCard
                break
            }
        }

        // Get (only those which can be selected) next day slots 
        // Select time-slot as provided as an argument 
        await matchedProviderCard.scrollIntoView()
        for (let eachTimeSlot of await matchedProviderCard.$$(bookNewAppointmentPageObject.nextDayAvailableSlotsForProvider)) {
            if (await eachTimeSlot.getText() === userTestData.appointmentTimeSlot) {
                await eachTimeSlot.click()
                break
            }
        }
        await matchedProviderCard.$(bookNewAppointmentPageObject.bookAppointmentBtnForProvider).scrollIntoView()
        await matchedProviderCard.$(bookNewAppointmentPageObject.bookAppointmentBtnForProvider).waitForClickable()
        await matchedProviderCard.$(bookNewAppointmentPageObject.bookAppointmentBtnForProvider).click()


        // // =======Check if time slot selected is correctly for correct provider===========
        await bookNewAppointmentPageObject.providerPreviewCard.waitForDisplayed()
        await expect(bookNewAppointmentPageObject.providerPreviewCard).toHaveTextContaining(userTestData.providerToBeBookedName)
        await expect(bookNewAppointmentPageObject.providerPreviewCard).toHaveTextContaining(bookingTimeSlotFormat_1)


        // //=======Confirmation and consent page=========
        // ---Select How we may help option----
        await bookNewAppointmentPageObject.howWeMayHelpDropdownButton.scrollIntoView()
        await bookNewAppointmentPageObject.howWeMayHelpDropdownButton.click()
        await bookNewAppointmentPageObject.howWeMayHelpDropdownMenuItem.click()

        // ----Select Appointment Type option---
        await bookNewAppointmentPageObject.appointmentTypeDropdown.click()
        await bookNewAppointmentPageObject.appointmentTypeDropdownMenuItem.click()


        // // ------DELETE THIS PART------
        // // await $("button=Add new Patient").click()
        // await bookNewAppointmentPageObject.appointmentForDropdownButton.click()
        // await bookNewAppointmentPageObject.appointmentForDropdownMenuitem.click()
        // // ----------------

        // ========Patient Information=========
        await bookNewAppointmentPageObject.patientFirstNameField.scrollIntoView()
        await bookNewAppointmentPageObject.patientFirstNameField.setValue(userTestData.patientFirstName)
        await bookNewAppointmentPageObject.patientLastNameField.setValue(userTestData.patientLastName)
        await bookNewAppointmentPageObject.patientEmailField.setValue(userTestData.patientEmail)
        await bookNewAppointmentPageObject.patientGenderDropdownButton.click()
        await bookNewAppointmentPageObject.patientGenderDropdownMenuItem.click()
        await bookNewAppointmentPageObject.patientDOBField.setValue(userTestData.patientDOB)
        await bookNewAppointmentPageObject.patientRelationshipDropdownButton.click()
        await bookNewAppointmentPageObject.patientRelationshipDropdownMenuItem.click()
        await bookNewAppointmentPageObject.patientPhoneNumber.setValue(userTestData.patientPhoneNumber)


        // ========Client Aggrement=========
        await bookNewAppointmentPageObject.clientAggrementCheckBox.scrollIntoView()
        await bookNewAppointmentPageObject.clientAggrementCheckBox.click()
        await bookNewAppointmentPageObject.acknowledgementText.waitForDisplayed()
        await bookNewAppointmentPageObject.acknowledgementText.scrollIntoView()
        await bookNewAppointmentPageObject.ackIAgreeButton.waitForClickable()
        await bookNewAppointmentPageObject.ackIAgreeButton.click()
        await bookNewAppointmentPageObject.continueButton.waitForClickable()
        await bookNewAppointmentPageObject.continueButton.click()

        // // =======Pay & Book=========
        await bookNewAppointmentPageObject.preBillingInfoText.waitForDisplayed()
        await bookNewAppointmentPageObject.billingInformationPatientFirstNameField.scrollIntoView()
        await bookNewAppointmentPageObject.billingInformationPatientFirstNameField.setValue(userTestData.billingInfoFirstName)
        await bookNewAppointmentPageObject.billingInformationPatientLastNameField.setValue(userTestData.billingInfoLastName)

        // -----Enter Address line 1-----
        await bookNewAppointmentPageObject.billingInfoAddressLine1.setValue(userTestData.billingInfoAddressLine1)
        const autoSuggestedAddressDropdownItems = await driver.waitUntil(async () => {
            const allAddresses = await bookNewAppointmentPageObject.billingInfoAddressSuggestions
            return allAddresses.length > 0 ? allAddresses : false
        }, {
            timeoutMsg: 'No Addresses were found'
        })
        for (let eachAddress of autoSuggestedAddressDropdownItems) {
            if (await eachAddress.getText() === userTestData.billingInfoAddressToSelect) {
                await eachAddress.click()
                break
            }
        }
        // ------Check if other values are populated---------
        await driver.pause(950)
        await expect(bookNewAppointmentPageObject.billingInfoCity).not.toHaveValue('')
        await expect(bookNewAppointmentPageObject.billingInfoState).not.toHaveValue('')
        await expect(bookNewAppointmentPageObject.billingInfoCountry).not.toHaveValue('')
        await expect(bookNewAppointmentPageObject.billingInfoZipCode).not.toHaveValue('')

        // ------Enter card information--------
        await driver.switchToFrame(await bookNewAppointmentPageObject.billingInfoCardNumbIframe)
        await bookNewAppointmentPageObject.billingInfoCardNumbInputField.setValue(userTestData.billingInfoCardNumber)
        await driver.switchToFrame(null)
        await driver.switchToFrame(await bookNewAppointmentPageObject.billingInfoCardExpiryIframe)
        await bookNewAppointmentPageObject.billingInfoCardExpiryInputField.setValue(userTestData.billingInfoCardExpiry)
        await driver.switchToFrame(null)
        await driver.switchToFrame(await bookNewAppointmentPageObject.billingInfoCardCVCIframe)
        await bookNewAppointmentPageObject.billingInfoCardCVCInputField.setValue(userTestData.billingInfoCardCVC)
        await driver.switchToFrame(null)
        await bookNewAppointmentPageObject.paymentConsentAgreeChkbox.scrollIntoView()
        await bookNewAppointmentPageObject.paymentConsentAgreeChkbox.click()
        await bookNewAppointmentPageObject.bookAppointmentBtn.waitForClickable()
        await bookNewAppointmentPageObject.bookAppointmentBtn.click()

        // ----Verify booking confirmation popup text-----
        await bookNewAppointmentPageObject.bookingConfirmationModalPopup.waitForDisplayed()
        await expect(bookNewAppointmentPageObject.bookingConfirmationPopupText).toHaveText(userTestData.bookingConfirmationPopupText)

        // -----Go to dashboard and verify appointment details
        await bookNewAppointmentPageObject.bookingConfirmPopupGoToDashbrdBtn.scrollIntoView()
        await bookNewAppointmentPageObject.bookingConfirmPopupGoToDashbrdBtn.click()

        // --DELE THIS----
        // await bookNewAppointmentPageObject.userDashboardLink.click()
        // ---------------

        //-----latest booked appointment will always be at 0th index----
        await bookNewAppointmentPageObject.waitForAppointmentsToLoad()
        await expect(await bookNewAppointmentPageObject.userDashboardAllApointmentCards[0]).toHaveTextContaining(userTestData.providerToBeBookedName)
        await expect(await bookNewAppointmentPageObject.userDashboardAllApointmentCards[0]).toHaveTextContaining(bookingTimeSlotFormat_2)
        await driver.pause(3000)
    })


})