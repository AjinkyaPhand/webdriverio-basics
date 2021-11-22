class LoginPage {
    get userNameFieldLocator() { return $("input[name='username']") }
    get passwordFiledLocator() { return $("input[name='password']") }
    get signInBtnLocator() { return $("#signInBtn") }
    get checkoutBtnLocator() { return $("*=Checkout") }

    loginUser(username, password) {
        this.userNameFieldLocator.setValue(username);
        this.passwordFiledLocator.setValue(password);
        this.signInBtnLocator.click();
        this.checkoutBtnLocator.waitForExist();
    }
}

module.exports = new LoginPage()