describe('My first test suite', () => {
    it('my first sync test case', () => {
        browser.url('https://rahulshettyacademy.com/loginpagePractise/#')
        browser.pause(1000);
        console.log(browser.getTitle());
        $("input[name='username']").setValue('test123');
        browser.pause(1000);
        $("input[type='password']").setValue("aaa");
        browser.pause(1000);
        $("#signInBtn").click();
        browser.pause(2000);
        const alertEle = $(".alert-danger")
        console.log(alertEle.getText());
        browser.pause(6000);
    }),
    xit('my first async test case', async () => {
        await browser.url('https://rahulshettyacademy.com/loginpagePractise/#')
        await browser.pause(1000);
        console.log(await browser.getTitle());
        const useranameField = await $("input[name='username']")
        useranameField.setValue('test123');
        await browser.pause(1000);
        const passwordField = await $("input[name='password']")
        passwordField.setValue('aaa');
        await browser.pause(1000);
        const signInBtn = await $("#signInBtn");
        signInBtn.click();
        await browser.pause(2000);
        const alertEle = $(".alert-danger")
        console.log(await alertEle.getText());
        await browser.pause(6000);
    })
})