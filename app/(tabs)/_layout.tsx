import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { SQLiteProvider } from 'expo-sqlite';

export default function TabLayout() {
  return (
    <SQLiteProvider databaseName="test.db" assetSource={{ assetId: require('./assets/test.db') }}>
      <Tabs screenOptions={{
        // Tab Bar Style
        tabBarStyle: {
          height: 60,
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: '#fff5f0',
        borderTopWidth: 1,
        borderTopColor: '#ffe4d6',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
      },
      // Active/Inactive tint color
      tabBarActiveTintColor:'tomato', 
      tabBarInactiveTintColor:'grey'
    }}>
        <Tabs.Screen name="index" options={{ headerShown: false, title: 'Home' , tabBarIcon: ({color})=>(<Ionicons name='home' size={24} color={color}/> )}} />
        <Tabs.Screen name="rewards" options={{ headerShown: false, title: 'Rewards' , tabBarIcon: ({color})=>(<Ionicons name='trophy' size={24} color={color}/>) }} />
        <Tabs.Screen name="dictionary" options={{ headerShown: false, title: 'Dictionary' , tabBarIcon: ({color})=>(<Ionicons name='book' size={24} color={color}/>) }} />
        <Tabs.Screen name="favorite" options={{ headerShown: false, title: 'Favorites' , tabBarIcon: ({color})=>(<Ionicons name='heart' size={24} color={color}/>) }} />
        <Tabs.Screen name="settings" options={{ headerShown: false, title: 'Settings' , tabBarIcon: ({color})=>(<Ionicons name='settings' size={24} color={color}/>) }} />
    </Tabs>
    </SQLiteProvider>
  )
}

const styles = StyleSheet.create({})