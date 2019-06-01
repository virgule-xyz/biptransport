/* eslint-disable func-names */
/* eslint-disable no-undef */
import { splashname, version } from '../package.json';
import { TOUR_SAMPLE, COMMANDS_SAMPLE, COMMANDS_SAMPLE_ERROR } from '../src/webservices/shapes';

describe('Scene 6', () => {
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

  // it('Should select other waypoints', async () => {
  //   await element(by.id('ID_WPDASHBOARD_OTHERWP')).tap();
  //   await waitFor(element(by.id('ID_WPCOLLECTION')))
  //     .toBeVisible()
  //     .withTimeout(1000);
  //   await element(by.id('ID_WPCOLLECTION_LIST_ITEM_1483772')).tap();
  //   await expect(element(by.text('POINT DE PASSAGE 2/41'))).toBeVisible();
  // });

  it('Should display packages to pick', async () => {
    await waitFor(element(by.id('ID_WPDASHBOARD_BUTTONS')))
      .toBeVisible()
      .withTimeout(500);
    await element(by.id('ID_WPDASHBOARD_BUTTONS_ARRIVED')).tap();

    await waitFor(element(by.text('Point de passage 1/41')))
      .toBeVisible()
      .withTimeout(500);
    await expect(element(by.text('Scannez le code barre du point de passage...'))).toBeVisible();
    await expect(element(by.id('ID_BARCODE_WP_MANUAL_BUTTON'))).toBeVisible();
    await element(by.id('ID_BARCODE_WP_MANUAL_BUTTON')).tap();
    await expect(element(by.id('ID_BARCODE_WP_MANUAL_DIALOG_INPUT'))).toBeVisible();
    await element(by.id('ID_BARCODE_WP_MANUAL_DIALOG_INPUT')).replaceText('00002814');
    await element(by.id('ID_BARCODE_WP_MANUAL_DIALOG_OK')).tap();
    await expect(element(by.text('Vous devez récupérer 1 colis'))).toBeVisible();
    await expect(element(by.text('Choisissez un nombre'))).toBeVisible();
  });

  it('Should allow to choose how many packages and an error message if wrong number', async () => {
    await element(by.text('Choisissez un nombre')).tap();
    await waitFor(element(by.text('Il y a 0 colis')))
      .toBeVisible()
      .withTimeout(500);
    await element(by.text('Il y a 0 colis')).tap();
    await waitFor(element(by.text('Attention, vous allez devoir prendre une photo...')))
      .toBeVisible()
      .withTimeout(500);
    await element(by.id('ID_BUTTON_PICKUP_VALIDATE')).tap();
    await waitFor(element(by.text('Prenez une photo des colis')))
      .toBeVisible()
      .withTimeout(500);
    await element(by.id('ID_TOUR_CAMERA_BUTTON')).tap();
    await waitFor(element(by.text('Confirmez la photo...')))
      .toBeVisible()
      .withTimeout(500);
    element(by.id('ID_TOUR_CAMERA_CONFIRM')).tap();
  });
});
