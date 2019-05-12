/* eslint-disable func-names */
/* eslint-disable no-undef */
import { splashname, version } from '../package.json';
import { TOUR_SAMPLE, COMMANDS_SAMPLE, COMMANDS_SAMPLE_ERROR } from '../src/webservices/shapes';

describe('Scene 1', () => {
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
  it('Should display the 1st waypoint', async () => {
    await expect(element(by.id('ID_WPDASHBOARD_ADDRESS'))).toBeVisible();
    await expect(element(by.id('ID_WPDASHBOARD_COUNTERS'))).toBeVisible();
    await expect(element(by.id('ID_WPDASHBOARD_DESC'))).toBeVisible();
    await expect(element(by.id('ID_WPDASHBOARD_BUTTONS'))).toBeVisible();
    await expect(element(by.id('ID_WPDASHBOARD_OTHERWP'))).toBeVisible();
    await expect(element(by.text(TOUR_SAMPLE.bordereau_code.toUpperCase()))).toBeVisible();
    await expect(element(by.text(TOUR_SAMPLE.bordereau_date.toUpperCase()))).toBeVisible();
    // await expect(element(by.text(TOUR_SAMPLE.chauffeur_nom.toUpperCase()))).toBeVisible();
    await expect(element(by.text('POINT DE PASSAGE 1/32'))).toBeVisible();
    await expect(element(by.text('Livraisons'))).toBeVisible();
    await expect(element(by.text('Enlèvements'))).toBeVisible();
    await expect(element(by.text("J'Y VAIS"))).toBeVisible();
    await expect(element(by.id('ID_WPDASHBOARD_BUTTONS_PICTURES'))).toBeVisible();
    await expect(element(by.text('AÏE'))).toBeVisible();
    await expect(element(by.text('ARRIVÉ !'))).toBeVisible();
  });

  it('Should allow to go to the map', async () => {
    await expect(element(by.id('ID_WPDASHBOARD_BUTTONS_LOCATION'))).toBeVisible();
  });

  it('Should display other waypoints', async () => {
    await expect(element(by.id('ID_WPDASHBOARD_OTHERWP'))).toBeVisible();
    await element(by.id('ID_WPDASHBOARD_OTHERWP')).tap();
    await waitFor(element(by.id('ID_WPCOLLECTION')))
      .toBeVisible()
      .withTimeout(1000);
    await expect(element(by.text('AUTRES POINTS DE PASSAGE...'))).toBeVisible();
    await expect(element(by.id('ID_WPCOLLECTION_LIST_ITEM_128914'))).toBeVisible();
    await expect(element(by.id('ID_WPCOLLECTION_LIST_ITEM_128934'))).toBeVisible();
    await element(by.id('ID_WPCOLLECTION_CLOSE')).tap();
  });

  it('Should select other waypoints', async () => {
    await element(by.id('ID_WPDASHBOARD_OTHERWP')).tap();
    await waitFor(element(by.id('ID_WPCOLLECTION')))
      .toBeVisible()
      .withTimeout(1000);
    await element(by.id('ID_WPCOLLECTION_LIST_ITEM_128934')).tap();
    await expect(element(by.text('POINT DE PASSAGE 2/32'))).toBeVisible();
  });
});
