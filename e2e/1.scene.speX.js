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

  it('Should display the manager window', async () => {
    await element(by.id('ID_MANAGERS_SCREEN')).tap();
    await waitFor(element(by.text('Vos responsables')))
      .toBeVisible()
      .withTimeout(500);
    await element(by.id('ID_MANAGERS_CLOSE_SCREEN')).tap();
  });

  it('Should display the 1st waypoint', async () => {
    await expect(element(by.id('ID_WPDASHBOARD_ADDRESS'))).toBeVisible();
    await expect(element(by.id('ID_WPDASHBOARD_COUNTERS'))).toBeVisible();
    await expect(element(by.id('ID_WPDASHBOARD_DESC'))).toExist();
    await expect(element(by.id('ID_WPDASHBOARD_BUTTONS'))).toBeVisible();
    await expect(element(by.id('ID_WPDASHBOARD_OTHERWP'))).toBeVisible();
    await expect(element(by.text(TOUR_SAMPLE.bordereau_code.toUpperCase()))).toBeVisible();
    await expect(element(by.text(TOUR_SAMPLE.bordereau_date.toUpperCase()))).toBeVisible();
    // await expect(element(by.text(TOUR_SAMPLE.chauffeur_nom.toUpperCase()))).toBeVisible();
    await expect(element(by.text('POINT DE PASSAGE 1/41'))).toBeVisible();
    await expect(element(by.text('Livraisons'))).toBeVisible();
    await expect(element(by.text('Enlèvements'))).toBeVisible();
    await expect(element(by.text("J'Y VAIS"))).toBeVisible();
    await expect(element(by.id('ID_WPDASHBOARD_BUTTONS_PICTURES'))).toBeVisible();
    await expect(element(by.text('ARRÊTÉ'))).toBeVisible();
    await expect(element(by.text('ARRIVÉ !'))).toBeVisible();
  });

  // // // it('Should allow to go to the map', async () => {
  // // //   await expect(element(by.id('ID_WPDASHBOARD_BUTTONS_LOCATION'))).toBeVisible();
  // // // });

  it('Should display other waypoints', async () => {
    await expect(element(by.id('ID_WPDASHBOARD_OTHERWP'))).toBeVisible();
    await element(by.id('ID_WPDASHBOARD_OTHERWP')).tap();
    await waitFor(element(by.id('ID_WPCOLLECTION')))
      .toBeVisible()
      .withTimeout(1000);
    await expect(element(by.text('AUTRES POINTS DE PASSAGE...'))).toBeVisible();
    await expect(element(by.id('ID_WPCOLLECTION_LIST_ITEM_1482698'))).toBeVisible();
    await expect(element(by.id('ID_WPCOLLECTION_LIST_ITEM_1483772'))).toBeVisible();
    await element(by.id('ID_WPCOLLECTION_CLOSE')).tap();
  });

  it('Should select other waypoints', async () => {
    await element(by.id('ID_WPDASHBOARD_OTHERWP')).tap();
    await waitFor(element(by.id('ID_WPCOLLECTION')))
      .toBeVisible()
      .withTimeout(1000);
    await element(by.id('ID_WPCOLLECTION_LIST_ITEM_1483772')).tap();
    await expect(element(by.text('POINT DE PASSAGE 2/41'))).toBeVisible();
    await element(by.id('ID_WPDASHBOARD_BUTTONS_AIE')).tap();
    await waitFor(element(by.text('POINT DE PASSAGE 2/41')))
      .toBeVisible()
      .withTimeout(500);
    await element(by.id('ID_BADCONDITIONS_CANCEL')).tap();
    await element(by.text("Quitter l'écran")).tap();
    await waitFor(element(by.id('ID_WPDASHBOARD_OTHERWP')))
      .toBeVisible()
      .withTimeout(500);
    await element(by.id('ID_WPDASHBOARD_OTHERWP')).tap();
    await waitFor(element(by.id('ID_WPCOLLECTION')))
      .toBeVisible()
      .withTimeout(1000);
    await element(by.id('ID_WPCOLLECTION_LIST_ITEM_1482698')).tap();
  });

  it('Should allow to say the waypoint cannot be accessed and take a picture', async () => {
    await waitFor(element(by.id('ID_WPDASHBOARD_BUTTONS')))
      .toBeVisible()
      .withTimeout(500);
    await element(by.id('ID_WPDASHBOARD_BUTTONS_AIE')).tap();
    await waitFor(element(by.text('Point de passage 1/41')))
      .toBeVisible()
      .withTimeout(500);
    await expect(
      element(by.text("Impossible d'arriver sur ce point, merci d'indiquer la raison...")),
    ).toBeVisible();
    // test 3 boutons
    await expect(element(by.text('Conditions climatiques'))).toBeVisible();
    await element(by.text('Conditions climatiques')).tap();
    await waitFor(element(by.text('Conditions climatiques')))
      .toBeVisible()
      .withTimeout(500);
    await element(by.id('ID_TOUR_CAMERA_BUTTON')).tap();
    await waitFor(element(by.text('Conditions climatiques')))
      .toBeVisible()
      .withTimeout(500);
    element(by.id('ID_TOUR_CAMERA_CONFIRM')).tap();
    await waitFor(element(by.text('Point de passage 1/41')))
      .toBeVisible()
      .withTimeout(500);
    expect(element(by.text('Laissez un commentaire'))).toBeVisible();
    await element(by.id('ID_NEXT_WAYPOINT_BUTTON')).tap();
    await waitFor(element(by.text('Point de passage')))
      .toBeVisible()
      .withTimeout(500);
    await expect(element(by.text('Point de passage 2/41'))).toBeVisible();
  });
  it('Should allow to say the waypoint cannot be accessed without picture', async () => {
    // tap arrêté
    // test text point de passage 2/41
    // test impossible arriver sur ce point
    // test 3 boutons
    // taper sur le 3
    // test"Problème de code d'accès"
    // test text point de passage 2/41
    // test"laisser un commentaire
  });
  it('Should allow to say the waypoint has been accessed', async () => {
    // tap arrivé
    // test text point de passage 3/41
    // test scannez le code barre du point de passage...
    // taper saisir
    // entrer 00003996
  });
});
