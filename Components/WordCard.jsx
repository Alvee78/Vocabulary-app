import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WordCard({ word, meaning, example }) {
  return (
    <View style={styles.card}>
      <Text style={styles.word}>{word}</Text>
      <Text style={styles.meaning}>{meaning}</Text>
      <Text style={styles.example}>Example: {example}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  word: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  meaning: {
    fontSize: 18,
    color: '#444',
    marginTop: 8,
  },
  example: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
    marginTop: 12,
  },
});
