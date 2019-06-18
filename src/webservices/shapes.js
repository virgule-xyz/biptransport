/**
 * Copyright (c) netmize, Inc. and its affiliates.
 *
 * This source code is licensed under the Copyright License Agreement
 *
 */

import { shape, number, string, oneOf, oneOfType, bool, func, arrayOf } from 'prop-types';

// A barcode
export const BarcodeShape = string;

// A command attachment file
export const AttachmentShape = {
  file: string,
  type: string,
  extension: string,
  size: oneOfType([string, number]),
};

// A tour command
export const CommandShape = {
  id: oneOfType([string, number]),
  status: string,
  id_ord: string,
  id_pnt: oneOfType([string, number]),
  cab_pnt: arrayOf(BarcodeShape),
  domicile: bool,
  essai: bool,
  ord_difficile: bool,
  pnt_difficile: bool,
  nbr_liv: number,
  nbr_enl: number,
  ord_nom: string,
  pnt_nom: string,
  pnt_adr: string,
  pnt_cp: oneOfType(string, number),
  pnt_ville: string,
  pnt_lat: number,
  pnt_lng: number,
  observations: string,
  pnt_cles: oneOfType(string, number),
  pnt_trousseau: oneOfType(string, number),
  pnt_pj: arrayOf(AttachmentShape),
  cab_liv: arrayOf(BarcodeShape),
  cab_enl: arrayOf(BarcodeShape),
};

export const COMMANDS_SAMPLE = require('./commands.json');

export const COMMANDS_SAMPLE_ERROR = {
  err_no: '1',
  error: 'Erreur de code de tournée',
};

// In the waypoint listexport const WaypointList
export const WaypointListShape = {
  key: number,
  id: number,
  status: string,
  name: string,
  city: string,
  ord: string,
};

// The vehicle used to make the tour
export const VehicleShape = {
  vehicule_id: oneOfType([string, number]),
  vehicule_immat: string,
  vehicule_alerte: string,
};

export const VEHICLE_BARCODES = ['V0000017', 'V0000018', 'V0000019', 'V0000020', 'V0000021'];
export const VEHICLE_SAMPLE = require('./vehicle.json');

export const VEHICLE_SAMPLE_ERROR = {
  err_no: '1',
  error: 'Erreur de code de véhicule',
};

// The complete tour informations
export const TourShape = {
  bordereau_id: oneOfType([string, number]),
  bordereau_code: oneOfType([string, number]),
  bordereau_date: oneOfType([string, number]),
  chauffeur_id: oneOfType([string, number]),
  chauffeur_prenom: string,
  chauffeur_nom: string,
  chauffeur_portable: string,
};

export const TOUR_BARCODES = ['BT00249316', 'BT00249268', 'BT00249170', 'BT00249313'];
export const TOUR_SAMPLE = require('./tour.json');

export const TOUR_SAMPLE_ERROR = {
  err_no: '1',
  error: 'Erreur de code de tournée',
};

export const CompleteTourShape = {
  tour: TourShape,
  vehicle: VehicleShape,
  commands: arrayOf(CommandShape),
};

export const ConditionShape = {
  nom: string,
  id: number,
  photo: bool,
};

export const PassageShape = {
  num: number,
  bordereau_id: oneOfType([string, number]),
  chauffeur_id: oneOfType([string, number]),
  vehicule_id: oneOfType([string, number]),
  dt1: number,
  dt2: number,
  lat: number,
  lng: number,
  erreur: number,
  nb_liv: number,
  nb_enl: number,
  cb_liv: arrayOf(BarcodeShape),
  cb_enl: arrayOf(BarcodeShape),
  observations: string,
  photo_condition: string,
  photo_blocage: string,
  photo_enlevement: string,
};
