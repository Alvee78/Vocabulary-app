import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter} from 'expo-router';
import words from '../../Data/words';
import WordCard from '../../Components/WordCard';
import CustomButton from '../../Components/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';

export default function LearnPage() {
    const { id } = useLocalSearchParams();
    const chapterWords = words[Number(id)] || [];
    const wordsPerPage = 5;
    const totalPages = Math.ceil(chapterWords.length / wordsPerPage);
    const [page, setPage] = useState(1);
    const router = useRouter();

    const startIndex = (page - 1) * wordsPerPage;
    const currentWords = chapterWords.slice(startIndex, startIndex + wordsPerPage);
    
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#FFF4E0', '#FFE5B4']}
        style={StyleSheet.absoluteFill}
      />
      <FlatList
        data={currentWords}
        renderItem={({ item }) => (
          <WordCard word={item.word} meaning={item.meaning} example={item.example} />
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={true}
        style={{ flex: 1, marginBottom: 40 }}
    
        ListHeaderComponent={
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Chapter {id}</Text>
            <Text style={{ fontSize: 16, color: '#666' }}>Words {startIndex + 1} - {Math.min(startIndex + wordsPerPage, chapterWords.length)} of {chapterWords.length}</Text>
          </View>
        }
        />

      <View style={styles.buttonRow}>
        {page === 1 ? (
          <CustomButton 
            title="Back" 
            onPress={() => router.back()} 
            variant="secondary"
          />
        ) : (
          <CustomButton 
            title="Back" 
            onPress={() => setPage(page - 1)} 
            variant="secondary"
          />
        )}
        {page < totalPages ? (
          <CustomButton 
            title="Next" 
            onPress={() => setPage(page + 1)} 
          />
        ) : (
          <CustomButton 
            title="Start Quiz" 
            onPress={() => router.replace({
              pathname: '/quiz/quiz',
              params: { chapterNo: id }
            })} 
          />
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
    height: 60,
    backgroundColor: '#fff5f0',
    borderTopWidth: 1,
    borderTopColor: '#ffe4d6',
    elevation: 8,
    alignItems: 'center', 
  },
  button: {
    flex: 1,
    margin: 0,
    borderRadius: 50,
    backgroundColor: '#007AFF',
  },
});
