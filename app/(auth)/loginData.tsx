import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { loadUserAppData } from '../../config/CloudData/loadUserAppData'
import { scale } from 'react-native-size-matters'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'

const LoginData = () => {
  const { user, isLoaded } = useUser();
  const [appData, setAppData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoaded && user?.id) {
        const data = await loadUserAppData(user.id);
        await AsyncStorage.setItem('appData', JSON.stringify(data));
        router.replace('/');
      }
    };
    fetchData();
  }, [isLoaded, user]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size={scale(70)} />
        <Text>Loading user data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>User ID: {user?.id}</Text>
      <Text>User App Data: {JSON.stringify(appData, null, 2)}</Text>
    </View>
  )
}

export default LoginData

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});