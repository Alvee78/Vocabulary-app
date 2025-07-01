import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen name="(home)" options={{ headerShown: false}} />
        <Stack.Screen name='chapter/learnPage' options={{ title: 'Chapter Page' }} />
        <Stack.Screen
          name='quiz/quiz'
          options={(
            { route }: { route: { params?: { chapterNo?: string } } }
          ) => ({
            title: `Chapter ${route?.params?.chapterNo ?? ''} Quiz`,
          })}
        />
    </Stack>
    </ClerkProvider>
  )
}

const styles = StyleSheet.create({})