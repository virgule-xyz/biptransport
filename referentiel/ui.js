export const ColorOrange = '#ff9800';
export const ColorBlack = '#333';
export const ColorGray = '#878787';
export const ColorLightGray = '#B2B2B2';
export const ButtonHeight = 44;
export const ButtonMargins = 10;
export const ButtonRadius = 3;
export const ButtonElevation = 4;
export const ButtonFontSize = 16;
export const TextFontSize = 16;
export const ButtonPadding = 30;
export const AlertTitle = 'AcciMoto';

/**
 * Les chaines utilisées dans l'application
 */
export const UIStrings = {
  fr: {
    oui: 'oui',
    non: 'non',
    changer: 'Nouvelle recherche',
    changerdepiece: 'Nouvelle recherche',
    annuler: 'Annuler',
    accueil: 'Changer de langue',
    ok: 'OK',
    code_barres: 'SCANNER LE CODE BARRE',
    next_step: 'Prendre des photos',
    permission_camera_title: "Demande d'autorisation",
    permission_camera_message: "Vous devez autoriser l'usage de la caméra",
    terminer: 'Terminer',
    question_effacer_piece: 'Effacer cette photo ?',
    nouvelle_photo: 'Nouvelle photo',
    les_photos_remontent: 'Les photos sont en cours de remontée vers les serveurs...',
    le_nombre_de_photos:
      'Le nombre de photos en cours de chargement vers les serveurs est systématiquement indiqué en bas à droite dans le rond bleu.',
    etesvoussur: 'Êtes-vous sûr ?',
    question_retour_piece: 'Voulez-vous sélectionner une autre pièce/moto ?',
    question_retour_home: 'Voulez-vous retourner au choix de langues ?',

    selection_de_la_piece: 'Sélection de la pièce',
    indiquer_numero_piece: 'Veuillez indiquer le numéro de la pièce :',
    selectionnez_une_piece_1: 'Sélectionnez la pièce pour laquelle vous allez prendre des photos.',
    selectionnez_une_piece_2: 'Entrez un numéro de pièce...',
    selectionnez_une_piece_3: 'ou',
    selectionnez_une_piece_4: 'Scannez le code barre...',
    selectionnez_une_piece_5: 'Nous recherchons la pièce...',
    selectionnez_une_piece_6: 'La pièce a bien été trouvée.',
    piece_inexistante: "Cette pièce n'existe pas !",

    selection_de_la_moto: 'Sélection de la moto',
    indiquer_numero_moto: 'Veuillez indiquer le numéro de la moto :',
    selectionnez_une_moto_1: 'Sélectionnez la moto pour laquelle vous allez prendre des photos.',
    selectionnez_une_moto_2: 'Entrez un numéro de moto...',
    selectionnez_une_moto_5: 'Nous recherchons la moto...',
    selectionnez_une_moto_6: 'La moto a bien été trouvée.',
    moto_inexistante: "Cette moto n'existe pas !",

    piece: 'Pièce',
    moto: 'Moto',
  },
  pl: {
    oui: 'tak',
    non: 'nie',
    changer: 'Zmiana',
    changerdepiece: 'Zmień Pokój',
    annuler: 'Anuluj',
    accueil: 'Zmień język',
    ok: 'Dobrze',
    code_barres: 'Zeskanuj kod kreskowy',
    next_step: 'Zrób zdjęcia',
    permission_camera_title: "Demande d'autorisation",
    permission_camera_message: "Vous devez autoriser l'usage de la caméra",
    terminer: 'Skończ',
    question_effacer_piece: 'Effacer cette photo ?',
    nouvelle_photo: 'Nouvelle photo',
    les_photos_remontent: 'Les photos sont en cours de remontée vers les serveurs...',
    le_nombre_de_photos:
      'Le nombre de photos en cours de chargement vers les serveurs est systématiquement indiqué en bas à droite dans le rond bleu.',
    etesvoussur: 'Êtes-vous sûr ?',
    question_retour_piece: 'Voulez-vous sélectionner une autre pièce/moto ?',
    question_retour_home: 'Voulez-vous retourner au choix de langues ?',

    selection_de_la_piece: 'Sélection de la pièce',
    indiquer_numero_piece: 'Veuillez indiquer le numéro de la pièce :',
    selectionnez_une_piece_1: 'Sélectionnez la pièce pour laquelle vous allez prendre des photos.',
    selectionnez_une_piece_2: 'Entrez un numéro de pièce...',
    selectionnez_une_piece_3: 'ou',
    selectionnez_une_piece_4: 'Scannez le code barre...',
    selectionnez_une_piece_5: 'Nous recherchons la pièce...',
    selectionnez_une_piece_6: 'La pièce a bien été trouvée.',
    piece_inexistante: "Cette pièce n'existe pas !",

    selection_de_la_moto: 'Sélection de la moto',
    indiquer_numero_moto: 'Veuillez indiquer le numéro de la moto :',
    selectionnez_une_moto_1: 'Sélectionnez la moto pour laquelle vous allez prendre des photos.',
    selectionnez_une_moto_2: 'Entrez un numéro de moto...',
    selectionnez_une_moto_5: 'Nous recherchons la moto...',
    selectionnez_une_moto_6: 'La moto a bien été trouvée.',
    moto_inexistante: "Cette moto n'existe pas !",
    piece: 'Pokojach',
    moto: 'Motocykl',
  },
};

class Language {
  constructor() {
    this.countryCode = 'fr';
    this.table = UIStrings.fr;
  }

  set country(code) {
    this.countryCode = code;
    this.table = UIStrings[code];
  }

  get country() {
    return this.countryCode;
  }

  sentence = code => this.table[code];
}

export const langue = new Language();
