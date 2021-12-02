const fs = require('fs');
const bookNewAppointmentPageObject = require('../../../pageObjects/other/bookAppointmentNewUser')
const moment = require('moment');

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

        await bookNewAppointmentPageObject.selectInitialLocatioFromPopup()
        await bookNewAppointmentPageObject.waitForProvidersToLoad()

        // ------DELETE THIS PART------
        // await $("=Login").click()
        // await $("#email").setValue("ajinkya@nomail.com")
        // await $("#password").setValue("Test@123")
        // await $("#btn-login").click()
        // ----------------------------------

        await bookNewAppointmentPageObject.signUpNewUser(userTestData.userEmail,userTestData.userPassword)
        await bookNewAppointmentPageObject.waitForProvidersToLoad()
        await bookNewAppointmentPageObject.expectElemToBeClickable(bookNewAppointmentPageObject.userDashboardLink)


        // ===Get all visible providers card and select one to book an appointment as provided (here 'Karen Allen')===
        // ----Set Pagination to 30------
        await bookNewAppointmentPageObject.setPaginationValue()
        await bookNewAppointmentPageObject.getProviderAndSelectTimeSlot()
        

        // =======Check if time slot selected is correctly for correct provider===========
        await bookNewAppointmentPageObject.verifySelectedProvidersAppointmentDetails(userTestData.providerToBeBookedName,bookingTimeSlotFormat_1)


        //=======Confirmation and consent page=========
        await bookNewAppointmentPageObject.getPatientConsentAndConfirmation()

        await driver.pause(60000)

        // =======Pay & Book=========
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