class LoginPage {

    get userNameFieldLocator() { return $("#email") }
    get passwordFiledLocator() { return $("#password") }
    get signInBtnLocator() { return $("#btn-login") }

    async loginUser(username, password) {
        await this.userNameFieldLocator.setValue(username);
        await this.passwordFiledLocator.setValue(password);
        await this.signInBtnLocator.click();
    }
}

module.exports = new LoginPage()