describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have signin screen', async () => {
    await expect(element(by.id('SignScreen'))).toExist();
  });
  it('cannot login', async () => {
    await element(by.id('LoginLoginFieldIdTextFieldInput')).replaceText('toto');
    await element(by.id('LoginLoginSubmitActionButtonTouchable')).tap();
    await expect(element(by.text('Votre identifiant Wafy'))).toBeVisible();
  });
  it('can login', async () => {
    await element(by.id('LoginLoginFieldIdTextFieldInput')).replaceText('001wa109');
    await element(by.id('LoginLoginFieldPasswordTextFieldInput')).replaceText('Tududed!59');
    await element(by.id('LoginLoginSubmitActionButtonTouchable')).tap();
    await expect(element(by.id('inventaire'))).toExist();
  });

  // it('should show hello screen after tap', async () => {
  //   await element(by.id('hello_button')).tap();
  //   await expect(element(by.text('Hello!!!'))).toBeVisible();
  // });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});
