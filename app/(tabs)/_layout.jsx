import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs  screenOptions={{ tabBarActiveTintColor:'tomato', tabBarInactiveTintColor:'grey'}} >
        <Tabs.Screen name="index" options={{ title: 'Home' , tabBarIcon: ({color})=>(<Ionicons name='home' size={24} color={color}/> )}} />
        <Tabs.Screen name="rewards" options={{ title: 'Rewards' , tabBarIcon: ({color})=>(<Ionicons name='trophy' size={24} color={color}/>) }} />
        <Tabs.Screen name="settings" options={{ title: 'Settings' , tabBarIcon: ({color})=>(<Ionicons name='settings' size={24} color={color}/>) }} />
    </Tabs>
  )
}

const styles = StyleSheet.create({})