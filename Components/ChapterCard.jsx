import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
export default function ChapterCard({ title,descriptions, unlocked, onPress }) {
  return (
    <TouchableOpacity 
      style={[styles.card, !unlocked && styles.locked]} 
      onPress={onPress}
      disabled={!unlocked}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.descriptions}>{descriptions}</Text>
      <View style={styles.statusContainer}>
        <Text style={styles.status}>
          {unlocked ? 'Unlocked' : 'Locked'}
        </Text>
        <MaterialIcons 
          name={unlocked ? 'lock-open' : 'lock'} 
          size={16}  
          style={styles.status}
        />
      </View>
    </TouchableOpacity>
  )
}
 
const styles = StyleSheet.create({
  card: {
    width: '97%',
    backgroundColor: '#58e48b',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center'
  },
  locked: {
    backgroundColor: '#f15355',
    opacity: 0.7
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  },
  descriptions: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8
  },
    statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  status: {
    color: '#f4f4f4',
    fontSize: 18
  }
})