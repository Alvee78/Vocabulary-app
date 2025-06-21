import { colors } from '../Constants/Theme'
import { ScreenWrapperProps } from '../types'
import React from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <StatusBar barStyle="light-content" />
      {children}
    </SafeAreaView>
  )
}

export default ScreenWrapper

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: colors.neutral90,
  },
})