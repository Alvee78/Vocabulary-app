import  { useEffect, useRef, useState } from 'react';
import ScreenWrapper from '../../Components/ScreenWrapper';
import Typography from '../../Components/Typography';
import Input from '../../Components/input';
import CustomButton from '../../Components/CustomButton';
import { colors, spacing } from '../../Constants/Theme';
import { verticalScale } from 'react-native-size-matters';
import BackButton from '../../Components/backButton';
import { optProps } from '../../types';
import { HOST_URL } from '../../Constants/MagicWord';
import {  Link,Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { store } from 'expo-router/build/global-state/router-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from 'expo-router/build/global-state/routing';

import CustomButton2 from '../../Components/CustomButton2';
import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'


const Register2 = () => {
  const otpRef = useRef('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { username, email, password } = useLocalSearchParams<optProps>();
    const { isLoaded, signUp, setActive } = useSignUp()



  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // useEffect(() => {
  //   if (!username || !email || !password) {
  //     Alert.alert('Error', 'Missing user details. Please try again.');
  //   } else {
  //     handleGenerateOtp(username, email, password);
  //   }
  // }, [username, email, password]);

  // clerk sign up
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setIsLoading(false);
    }
  }
  // const handleGenerateOtp = async (username: string, email: string, password: string) => {
  //   try {
  //     const response = await fetch(`http://${HOST_URL}/otpGenerator.php`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       body: `username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
  //     });

  //     const data = await response.json();
  //     // console.log("username:", username);
  //     // console.log("email:", email);
  //     // console.log("password:", password);

  //     if (data.exists) {
  //       Alert.alert('Error', 'User already exists. Please try a different email.');
  //       router.back();
  //       return;
  //     } else {
  //       console.log('OTP generated successfully:', data.message);
  //     }

  //   } catch (err) {
  //     Alert.alert('Error', 'Failed to connect to server. Please try again later.!');
  //     console.log('Error generating OTP:!', err);
  //   } finally{
  //     setIsLoading(false);
  //   }

  //   // Automatically send OTP after generating it
  //   try{
  //       await fetch(`http://${HOST_URL}/otpSender.php`)
  //       .then(response => response.json())
  //       .then(data => {
  //         if (data.success) {
  //           console.log('OTP sent successfully:', data.message);
  //         } else {
  //           console.log('Error sending OTP:', data.message);
  //           Alert.alert('Error', 'Please provide a valid email address.');
  //           router.back();
  //         }
  //       });
  //     } catch (error) {
  //       console.log('Error sending OTP:', error);
  //       Alert.alert('Error',"Catch: "+ error);
  //     }
  // };

  const handleValidateOTP = async () => {
    if (!code || code.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter the 6-digit OTP sent to your email.');
      return;
    }
    setIsLoading(true);

    onVerifyPress();
    // try {
    //   const response = await fetch(`http://${HOST_URL}/otpValidator.php`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     body: `username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&otp=${encodeURIComponent(otpRef.current)}`,
    //   });

    //   if (!response.ok) {
    //     setIsLoading(false);
    //     Alert.alert('Error', 'Failed to validate OTP. Please try again later.');
    //     return;
    //   }

    //   const isValid = await response.json();

    //   setIsLoading(false);

    //   if (isValid) {
    //     //Alert.alert('Success', 'OTP validated successfully!');
    //     storeUserDetails(username, email);
    //     //<ConfirmLogin/>;
    //     goHome();
    //   } else {
    //     Alert.alert('Invalid OTP', 'The OTP you entered is incorrect. Please try again.');
    //   }
    // } catch (err) {
    //   setIsLoading(false);
    //   Alert.alert('Error', 'Failed to connect to server.! Please try again later.');
    // }
  };

  // Function to store logged-in user details in AsyncStorage and navigate to home screen
  const storeUserDetails = async (username: string, email: string) => {
    await AsyncStorage.setItem('username', username);
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('isLoggedIn', 'true');
  };

  const goHome = () => {
    // Reset the navigation stack and navigate to home screen
    
    router.push("(tabs)");
    Alert.alert('Success', 'Registration completed successfully! You can now log in.');
  };

  return (
    <ScreenWrapper>
      <BackButton style={{marginLeft:10}}/>
      <View style={styles.container}>
        <Typography size={24} fontWeight="800" color={colors.text} style={{ marginBottom: spacing.md }}>
          OTP Verification
        </Typography>
        <Typography size={16} color={colors.textSecondary} style={{ marginBottom: spacing.md }}>
          Please enter the 6-digit OTP sent to your email.
        </Typography>
        <Input
          inputStyle={{ flex: 1, letterSpacing: 8, textAlign: 'center', fontSize: verticalScale(20) }}
          placeholder="Enter OTP"
          keyboardType="number-pad"
          maxLength={6}
          onChangeText={setCode}
        />
        <CustomButton2
          style={{ marginTop: spacing.lg }}
          onPress={handleValidateOTP}
          loading={isLoading}
        >
          <Typography size={16} fontWeight="600" color={colors.neutral90} style={{ paddingHorizontal: spacing.md }}>
            Validate OTP
          </Typography>
        </CustomButton2>
      </View>
    </ScreenWrapper>
  );
};

export default Register2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '40%',
  },
});