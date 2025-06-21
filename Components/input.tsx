import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { colors, radius, spacing } from '../Constants/Theme'
import { InputProps } from '../types'
import { scale, verticalScale } from 'react-native-size-matters'

const Input = (props:InputProps) => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      {
        props.icon && <View>
          {props.icon}
        </View>
      }
      <TextInput 
        style={[
          styles.input,
          props.inputStyle,
        ]} 
        placeholderTextColor={colors.text}
        ref={props.inputRef}
        {...props}
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: radius.md,
    borderCurve: 'continuous',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: verticalScale(16),
    fontWeight: '600',
    color: colors.text,
  },
  input: {
    flex: 1,
    fontSize: verticalScale(16),
    color: colors.text,
  },
  error: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  errorText: {
    color: colors.error,
    fontSize: verticalScale(14),
    marginTop: verticalScale(4),

  },
    success: {
        borderColor: colors.success,
        backgroundColor: colors.successLight,
    },
});