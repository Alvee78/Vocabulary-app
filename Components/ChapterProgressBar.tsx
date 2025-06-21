import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChapterProgressBarProps } from '../types';

const getProgressColor = (percentage) => {
  if (percentage <= 30) return '#e74c3c'; // Red
  if (percentage <= 70) return '#f1c40f'; // Yellow
  return '#2ecc71'; // Green
};

const ChapterProgressBar = ({ chapterName, percentage } : ChapterProgressBarProps) => {
  const progressWidth = percentage + "%";
  const barColor = getProgressColor(percentage);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {chapterName} – {percentage}%
      </Text>
      <View style={styles.barBackground}>
        <View
            style={[
                styles.barFill,
                { width: progressWidth as `${number}%`, backgroundColor: barColor }
            ]}
            />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  barBackground: {
    height: 14,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 7,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 7,
  },
});

export default ChapterProgressBar;
