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
        <Stack.Screen name='quiz/quiz' options={({ route }) => ({ 
                                                  title: `Chapter ${route.params.chapterNo} Quiz`,
            headerTitleStyle: styles.headerTitle,
            headerStyle: styles.header
                                                })} />
    </Stack>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#f8f8f8', // Light background color
    elevation: 4, // Android shadow
    shadowOpacity: 0.3, // iOS shadow
    shadowRadius: 4,
  }
})