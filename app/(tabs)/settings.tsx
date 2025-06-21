import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../../Components/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Typography from '../../Components/Typography'
import { useRouter } from 'expo-router'
import SignOutButton from '../../Components/SignOutButton'

export default function settings() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>settings</Text>
      {/* logout button */}
      <SignOutButton />
    </View>
  )
}

const styles = StyleSheet.create({}) 