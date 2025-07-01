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
import { useSignUp, useUser } from '@clerk/clerk-expo'
import { userAppData } from '../../Data/appData';
import { updateinsertUserAppData } from '../../config/CloudData/updateInsert';


const Register2 = () => {
  const otpRef = useRef('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [pendingSave, setPendingSave] = useState(false);

  const { user } = useUser();
  const userId = user?.id;
  const { username, email, password } = useLocalSearchParams<optProps>();
    const { isLoaded, signUp, setActive } = useSignUp();



  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  const saveDataToStorage = async (userId: string) => {
    try {
      const appData = userAppData;
      appData.userName = username || '';
      await AsyncStorage.setItem('userName', username || '');
      const stringifiedValue = JSON.stringify(appData);
      await AsyncStorage.setItem('appData', stringifiedValue);
      await AsyncStorage.setItem('dataStoreStatus', 'New user');
      await updateinsertUserAppData(userId, appData);
      console.log('Data loaded successfully for user ID: ' + userId);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      router.replace('/');
    }
    
  };

  // clerk sign up
  const onVerifyPress = async () => {
  if (!isLoaded) return;
  setIsLoading(true);
  try {
    const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });
    if (signUpAttempt.status === 'complete') {
      await setActive({ session: signUpAttempt.createdSessionId });
      // Use signUpAttempt.createdUserId if available, or pass it to saveDataToStorage
      if (signUpAttempt.createdUserId) {
        await saveDataToStorage(signUpAttempt.createdUserId);
        router.replace('/');
      } else {
        setPendingSave(true); // fallback to useEffect
        Alert.alert('Success', 'OTP verified successfully!');
      }
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
      console.log(JSON.stringify(signUpAttempt, null, 2));
    }
  } catch (err) {
    Alert.alert('Error!', 'Failed to verify OTP. Please check your code and try again.');
    console.log(JSON.stringify(err, null, 2));
  } finally {
    setIsLoading(false);
  }
};

// This effect will run when user is loaded and pendingSave is true
useEffect(() => {
  if (pendingSave && user?.id) {
    saveDataToStorage(user.id);
    setPendingSave(false);
  }
}, [pendingSave, user]);

  const handleValidateOTP = async () => {
    if (!code || code.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter the 6-digit OTP sent to your email.');
      return;
    }
    onVerifyPress();
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