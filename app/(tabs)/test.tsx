import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSQLiteContext } from 'expo-sqlite'



const test = () => {
    const db = useSQLiteContext();
    
  return (
    <View>
      <Text>test</Text>
    </View>
  )
}

export default test

const styles = StyleSheet.create({})