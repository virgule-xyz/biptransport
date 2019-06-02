/* eslint-disable func-names */
/* eslint-disable no-undef */
import { splashname, version } from '../package.json';
import { TOUR_SAMPLE, COMMANDS_SAMPLE, COMMANDS_SAMPLE_ERROR } from '../src/webservices/shapes';

describe('Scene 0', () => {
  beforeAll(async function() {
    await device.launchApp({
      permissions: { camera: 'YES', photos: 'YES', microphone: 'YES' },
    });
  });

  it('Should display the splash with the version number', async () => {
    await element(by.id('ID_CONTINUE')).tap();
    await element(by.id('ID_BARCODE_MANUAL_BUTTON')).tap();
    await element(by.id('ID_BARCODE_MANUAL_DIALOG_INPUT')).replaceText('BT00249316');
    await element(by.id('ID_BARCODE_MANUAL_DIALOG_OK')).tap();
    await element(by.id('ID_GSMCONFIRM_OK')).tap();
    await element(by.id('ID_CARBARCODE_MANUAL_BUTTON')).tap();
    await element(by.id('ID_CARBARCODE_MANUAL_DIALOG_INPUT')).replaceText('V0000017');
    await element(by.id('ID_CARBARCODE_MANUAL_DIALOG_OK')).tap();
    await element(by.id('ID_CARRESUME_OK')).tap();
  });
});
