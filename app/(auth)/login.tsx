import  { useRef, useState } from 'react'
import ScreenWrapper from '../../Components/ScreenWrapper'
import { colors, spacing } from '../../Constants/Theme'
import welcome from './welcome'
import { verticalScale } from 'react-native-size-matters'
import Typography from '../../Components/Typography'
import BackButton from '../../Components/backButton'
import Input from '../../Components/input'
import { EnvelopeSimple, Password } from 'phosphor-react-native'
import CustomButton from '../../Components/CustomButton'
import { HOST_URL } from '../../Constants/MagicWord'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomButton2 from '../../Components/CustomButton2'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { useSignIn } from '@clerk/clerk-expo'
import { Alert,Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import React from 'react'

const login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();


  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    if(!emailAddress || !password) {
      alert("Please enter both email and password");
      return;
    }
    onSignInPress();
    console.log("Logging in with", emailAddress, password);
  }

  // This will Validate the login credentials
  // and navigate to the home screen if successful

  // const validateLogin = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(`http://${HOST_URL}/loginValidator.php`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       body: `email=${encodeURIComponent(emailRef.current)}&password=${encodeURIComponent(passwordRef.current)}`,
  //     });

  //     const data = await response.json();

  //     if (data.success) {
  //       // Login successful
  //       console.log('Login successful:', data.message);

  //       // Save username and login status in AsyncStorage
  //       await AsyncStorage.setItem('username', data.username); // Make sure your API returns username
  //       await AsyncStorage.setItem('email', data.email); // Make sure your API returns email
  //       await AsyncStorage.setItem('isLoggedIn', 'true');

  //       // Navigate to home screen
  //       router.replace('(tabs)');
  //     } else {
  //       // Login failed
  //       console.log('Login failed:', data.message);
  //       Alert.alert('Error', 'Invalid email or password. Please try again.');
  //     }
  //   } catch (error) {
  //     console.log('Error logging in:', error);
  //     Alert.alert('Error', 'Failed to connect to server. Please try again later.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  // Clerk Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return
    setIsLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setIsLoading(false);
    }
  }
  

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton/>
        <View style={{gap: spacing.xs, marginTop: spacing.md}}>
          <Typography size={20} fontWeight={'800'} color={colors.text}>
            Hey there!👋
          </Typography>
          
          <Typography size={16} color={colors.textSecondary}>
            Please enter your credentials to continue...
          </Typography>
          {/* This is where you would typically include a form for login credentials */}
          <View style={styles.form}>
            <Typography size={16} fontWeight={'600'} color={colors.text}>
              Email:
            </Typography>
            <Input
              inputStyle={{flex: 1}}
              placeholder='Enter your email'
              keyboardType='email-address'
              onChangeText={setEmailAddress}
              icon={<EnvelopeSimple size={32} color={colors.white} weight='bold' />}
            />
          </View>
          <View style={styles.form}>
            <Typography size={16} fontWeight={'600'} color={colors.text}>
              Password:
            </Typography>
            <Input
              inputStyle={{flex: 1}}
              placeholder='Enter your password'
              secureTextEntry={true}
              onChangeText={setPassword}
              icon={<Password size={32} color={colors.white} weight='bold' />}
            />
          </View>

          <View style={styles.forgotPasswordText}>
            <TouchableOpacity
              onPress={() => console.log("Forgot Password Pressed")}
              style={{alignSelf: 'flex-end', padding: 0}}
              >
              <Typography size={14}>
                Forgot Password?
              </Typography>
            </TouchableOpacity>
          </View>

          <View>
            <CustomButton2
              onPress={handleLogin}
              loading={isLoading}>
              <Typography
                size={16}
                fontWeight={'600'}
                color={colors.neutral90}
              >
                Log In
              </Typography>
            </CustomButton2>
          </View>
          <View style= {styles.footer}>
            <Typography size={14} color={colors.textSecondary}>
              Don't have an account?{' '}
            </Typography>
            <TouchableOpacity
              onPress={() => router.replace('/(auth)/register')}
            >
              <Typography size={14} color={colors.warning} fontWeight={'700'}>
                Sign Up
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  form: {
    gap: spacing.sm,
  },
  
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.text,
    fontSize: verticalScale(16),
  },
  forgotPasswordText: {
    alignSelf: 'flex-end',
    fontSize: verticalScale(14),
    color: colors.primary100,
    textDecorationLine: 'underline',
    paddingBottom: verticalScale(8),
  },
  
})