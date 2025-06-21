import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ButtonProps } from '../types'
import { colors, radius } from '../Constants/Theme'
import { verticalScale } from 'react-native-size-matters'
import Loading from './Loading'

const CustomButton = ({
    style,
    onPress,
    loading = false,
    children,
}: ButtonProps) => {
    if (loading) {
        return (
        <View style={[styles.button, style, { backgroundColor: 'transparent' }]}>
            <Loading/>
        </View>
        )
    }
  return (
    <TouchableOpacity
        style={[styles.button, style]}
        onPress={onPress}
        disabled={loading}>
        {children}
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary10,
        borderRadius: radius.md,
        borderCurve: 'continuous',
        height: verticalScale(48),
        justifyContent: 'center',
        alignItems: 'center',
    }
})