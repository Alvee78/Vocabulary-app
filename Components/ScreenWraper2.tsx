import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '../Constants/Theme'
import { ScreenWrapperProps } from '../types'
import React from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <LinearGradient
        colors={['#FFF4E0', '#FFE5B4']}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
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