import { ActivityIndicator, ActivityIndicatorProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../Constants/Theme'
import ScreenWrapper from './ScreenWraper2'

const Loading = ({
    size = 'large',
    color = colors.primary10,
}: ActivityIndicatorProps) => {
  return (
    <ScreenWrapper style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'}}>
      <ActivityIndicator size={size} color={color} />
    </ScreenWrapper>
  )
}

export default Loading

const styles = StyleSheet.create({})