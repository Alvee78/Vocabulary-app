import { ReactNode } from 'react';
import { GestureResponderEvent, ImageSourcePropType, TextInput, TextInputProps, TextProps, TouchableOpacityProps, ViewStyle } from 'react-native';
import { TextStyle } from 'react-native-size-matters';
export type ScreenWrapperProps = {
  children: ReactNode;
  style?: ViewStyle;
};
export type TypographyProps = {
  children: ReactNode;
  style?: ViewStyle;
  color?: string;
  size?: number;
  fontWeight?: TextStyle['fontWeight'];
  textProps?: TextProps;
};

export interface ButtonProps extends TouchableOpacityProps {
  style?: ViewStyle;
  onPress?: () => void;
  loading?: boolean;
  children: ReactNode;
};

export type BackButtonProps = {
  style?: ViewStyle;
  iconSize?: number;
};

export interface InputProps extends TextInputProps {
  icon?: ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextInputProps['style'];
  inputRef?: React.RefObject<TextInput>;
  label?: string;
  error?: string;
  success?: string;
};
export type optProps = {
  username: string;
  email: string;
  password: string;
}

export type ChapterProgressBarProps = {
  chapterName: string;
  percentage: number;
};
export type ChapterCardProps = {
  title: string;
  descriptions: string;
  unlocked: boolean;
  percentage?: number;
  onPress?: (event: GestureResponderEvent) => void;
  image?: string | ImageSourcePropType;
};
export type Theme = 'light' | 'dark';
export interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}