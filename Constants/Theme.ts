// theme.ts

import { moderateScale } from 'react-native-size-matters';

// Font family definitions
export const FontFamily = {
  bold: 'Poppins-Bold',
  semibold: 'Poppins-SemiBold',
  medium: 'Poppins-Medium',
  regular: 'Poppins-Regular',
  thin: 'Poppins-Thin',
};

// Color palette
export const colors = {
  primary100: '#2E2C5F',
  primary80: '#524DA0',
  primary60: '#736DDF',
  primary40: '#A09BFF',
  primary20: '#DCDAFF',
  primary10: '#F2F0FF',
  primary5: '#F9F8FF',
  primaryLight: '#E5E5E5',
  primaryLigher: '#D4D4D4',
  primaryLightest: '#C4C4C4',
  primaryDark: '#1A1A3D',

  secondary100: '#484A22',
  secondary80: '#858945',
  secondary60: '#D9DF6D',
  secondary40: '#F8FCA1',
  secondary20: '#FDFFD4',

  neutral100: '#131218',
  neutral90: '#1D1C25',
  neutral80: '#272631',
  neutral70: '#343341',
  neutral60: '#3E3D4D',
  neutral50: '#53526A',
  neutral40: '#757494',
  neutral30: '#9C9AC1',
  neutral20: '#CBC9EF',
  neutral10: '#E8E7FF',

  text: '#FFFFFF',
  textLight: '#E5E5E5',
  textLighter: '#D4D4D4',
  textDark: '#1A1A3D',
  textSecondary: '#BFBFC7',
  white: '#FFFFFF',
  black: '#222222',

  error: '#E7002A',
  errorLight: '#FDEDED',
  errorDark: '#B8001F',

  success: '#3EC55F',
  successLight: '#E8F9E6',
  successDark: '#2A8B3F',
  warning: '#FECB2F',
  info: '#157EFB',
};

// Theme object
export const fontSizes = {
    xxl: moderateScale(32),
    xl: moderateScale(28),
    lg: moderateScale(24),
    md: moderateScale(20),
    body: moderateScale(17),
    sm: moderateScale(14),
    xs: moderateScale(12),
    xxs: moderateScale(10),
    xxxs: moderateScale(8),
  };

  export const spacing = {
    none: 0,
    xxs: moderateScale(4),
    xs: moderateScale(8),
    sm: moderateScale(12),
    md: moderateScale(16),
    lg: moderateScale(24),
    xl: moderateScale(32),
  };

  export const spacingX = {
    xs: moderateScale(8),
    sm: moderateScale(12),
    md: moderateScale(16),
    lg: moderateScale(24),
  };

  export const spacingY = {
    xs: moderateScale(8),
    sm: moderateScale(12),
    md: moderateScale(16),
    lg: moderateScale(24),
  };

export const radius = {
    xs: moderateScale(4),
    sm: moderateScale(8),
    md: moderateScale(12),
    lg: moderateScale(16),
    xl: moderateScale(24),
    pill: 9999,
    circle: 50,
  };