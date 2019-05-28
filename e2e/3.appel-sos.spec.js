/* eslint-disable func-names */
/* eslint-disable no-undef */
import { splashname, version } from '../package.json';
import { TOUR_SAMPLE, COMMANDS_SAMPLE, COMMANDS_SAMPLE_ERROR } from '../src/webservices/shapes';

describe('Appel SOS aux managers', () => {
  beforeAll(async function() {
    await device.launchApp({
      permissions: { camera: 'YES', photos: 'YES', microphone: 'YES' },
    });
  });

  it('Should display the splash with the version number', async () => {
    const title = `${splashname}\n${version}`.toUpperCase();
    await expect(element(by.id('ID_TITLE'))).toBeVisible();
    await expect(element(by.id('ID_TITLE'))).toHaveText(title);
    await expect(element(by.id('ID_CONTINUE'))).toBeVisible();
    await element(by.id('ID_CONTINUE')).tap();
  });

  it('Should display the driver scanner and title CODE DE TOURNEE', async () => {
    await expect(element(by.text('CODE DE TOURNÉE'))).toBeVisible();
    await expect(element(by.id('ID_BARCODE'))).toBeVisible();
    await expect(element(by.id('ID_BARCODE_MANUAL_BUTTON'))).toBeVisible();
    await element(by.id('ID_BARCODE_MANUAL_BUTTON')).tap();
    await expect(element(by.id('ID_BARCODE_MANUAL_DIALOG_INPUT'))).toBeVisible();
    await element(by.id('ID_BARCODE_MANUAL_DIALOG_INPUT')).replaceText('BT00249316');
    await element(by.id('ID_BARCODE_MANUAL_DIALOG_OK')).tap();
  });
  it('Should display the GSM number', async () => {
    await expect(element(by.id('ID_GSMCONFIRM_INPUT'))).toHaveText(TOUR_SAMPLE.chauffeur_portable);
    await element(by.id('ID_GSMCONFIRM_OK')).tap();
  });

  it('Should display the car scanner and title CODE DE VEHICULE', async () => {
    await expect(element(by.text('CODE DE VÉHICULE'))).toBeVisible();
    await expect(element(by.id('ID_CARBARCODE'))).toBeVisible();
    await expect(element(by.id('ID_CARBARCODE_MANUAL_BUTTON'))).toBeVisible();
    await element(by.id('ID_CARBARCODE_MANUAL_BUTTON')).tap();
    await expect(element(by.id('ID_CARBARCODE_MANUAL_DIALOG_INPUT'))).toBeVisible();
    await element(by.id('ID_CARBARCODE_MANUAL_DIALOG_INPUT')).replaceText('V0000017');
    await element(by.id('ID_CARBARCODE_MANUAL_DIALOG_OK')).tap();
  });

  it('Should display the car resume', async () => {
    await expect(element(by.id('ID_CARRESUME_TITLE'))).toBeVisible();
    await element(by.id('ID_CARRESUME_OK')).tap();
  });

  it('Should have a SOS button', async () => {
    await waitFor(element(by.id('ID_BUTTON_SOS')))
      .toBeVisible()
      .withTimeout(500);
    expect(element(by.id('ID_BUTTON_SOS'))).toBeVisible();
    element(by.id('ID_BUTTON_SOS')).tap();
    await waitFor(element(by.text('Voulez-vous envoyer une alerte à vos responsables ?')))
      .toBeVisible()
      .withTimeout(500);
    element(by.text('Oui')).tap();
  });

  // it('Should send a SMS top all managers', async () => {
  //   await waitFor(element(by.text("Un message vient d'être envoyé à vos responsables")))
  //     .toBeVisible()
  //     .withTimeout(1000);
  //   // await expect(
  //   //   element(by.text("Un message vient d'être envoyé à vos responsables")),
  //   // ).toBeVisible();
  //   // await waitFor(element(by.text('Ok')))
  //   //   .toBeVisible()
  //   //   .withTimeout(500);
  //   // element(by.text('Ok')).tap();
  // });
});
