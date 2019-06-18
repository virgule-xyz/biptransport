/* eslint-disable func-names */
/* eslint-disable no-undef */
import { splashname, version } from '../package.json';
import { TOUR_SAMPLE, COMMANDS_SAMPLE, COMMANDS_SAMPLE_ERROR } from '../src/webservices/shapes';

describe('Scene Change GSM Number', () => {
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

  it('Should display the GSM number and allow to change it', async () => {
    await expect(element(by.id('ID_GSMCONFIRM_INPUT'))).toHaveText(TOUR_SAMPLE.chauffeur_portable);
    await element(by.id('ID_GSMCONFIRM_INPUT')).replaceText('06 46 53 76 10');
    await element(by.id('ID_GSMCONFIRM_OK')).tap();
  });

  it('Should display the car scanner and title CODE DE VEHICULE', async () => {
    await expect(element(by.text('CODE DE VÉHICULE'))).toBeVisible();
    await device.launchApp({ newInstance: true });
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

  it('Should display the GSM number and allow to change it', async () => {
    await expect(element(by.id('ID_GSMCONFIRM_INPUT'))).toHaveText(TOUR_SAMPLE.chauffeur_portable);
    await element(by.id('ID_GSMCONFIRM_INPUT')).replaceText(TOUR_SAMPLE.chauffeur_portable);
    await element(by.id('ID_GSMCONFIRM_OK')).tap();
  });

  it('Should display the car scanner and title CODE DE VEHICULE', async () => {
    await expect(element(by.text('CODE DE VÉHICULE'))).toBeVisible();
  });
});
