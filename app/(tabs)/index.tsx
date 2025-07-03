import { Alert, BackHandler, FlatList, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import ChapterCard from '../../Components/ChapterCard'
import { useFocusEffect, useRouter } from 'expo-router'
import chapters from '../../Data/chapters'
import { chapterImage } from '../../Data/chapterImage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loadUserAppData } from '../../config/CloudData/loadUserAppData'
import { useUser } from '@clerk/clerk-expo'
import { userAppData } from '../../Data/appData'
import { scale } from 'react-native-size-matters'
import ScreenWrapper from '../../Components/ScreenWraper2'

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { user , isLoaded } = useUser();
  const userId = user?.id;
  const dummyData = userAppData;
  const [userName, setUserName] = useState(null);


  // Dummy user data (replace with real data as needed)
  const users = {
    name: "Alvee",
    score: 1280,
    level: 5,
    avatar: require('../../assets/user.png'),
  };

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
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );
  const loadData = async () => {
    try {
      const status = await AsyncStorage.getItem('dataStoreStatus');
      if (status === 'New login') {
        console.log('Loading data for user ID:', userId);
        // If it's a new login, load user app data
        console.log('New login detected, loading user app data...');
        if (!userId) {
          console.warn('User ID is not available');
          return;
        }
        const storedData = await loadUserAppData(userId);
        console.warn('User app stored data loaded:', storedData);
        await setData(storedData);
        console.warn('User app data loaded:', data);
        await AsyncStorage.setItem('appData', JSON.stringify(storedData));
        await AsyncStorage.setItem('dataStoreStatus', 'Data loaded');
      }else if (status == "New user") {
        // If it's a new user, set default data , data added to AsyncStorage and cloud in otp page.
        const storedData = await AsyncStorage.getItem('appData');
        const parsedData = storedData ? JSON.parse(storedData) : dummyData;
        setData(parsedData);
        await AsyncStorage.setItem('dataStoreStatus', 'Data loaded');
      } else {
        // If data is already loaded, just retrieve it
        const storedData = await AsyncStorage.getItem('appData');
        if (storedData) {
          setData(JSON.parse(storedData));
        } else {
          console.warn('No app data found in storage');
        }
        console.log('Data already loaded, using stored data');
      }
    }
    catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    } finally {
      setLoading(false);
      console.log('Data loaded successfully for user ID:', userId);
      console.log('User App Data:', data);
    }
  };


  useEffect(() => {
    if (isLoaded && userId) {
      loadData();
    }
  }, [isLoaded, userId]);

  if (loading || !data || !data.userName) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size={scale(60)} color="#FF9900" />
      </View>
    );
  }
  return (
    <ScreenWrapper>
    <View style={styles.container}>
      {/* User Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarWrapper}>
          <Image source={users.avatar} style={styles.avatar} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{data.userName}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Score</Text>
              <Text style={styles.statValue}>{data.score}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Level</Text>
              <Text style={styles.statValue}>{data.level}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Chapters List */}
      <FlatList 
        data={chapters}
        renderItem={({ index, item }) => (
          <ChapterCard
            title={item.title}
            descriptions={item.description}
            unlocked={data[index+1].unlocked}
            percentage={Math.floor((data[index+1].totalMarks/data[index+1].maxMarks)*100)}
            image={chapterImage(item.id)}
            onPress={() => router.push({ 
              pathname: '/chapter/learnPage', 
              params: { id: item.id } 
            })}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        style={styles.list}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', gap: 12 }}
      />
    </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent', // light orange
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5B4',
    borderRadius: 22,
    margin: 18,
    padding: 15,
    elevation: 5,
    shadowColor: '#FFA500',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#FFD59E',
  },
  avatarWrapper: {
    shadowColor: '#FFA500',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    borderRadius: 36,
    backgroundColor: '#fff',
    marginRight: 18,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9900',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 2,
  },
  statBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 18,
    alignItems: 'center',
    marginRight: 12,
    elevation: 2,
    shadowColor: '#FFA500',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  statLabel: {
    fontSize: 13,
    color: '#FFA500',
    fontWeight: '600',
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  list: {
    width: '100%',
  },
  listContent: {
    padding: 16,
    width: '100%',
  },
});