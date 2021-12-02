const fs = require('fs')
const moment = require('moment');
const appLandingPageObj = require('../../../pageObjects/landingPages/appLandingPage')
const loginPageObj = require('../../../pageObjects/login/loginPage')
const selectProvidersPageObj = require('../../../pageObjects/providers/selectProvidersPage')
const userConsentPageObj = require('../../../pageObjects/appointmentPages/userConsent&ConfirmationPage')
const payAndBookApptmtPageObj = require('../../../pageObjects/appointmentPages/payAndBookPage')
const userDashboardAppointmentsPageObj = require('../../../pageObjects/userDashboardPages/userAppointments')

describe('Existing user test suite',()=>{
    const userData = JSON.parse(fs.readFileSync("test/testData/bookAppointmentExistingUser.json"))
    var bookingTimeSlotFormat;

    before(async()=>{
        await driver.url('https://qa-thriveworks.vercel.app/app/providers')
        await driver.maximizeWindow()
    })

    xit('book appointment for existing user',async ()=>{
        console.log(await driver.getUrl());
        await appLandingPageObj.selectInitialLocationFromPopup(userData.locationSearchKeyword,userData.locationToSelect)
        await appLandingPageObj.clickOnLoginLink()
        await loginPageObj.loginUser(userData.userEmail,userData.userPassword)
        await selectProvidersPageObj.verifyUserLoginSuccess()
        await selectProvidersPageObj.waitForProvidersToLoad()
        await selectProvidersPageObj.setPaginationValue()
        const selectedTimeSlot = await selectProvidersPageObj.getProviderAndSelectTimeSlot(userData.providerToBeBookedName)
        bookingTimeSlotFormat = moment().add(1, 'days').format('ddd | MMM Do - ') + selectedTimeSlot.toUpperCase() + " IST"
        await userConsentPageObj.setPatientAppointmentInformation(userData.patientCounsellingType,userData.patientAppointmentMode,userData.appointmentFor)
        await userConsentPageObj.verifyPatientPersonalDetailsPopulated(userData.patientFirstName,userData.patientLastName,userData.patientEmail,userData.patientGender,userData.patientDOB,userData.relationshipWithPatient)
        await userConsentPageObj.verifyClientAgreementAndContinue()
        await payAndBookApptmtPageObj.clickOnPaymentConsentCheckboxAndBookApptment()
        await payAndBookApptmtPageObj.verifyBookingConfirmationPopup(userData.bookingConfirmationPopupText)
        await userDashboardAppointmentsPageObj.bookedProviderDetails(userData.providerToBeBookedName,bookingTimeSlotFormat)
    })

    xit("Check if Date filter works after booking an appointment for existing user",async ()=>{
        await appLandingPageObj.selectInitialLocationFromPopup(userData.locationSearchKeyword,userData.locationToSelect)
        await selectProvidersPageObj.verifyDateFilterWorking('Choose '+moment().add(1, 'days').format('dddd, MMMM Do, YYYY'),moment().add(1, 'days').format('ddd'),moment().add(1, 'days').format('MMM DD'),moment().format('ddd'),moment().format('MMM DD'))
        await driver.pause(5000)
    })

    it("Check if 'Appointment type' filter works after booking an appointment for existing user", async ()=>{
        
    })

})
