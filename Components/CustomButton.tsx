import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function CustomButton({ title, onPress, variant = 'primary', style }: any) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const themedStyles = getThemedStyles(isDark);

  return (
    <TouchableOpacity
      style={[
        themedStyles.button,
        variant === 'secondary' && themedStyles.secondaryButton,
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          themedStyles.buttonText,
          variant === 'secondary' && themedStyles.secondaryButtonText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

function getThemedStyles(isDark: boolean) {
  return StyleSheet.create({
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 25,
      backgroundColor: isDark ? '#0057b8' : '#ff7f50', // dark blue in dark mode, coral in light
      minWidth: 100,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    secondaryButton: {
      backgroundColor: isDark ? '#232f47' : '#fff5f0',
      borderWidth: 1,
      borderColor: isDark ? '#7ecbff' : '#ff7f50',
    },
    secondaryButtonText: {
      color: isDark ? '#7ecbff' : '#ff7f50',
    },
  });
}