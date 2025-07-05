import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ButtonProps } from '../types'
import { colors, radius } from '../Constants/Theme'
import { verticalScale } from 'react-native-size-matters'
import Loading from './Loading'
import { useTheme } from '../context/ThemeContext'

const CustomButton = ({
    style,
    onPress,
    loading = false,
    children,
}: ButtonProps) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const themedStyles = getThemedStyles(isDark)

    if (loading) {
        return (
        <View style={[themedStyles.button, style, { backgroundColor: 'transparent' }]}>
            <Loading/>
        </View>
        )
    }
    return (
        <TouchableOpacity
            style={[themedStyles.button, style]}
            onPress={onPress}
            disabled={loading}>
            {children}
        </TouchableOpacity>
    )
}

export default CustomButton

function getThemedStyles(isDark: boolean) {
    return StyleSheet.create({
        button: {
            backgroundColor: isDark ? '#0057b8' : colors.primary10, // dark blue in dark mode
            borderRadius: radius.md,
            borderCurve: 'continuous',
            height: verticalScale(48),
            justifyContent: 'center',
            alignItems: 'center',
        }
    })
}