/* eslint-disable func-names */
/* eslint-disable no-undef */
import { splashname, version } from '../package.json';
import { TOUR_SAMPLE, COMMANDS_SAMPLE, COMMANDS_SAMPLE_ERROR } from '../src/webservices/shapes';

describe('Scene 9', () => {
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
    await element(by.id('ID_CONTINUE')).tap();
  });

  it('Should display the driver scanner and title CODE DE TOURNEE', async () => {
    await element(by.id('ID_BARCODE_MANUAL_BUTTON')).tap();
    await element(by.id('ID_BARCODE_MANUAL_DIALOG_INPUT')).replaceText('BT00249316');
    await element(by.id('ID_BARCODE_MANUAL_DIALOG_OK')).tap();
  });
  it('Should display the GSM number', async () => {
    await element(by.id('ID_GSMCONFIRM_OK')).tap();
  });

  it('Should display the car scanner and title CODE DE VEHICULE', async () => {
    await element(by.id('ID_CARBARCODE_MANUAL_BUTTON')).tap();
    await element(by.id('ID_CARBARCODE_MANUAL_DIALOG_INPUT')).replaceText('V0000017');
    await element(by.id('ID_CARBARCODE_MANUAL_DIALOG_OK')).tap();
  });

  it('Should display the car resume', async () => {
    await element(by.id('ID_CARRESUME_OK')).tap();
  });

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
    await element(by.text('Il y a 1 colis')).tap();
    await element(by.id('ID_BUTTON_PICKUP_VALIDATE')).tap();
  });

  it('Let a comment and go to next waypoint', async () => {
    await element(by.id('ID_MAKE_COMMENT')).replaceText('This is a comment');
    await element(by.id('ID_NEXT_WAYPOINT_BUTTON')).tap();
    await waitFor(element(by.text('Point de passage 2/41')))
      .toBeVisible()
      .withTimeout(500);
  });
});
