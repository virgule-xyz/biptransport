/* eslint-disable func-names */
/* eslint-disable no-undef */
import { splashname, version } from '../package.json';
import { TOUR_SAMPLE, COMMANDS_SAMPLE, COMMANDS_SAMPLE_ERROR } from '../src/webservices/shapes';

describe('Scene 4', () => {
  beforeAll(async function() {
    await device.launchApp({
      permissions: {
        calendar: 'YES',
        camera: 'YES',
        contacts: 'YES',
        health: 'YES',
        homekit: 'YES',
        location: 'inuse', // always|inuse|never|unset
        medialibrary: 'YES',
        microphone: 'YES',
        motion: 'YES',
        notifications: 'YES',
        photos: 'YES',
        reminders: 'YES',
        siri: 'YES',
        speech: 'YES',
      },
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

  it('Should select other waypoints', async () => {
    await element(by.id('ID_WPDASHBOARD_OTHERWP')).tap();
    await waitFor(element(by.id('ID_WPCOLLECTION')))
      .toBeVisible()
      .withTimeout(1000);
    await element(by.id('ID_WPCOLLECTION_LIST_ITEM_1483772')).tap();
    await expect(element(by.text('POINT DE PASSAGE 2/41'))).toBeVisible();
  });

  it('Should allow to say the waypoint has been accessed', async () => {
    await waitFor(element(by.id('ID_WPDASHBOARD_BUTTONS')))
      .toBeVisible()
      .withTimeout(500);
    await element(by.id('ID_WPDASHBOARD_BUTTONS_ARRIVED')).tap();

    await waitFor(element(by.text('Point de passage 2/41')))
      .toBeVisible()
      .withTimeout(500);
    await expect(element(by.text('Scannez le code barre du point de passage...'))).toBeVisible();
    await expect(element(by.id('ID_BARCODE_WP_MANUAL_BUTTON'))).toBeVisible();
    await element(by.id('ID_BARCODE_WP_MANUAL_BUTTON')).tap();
    await expect(element(by.id('ID_BARCODE_WP_MANUAL_DIALOG_INPUT'))).toBeVisible();
    await element(by.id('ID_BARCODE_WP_MANUAL_DIALOG_INPUT')).replaceText('00002814');
    await element(by.id('ID_BARCODE_WP_MANUAL_DIALOG_OK')).tap();
    await expect(element(by.text('Scannez le code barre du colis 1/2...'))).toBeVisible();
  });

  it('Should accept a barcode for a package to ship', async () => {
    await expect(element(by.text('Scannez le code barre du colis 1/2...'))).toBeVisible();
    await expect(element(by.id('ID_BARCODE_SHIP_MANUAL_BUTTON'))).toBeVisible();
    await element(by.id('ID_BARCODE_SHIP_MANUAL_BUTTON')).tap();
    await expect(element(by.id('ID_BARCODE_SHIP_MANUAL_DIALOG_INPUT'))).toBeVisible();
    await element(by.id('ID_BARCODE_SHIP_MANUAL_DIALOG_INPUT')).replaceText(
      '201483772012580281419050201002',
    );
    await element(by.id('ID_BARCODE_SHIP_MANUAL_DIALOG_OK')).tap();
    await expect(element(by.text('Scannez le code barre du colis 2/2...'))).toBeVisible();
    await element(by.id('ID_BARCODE_SHIP_MANUAL_BUTTON')).tap();
    await expect(element(by.id('ID_BARCODE_SHIP_MANUAL_DIALOG_INPUT'))).toBeVisible();
    await element(by.id('ID_BARCODE_SHIP_MANUAL_DIALOG_INPUT')).replaceText(
      '201483262014630481619050201002',
    );
    await element(by.id('ID_BARCODE_SHIP_MANUAL_DIALOG_OK')).tap();
  });
});
