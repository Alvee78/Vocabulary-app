import { ActivityIndicator, ActivityIndicatorProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../Constants/Theme'

const Loading = ({
    size = 'large',
    color = colors.primary10,
}: ActivityIndicatorProps) => {
  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'}}>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})