import SignOutButton from '../../Components/SignOutButton'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, Redirect } from 'expo-router'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ScreenWrapper from '../../Components/ScreenWrapper'
import { scale } from 'react-native-size-matters'

export default function Page() {
  const { user } = useUser()

  return (
    <ScreenWrapper style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={scale(70)}/>
        <SignedIn>
          <Redirect href={'../(tabs)'} />
        </SignedIn>
        <SignedOut>
          <Redirect href={'../(auth)/welcome'} />
        </SignedOut>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '600',
    color: '#22223b',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#2e64e5',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2e64e5',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonTextSecondary: {
    color: '#2e64e5',
    fontWeight: '600',
    fontSize: 16,
  },
})