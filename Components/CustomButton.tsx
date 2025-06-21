import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CustomButton({ title, onPress, variant = 'primary' }:any) {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        variant === 'secondary' && styles.secondaryButton
      ]} 
      onPress={onPress}
    >
      <Text style={[
        styles.buttonText,
        variant === 'secondary' && styles.secondaryButtonText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
 
const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#ff7f50',
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#fff5f0',
    borderWidth: 1,
    borderColor: '#ff7f50',
  },
  secondaryButtonText: {
    color: '#ff7f50',
  },
});