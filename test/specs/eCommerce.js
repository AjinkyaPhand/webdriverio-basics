const chaiExpect = require('chai').expect
const loginPageObject = require('../pageObjects/loginPage')

describe('E-Commerce Test Suite', () => {
    it('Complete end-to-end test case', () => {
        browser.url('https://rahulshettyacademy.com/loginpagePractise/#')
        browser.maximizeWindow();

        // ============LOGIN===================
        loginPageObject.loginUser('rahulshettyacademy','learning')

        
        // ==========ADD ITEM===========
        const itemsList = ["Blackberry","Nokia Edge"]
        const allCardsDiv = $$("div[class='card h-100']")
        // const foundItem = allCardsDiv.filter(eachCard=>eachCard.$("h4").getText()==="Blackberry")
        // foundItem[0].$("button").click();
        allCardsDiv.filter(eachCard=>itemsList.includes(eachCard.$("h4").getText()))
        .map(foundCard=>foundCard.$("button").click())
        $("*=Checkout").click();


        // ==========CHECK PRICE EQUAL TO SUM============
        const prodPricesElem = $$("//tr/td[4]/strong");
        const sumPrice = prodPricesElem.map(eachProd=>parseInt(eachProd.getText().split(" ")[1].trim()))
        .reduce((acc,price)=>acc+price,0)
        chaiExpect(parseInt($('tbody tr:nth-child(3) td:nth-child(5) h3').getText().split(" ")[1].trim()),"Price are not equal").to.equal(sumPrice);
        $("button[class='btn btn-success']").click()


        // ==============Enter Address and validate success=================
        $("#country").setValue("india")
        $(".suggestions").waitForDisplayed()
        $("*=India").click();
        $("label[for='checkbox2']").click()
        $("input[type='submit']").click()
        $("div[class='alert alert-success alert-dismissible']").waitForDisplayed();
        chaiExpect($("div[class='alert alert-success alert-dismissible']").getText(),"Price are not equal").to.include("Thank you! Your order will be delivered in next few weeks");
        // browser.debug()
    })
})