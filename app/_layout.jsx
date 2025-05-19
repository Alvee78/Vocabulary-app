import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login/index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name='chapter/learnPage' options={{ title: 'Chapter Page' }} />
        <Stack.Screen name='quiz/quiz' options={({ route }) => ({ 
                                                  title: `Chapter ${route.params.chapterNo} Quiz`,
                                                })} />
    </Stack>
  )
}

const styles = StyleSheet.create({})