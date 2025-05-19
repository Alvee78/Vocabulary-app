import { StyleSheet, Text, View, ScrollView, Button } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter} from 'expo-router/build/hooks'
import words from '../../Data/words';
import WordCard from '../../Components/WordCard';
import { useNavigation } from 'expo-router';
import { FlatList } from 'react-native-web';

export default function learnPage() {
    const navigation = useNavigation();
    const {id} = useLocalSearchParams();
    const chapterWords = words[id] || [];
    const wordsPerPage = 5;
    const totalPages = Math.ceil(chapterWords.length / wordsPerPage);
    const [page, setPage] = useState(1);
    const router = useRouter();

    const startIndex = (page - 1) * wordsPerPage;
    const currentWords = chapterWords.slice(startIndex, startIndex + wordsPerPage);
    
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={currentWords}
        renderItem={({ item }) => (
          <WordCard word={item.word} meaning={item.meaning} example={item.example} />
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={true}
        style={{ flex: 1, marginBottom: 50 }}
    
        ListHeaderComponent={
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Chapter {id}</Text>
            <Text style={{ fontSize: 16, color: '#666' }}>Words {startIndex + 1} - {Math.min(startIndex + wordsPerPage, chapterWords.length)} of {chapterWords.length}</Text>
          </View>
        }
        />
      {/* <ScrollView contentContainerStyle={styles.scroll}>
        {currentWords.map((item, index) => (
          <WordCard key={index} word={item.word} meaning={item.meaning} />
        ))}
      
      
      </ScrollView> */}
      <View style={styles.buttonRow}>
        {page == 1 && (
          <Button title="Back" onPress={() => navigation.goBack()}/>
        )}
        {page > 1 && (
          <Button title="Back" onPress={() => setPage(page - 1)} />
        )}
        {page < totalPages ? (
          <Button title="Next" onPress={() => setPage(page + 1)} />
        ) : (
          <Button title="Start Quiz" onPress={() => router.push({
            pathname:`/quiz/quiz`,
            params: { chapterNo: id }
          })} />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  scroll: {
    paddingBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    flex: 1,
    margin: 0,
    borderRadius: 50,
    backgroundColor: '#007AFF',
  },
});
/*
// app/chapter-[id]/learn.jsx

import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, ScrollView, Button, StyleSheet } from 'react-native';
import words from '../../data/words'; // adjust based on your folder
import WordCard from '../../Component/WordCard';

export default function LearnPage() {
  const { id } = useLocalSearchParams();
  const chapterWords = words[id] || [];
  const wordsPerPage = 5;
  const totalPages = Math.ceil(chapterWords.length / wordsPerPage);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const startIndex = (page - 1) * wordsPerPage;
  const currentWords = chapterWords.slice(startIndex, startIndex + wordsPerPage);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {currentWords.map((item, index) => (
          <WordCard key={index} word={item.word} meaning={item.meaning} />
        ))}
      </ScrollView>

      <View style={styles.buttonRow}>
        {page > 1 && (
          <Button title="Back" onPress={() => setPage(page - 1)} />
        )}
        {page < totalPages ? (
          <Button title="Next" onPress={() => setPage(page + 1)} />
        ) : (
          <Button title="Start Quiz" onPress={() => router.push(`/chapter-${id}/quiz`)} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  scroll: {
    paddingBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
*/