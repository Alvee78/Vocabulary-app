import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { ChapterCardProps } from '../types';
import { verticalScale } from 'react-native-size-matters';

export default function ChapterCard({ title, descriptions, unlocked, onPress, percentage = 0, image }: ChapterCardProps) {
  const getProgressColor = (percentage) => {
    if (percentage <= 30) return '#e74c3c'; // Red
    if (percentage <= 70) return '#f1c40f'; // Yellow
    return '#2ecc71'; // Green
  };

  return (
    <TouchableOpacity
      style={[styles.card, !unlocked && styles.locked]}
      onPress={onPress}
      disabled={!unlocked}
      activeOpacity={0.85}
    >
      {image && (
        <Image
          resizeMode="cover"
          source={typeof image === 'string' ? { uri: image } : image}
          style={styles.image}
        />
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        {/* <Text style={styles.descriptions} numberOfLines={2}>{descriptions}</Text> */}
        <View style={styles.statusContainer}>
          <MaterialIcons
            name={unlocked ? 'lock-open' : 'lock'}
            size={18}
            style={styles.statusIcon}
          />
          <Text style={styles.statusText}>
            {unlocked ? 'Unlocked' : 'Locked'}
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${percentage}%`,
                  backgroundColor: getProgressColor(percentage),
                },
              ]}
            />
          </View>
          <Text style={styles.percentageLabel}>{percentage}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  locked: {
    backgroundColor: '#f8d7da',
    opacity: 0.7,
  },
  image: {
    width: '100%',
    height: verticalScale(130),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    padding: 14,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  descriptions: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIcon: {
    color: '#2ecc71',
    marginRight: 6,
  },
  statusText: {
    color: '#2ecc71',
    fontSize: 15,
    fontWeight: '600',
  },
  progressBarContainer: {
    width: '100%',
    marginTop: 6,
    alignItems: 'flex-start',
  },
  progressBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  percentageLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#888',
    alignSelf: 'flex-end',
  },
});