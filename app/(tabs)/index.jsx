import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChapterCard from '../../Components/ChapterCard'
import { router, useRouter } from 'expo-router'
import  chapters  from '../../Data/chapters'
export default function Home() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <FlatList 
        data={chapters}
        renderItem={({ item }) => (
          <ChapterCard
            title={item.title}
            descriptions={null}
            unlocked={true}
            onPress={() => router.push({ 
              pathname: '/chapter/learnPage', 
              params: { id: item.id } 
            })}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        style={styles.list}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 16
  },
  list: {
    width: '100%'
  },
  listContent: {
    padding: 16,
    width: '100%',
  }
})