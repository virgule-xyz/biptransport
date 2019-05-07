/* eslint-disable func-names */
/* eslint-disable no-undef */

describe('Storybook', () => {
  beforeAll(async function() {
    await device.reloadReactNative();
  });

  it('should be in storybook', async () => {
    await waitFor(element(by.text('NAVIGATOR')))
      .toBeVisible()
      .withTimeout(1000);
  });

  it('should have drawer after tap', async () => {
    await element(by.text('NAVIGATOR')).tap();
    await expect(element(by.text('Filter'))).toBeVisible();
  });
});
