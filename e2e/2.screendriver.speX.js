/* eslint-disable no-undef */

describe('Driver', () => {
  beforeEach(async () => {
    await device.launchApp({
      permissions: { camera: 'YES', photos: 'YES', microphone: 'YES' },
    });
    await element(by.text('NAVIGATOR')).tap();
    await element(by.text('Driver')).tap();
    await element(by.text('PREVIEW')).tap();
  });

  afterAll(async () => {
    await element(by.text('NAVIGATOR')).tap();
    await element(by.text('Driver')).tap();
  });

  describe('At start', () => {
    it('Should display the normal UI', async () => {
      // await device.takeScreenshot('Driver #1');
      await waitFor(element(by.text("Prendre des photos des points d'arrêts")))
        .tBeVisible()
        .withTimeout(500);
      await waitFor(element(by.text('Code de tournée')))
        .toBeVisible()
        .withTimeout(500);
      await waitFor(element(by.id('ID_BARCODE')))
        .toBeVisible()
        .withTimeout(500);
    });
  });

  // describe('Taping the manual input button', () => {
  //   describe('Writing RRR and validating', () => {
  //     it('Should return an error', async () => {
  //       await element(by.id('ID_BARCODE_MANUAL_BUTTON')).tap();
  //       await waitFor(element(by.id('ID_BARCODE_MANUAL_DIALOG_INPUT')))
  //         .toBeVisible()
  //         .withTimeout(500);
  //       await element(by.id('ID_BARCODE_MANUAL_DIALOG_INPUT')).replaceText('RRR');
  //       await element(by.id('ID_BARCODE_MANUAL_DIALOG_OK')).tap();
  //       await expect(element(by.id('ID_BARCODE_MANUAL_DIALOG_INPUT'))).toBeNotVisible();
  //       await expect(element(by.text('Mauvais code'))).toBeVisible();
  //       await element(by.text('OK')).tap();
  //     });
  //   });

  //   describe('Writing 123456 and validating', () => {
  //     it('Should return accept and go to next step', async () => {
  //       await element(by.id('ID_BARCODE_MANUAL_BUTTON')).tap();
  //       await waitFor(element(by.id('ID_BARCODE_MANUAL_DIALOG_INPUT')))
  //         .toBeVisible()
  //         .withTimeout(500);
  //       await element(by.id('ID_BARCODE_MANUAL_DIALOG_INPUT')).replaceText('123456');
  //       await element(by.id('ID_BARCODE_MANUAL_DIALOG_OK')).tap();
  //       await waitFor(element(by.id('ID_BARCODE_MANUAL_DIALOG_INPUT')))
  //         .toBeNotVisible()
  //         .withTimeout(500);
  //       await waitFor(element(by.id('ID_GSMCONFIRM_INPUT')))
  //         .toBeVisible()
  //         .withTimeout(1000);
  //     });
  //     describe('Setting a very short phone number', () => {
  //       it('Should not enable validating', async () => {
  //         await element(by.id('ID_GSMCONFIRM_INPUT')).replaceText('1');
  //         await element(by.id('ID_GSMCONFIRM_OK')).tap();
  //         await waitFor(element(by.id('ID_GSMCONFIRM_INPUT')))
  //           .toBeVisible()
  //           .withTimeout(500);
  //       });
  //     });
  //     describe('Setting a correct phone number', () => {
  //       it('Should enable validating and close window', async () => {
  //         await waitFor(element(by.id('ID_GSMCONFIRM_INPUT')))
  //           .toBeVisible()
  //           .withTimeout(500);
  //         await element(by.id('ID_GSMCONFIRM_INPUT')).replaceText('0695144942');
  //         await waitFor(element(by.id('ID_GSMCONFIRM_INPUT')))
  //           .toBeNotVisible()
  //           .withTimeout(1000);
  //         await element(by.id('ID_GSMCONFIRM_OK')).tap();
  //       });
  //     });
  //   });
  // });
});
