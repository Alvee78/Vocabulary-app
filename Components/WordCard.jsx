// Component/WordCard.jsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WordCard({ word, meaning }) {
  return (
    <View style={styles.card}>
      <Text style={styles.word}>{word}</Text>
      <Text style={styles.meaning}>{meaning}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  word: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  meaning: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
});
