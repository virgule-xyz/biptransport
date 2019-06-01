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

export const DEFAULT_FONT_SIZE = 15;

export const COLORS = {
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
};

export const ColorsByNumber = num => {
  if (num > 5) return COLORS.RED;
  if (num > 3) return COLORS.ORANGE;
  if (num > 0) return COLORS.YELLOW;
  if (num === 0) return COLORS.GREEN;
  return COLORS.RED;
};
