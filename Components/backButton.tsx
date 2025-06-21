import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { BackButtonProps } from '../types';
import { ArrowCircleLeft } from 'phosphor-react-native';
import { colors, radius } from '../Constants/Theme';

const BackButton = ({ style, iconSize=30 }: BackButtonProps) => {
    const router = useRouter();
  return (
    <TouchableOpacity
        style={[styles.button, style]}
        onPress={() => router.back()}
    >
      <ArrowCircleLeft size={iconSize} weight="bold" color={colors.text} />
    </TouchableOpacity>
  );
}

export default BackButton

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.neutral60,
    alignSelf: 'flex-start',
    borderRadius: radius.md,
    borderCurve: 'continuous',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
})