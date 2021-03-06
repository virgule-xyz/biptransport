export { default as CBadge } from './badge';
export { default as CBarCodeReader } from './barcodereader';
export { default as CBigHeader } from './bigheader';
export { default as CButton } from './button';
export { default as CCamera } from './camera';
export { default as CContent } from './content';
export { default as CError } from './error';
export { default as CGreyBox } from './greybox';
export { default as CIcon } from './icon';
export { default as CImage } from './image';
export { default as CInfo } from './info';
export { default as CInput } from './input';
export { default as CMiniHeader } from './miniheader';
export { default as CModal } from './modal';
export { default as CRescueButton } from './rescuebutton';
export { default as CSep } from './sep';
export { default as CSpace } from './space';
export { default as CSpinner } from './spinner';
export { default as CText } from './text';
export { default as CTextInput } from './textinput';
export { default as CTitle } from './title';
export { default as CWaypointAddress } from './wpaddress';
export { default as CWaypointButtons } from './wpbuttons';
export { default as CWaypointCounters } from './wpcounters';
export { default as CWaypointOtherPassage } from './wpotherpassage';
export { default as CWaypointTemplate } from './wptemplate';

export { default as useMovieDownload } from './usemoviedownload';

export const DEFAULT_FONT_SIZE = 15;
export const SPACE_HEIGHT = 20;
export const PICTURE_REPORT = 4 / 3;
export const BASE_WIDTH = 380;
export const LOGO_REPORT = BASE_WIDTH / 1024;
export const PICTURE_WIDTH = 4096;
export const ICON_TYPE = 'EvilIcons';
export const ICON_COLOR = '#ffffff';
export const RESCUE_PADDING = DEFAULT_FONT_SIZE / 5;
export const RESCUE_BUTTON_SIZE = Math.ceil(DEFAULT_FONT_SIZE * 2.3);

export const COLORS = {
  BACKGROUND: '#ffffff',
  WHITE: '#ffffff',
  BLACK: '#333333',
  GREEN: '#8bc34a',
  YELLOW: '#ffdd33',
  DANGER: '#e33',
  ORANGE: '#e93',
  RED: '#e33',
  SEP: '#999999',
  GREY: '#f0f0f0',
  PHOTOS: '#01bcd4',
  JYVAIS: '#2196f3',
  AIE: '#ff9800',
  ARRIVE: '#8bc34a',
  ROW_EVEN: '#d0d0d0',
  ROW_PAIR: '#f0f0f0',
  PRIMARY: '#007aff',
  SPINNER: '#3333aa',
};

export const ColorsByNumber = num => {
  if (num > 5) return COLORS.RED;
  if (num > 3) return COLORS.ORANGE;
  if (num > 0) return COLORS.YELLOW;
  if (num === 0) return COLORS.GREEN;
  return COLORS.RED;
};

export const FrontColorsByNumber = num => {
  if (num > 5) return COLORS.WHITE;
  if (num > 3) return COLORS.BLACK;
  if (num > 0) return COLORS.BLACK;
  if (num === 0) return COLORS.BLACK;
  return COLORS.WHITE;
};
