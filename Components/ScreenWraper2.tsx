import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '../Constants/Theme'
import { ScreenWrapperProps } from '../types'
import React from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext' // 1. Import useTheme

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  const { theme } = useTheme(); // 2. Get theme
  const isDark = theme === 'dark';
  // 3. Set gradient and status bar style based on theme
  const gradientColors = (isDark
    ? ['#1a2236', '#232f47']
    : ['#FFF4E0', '#FFE5B4']) as [string, string];

  const barStyle = isDark ? 'light-content' : 'dark-content';

  return (
    <SafeAreaView style={[styles.container, style]}>
      <LinearGradient
        colors={gradientColors}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <StatusBar backgroundColor={isDark ? "#181a2b" : "#FFDAB9"} barStyle={barStyle} translucent />
      {children}
    </SafeAreaView>
  )
}

export default ScreenWrapper

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})