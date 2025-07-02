import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function WordCard({ word, meaning, example }) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.word}>{word}</Text>
      </View>
      <View style={styles.divider} />
      <Text style={styles.meaning}>{meaning}</Text>
      <Text style={styles.example}>
        <Text style={styles.exampleLabel}>Example: </Text>
        {example}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 22,
    marginHorizontal: 16,
    marginBottom: 22,
    borderWidth: 1.5,
    borderColor: '#FFD59E',
    shadowColor: '#FFB84C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.13,
    shadowRadius: 16,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  favoriteIcon: {
    marginLeft: 8,
  },
  word: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9900',
    marginBottom: 6,
    letterSpacing: 0.5,
    flex: 1,
  },
  divider: {
    height: 2,
    backgroundColor: '#FFD59E',
    borderRadius: 1,
    marginVertical: 8,
    width: 40,
    alignSelf: 'flex-start',
  },
  meaning: {
    fontSize: 18,
    color: '#222',
    marginBottom: 10,
    fontWeight: '500',
  },
  example: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#B8860B',
    marginTop: 8,
  },
  exampleLabel: {
    color: '#FF9900',
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
});