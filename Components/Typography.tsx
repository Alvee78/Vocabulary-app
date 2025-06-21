import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../Constants/Theme'
import { TypographyProps } from '../types'
import { verticalScale } from 'react-native-size-matters'

const Typography = ({
    size,
    color = colors.text,
    fontWeight = '400',
    children,
    style,
    textProps = {},
}: TypographyProps) => {
    const textStyle = {
        fontSize: size? verticalScale(size) : verticalScale(18),
        color,
        fontWeight,
    }
  return (
    <Text
      style={[textStyle, style]}
      {...textProps}
    >{children}</Text>
  )
}

export default Typography

const styles = StyleSheet.create({})