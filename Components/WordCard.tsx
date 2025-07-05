import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function WordCard({ word, meaning, example }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const styles = getThemedStyles(isDark);

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

function getThemedStyles(isDark: boolean) {
  return StyleSheet.create({
    card: {
      backgroundColor: isDark ? '#232f47' : '#fff',
      borderRadius: 22,
      padding: 22,
      marginHorizontal: 16,
      marginBottom: 22,
      borderWidth: 1.5,
      borderColor: isDark ? '#4ea8de' : '#FFD59E',
      shadowColor: isDark ? '#0057b8' : '#FFB84C',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.16,
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
      color: isDark ? '#7ecbff' : '#FF9900',
      marginBottom: 6,
      letterSpacing: 0.5,
      flex: 1,
    },
    divider: {
      height: 2,
      backgroundColor: isDark ? '#22304a' : '#FFD59E',
      borderRadius: 1,
      marginVertical: 8,
      width: 40,
      alignSelf: 'flex-start',
    },
    meaning: {
      fontSize: 18,
      color: isDark ? '#e0e6f7' : '#222',
      marginBottom: 10,
      fontWeight: '500',
    },
    example: {
      fontSize: 16,
      fontStyle: 'italic',
      color: isDark ? '#a3bffa' : '#B8860B',
      marginTop: 8,
    },
    exampleLabel: {
      color: isDark ? '#7ecbff' : '#FF9900',
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
  });
}