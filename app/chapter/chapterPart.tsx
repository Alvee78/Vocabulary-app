import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

const PARTS = [
  { name: 'Part 1', key: 1 },
  { name: 'Part 2', key: 2 },
  { name: 'Part 3', key: 3 },
];

const PartCard = ({ partName, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.cardText}>{partName}</Text>
  </TouchableOpacity>
);

const ChapterPart = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chapter {id} Parts</Text>
      {PARTS.map((part) => (
        <PartCard
          key={part.key}
          partName={part.name}
          onPress={() =>
            router.push({
              pathname: '/chapter/learnPage',
              params: { id, part: part.key },
            })
          }
        />
      ))}
    </View>
  );
};

export default ChapterPart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f3f4f6',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
  },
});