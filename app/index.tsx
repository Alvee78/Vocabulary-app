// import { View } from 'react-native';
// import { useEffect, useState } from 'react';
// import { Redirect, router } from 'expo-router';

// export default function Index() {
//   const [isLogedIn, setIsLogedIn] = useState(false) // Replace with your actual authentication logic
//   const isFirstTime = false; // Replace with your actual first-time check logic
//   useEffect(() => {
//     // Check if the user is logged in
//     setIsLogedIn(true);
//   }, []);
//   return <Redirect href={isLogedIn?"/(tabs)":"/login"}/>;
// } 

import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../Constants/Theme';
import ScreenWrapper from '../Components/ScreenWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
// This is the main entry point of the app, displaying a logo image centered on the screen.

const index = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(async () => {
      // Navigate to the home screen after 2 seconds
      // This is where you would typically check for authentication status
      // and navigate accordingly.
      router.replace("(home)");
    }, 2000);
  },[]);
  
  // Load loged in status from AsyncStorage or any other storage solution here
  const checkLoggedInStatus = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    console.log('isLoggedIn:', isLoggedIn);
    //await AsyncStorage.setItem('isLoggedIn', 'false'); // For testing purposes, set to false
    // if (isLoggedIn !== "false" && isLoggedIn !== null) {
    //   router.replace("(tabs)");
    // } else {
    //   router.replace("(auth)/welcome");
    // }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Image 
          style={styles.logo}
          source={require('../assets/images/Money_save_img.jpg')}
        />
        <Text style={styles.welcomeText}>Budget better, Live smarter</Text>
      </View>
    </ScreenWrapper>
  )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: "30%",
        width: "80%",
        borderRadius: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 50,
        color: colors.white,
    },
});

