/* eslint-disable no-undef */

describe('Splash', () => {
  beforeAll(async () => {
    await device.reloadReactNative();
    await element(by.text('NAVIGATOR')).tap();
    await element(by.text('Splash')).tap();
  });

  afterAll(async () => {
    await element(by.text('NAVIGATOR')).tap();
    await element(by.text('Splash')).tap();
  });

  describe('Splash', () => {
    it('Should display a big header', async () => {
      await device.reloadReactNative();

      await element(by.text('NAVIGATOR')).tap();
      await element(by.text('Splash')).tap();
      await expect(element(by.id('ID_BIGHEADER'))).toBeVisible();
    });

    it('Should display the title in the middle', async () => {
      await waitFor(element(by.text('Application BIP-LIV')))
        .toBeVisible()
        .withTimeout(500);
    });

    it('Should display the continue button', async () => {
      await expect(element(by.id('ID_CONTINUE'))).toBeVisible();
    });
  });
});
