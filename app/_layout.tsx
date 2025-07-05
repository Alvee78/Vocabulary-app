import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Stack } from 'expo-router'
import { ThemeProvider } from '../context/ThemeContext'

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
    <ThemeProvider>
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen name="(home)" options={{ headerShown: false}} />
        <Stack.Screen name='chapter/learnPage' options={{ headerShown: false}} />
        <Stack.Screen
          name='quiz/quiz'
          options={{ headerShown: false }}
        />
    </Stack>
    </ThemeProvider>
    </ClerkProvider>
  )
}

const styles = StyleSheet.create({})