import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name='chapter' options={{ headerShown: false }} />
        <Stack.Screen name='chapter/learnPage' options={{ title: 'Chapter Page' }} />
    </Stack>
  )
}

const styles = StyleSheet.create({})