import { Alert, BackHandler, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ChapterCard from '../../Components/ChapterCard'
import { useFocusEffect, useRouter } from 'expo-router'
import  chapters  from '../../Data/chapters'
import ChapterProgressBar from '../../Components/ChapterProgressBar'
export default function Home() {
  const router = useRouter();

  // Handle back button press to show an alert before exiting the app
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Exit App',
          'Do you want to exit the app?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: true }
        );
        return true; // Prevent default behavior
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={chapters}
        renderItem={({ item }) => (
          <ChapterCard
            title={item.title}
            descriptions={null}
            unlocked={true}
            percentage={65}
            onPress={() => router.push({ 
              pathname: '/chapter/learnPage', 
              params: { id: item.id } 
            })}
          />
          //<ChapterProgressBar chapterName="Chapter 1" percentage={80} />
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