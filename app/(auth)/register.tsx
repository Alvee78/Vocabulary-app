
import  { useEffect, useRef, useState } from 'react'
import ScreenWrapper from '../../Components/ScreenWrapper'
import { colors, spacing } from '../../Constants/Theme'
import { verticalScale } from 'react-native-size-matters'
import Typography from '../../Components/Typography'
import BackButton from '../../Components/backButton'
import Input from '../../Components/input'
import { User, EnvelopeSimple, Password } from 'phosphor-react-native'
import CustomButton from '../../Components/CustomButton'
import CustomButton2 from '../../Components/CustomButton2'
import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [foundError, setFoundError] = useState(false);
  const router = useRouter();
  const handleRegister = () => {
    if(!emailAddress || !password || !confirmPassword || !name) {
      alert("Please enter all fields");
      return;
    }
    if(password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    //console.log("Registering with", emailRef.current, passwordRef.current, nameRef.current, confirmPasswordRef.current);
    onSignUpPress();
  }

  // clerk sign up
  const { isLoaded, signUp, setActive } = useSignUp()

  // State variables for sign-up form
  const [name, setName] = React.useState('')
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return
    setIsLoading(true);
    setFoundError(false);
    try {
      await signUp.create({
        emailAddress,
        password,
      })
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      router.push({
        pathname: '/otp',
        params: {
          username: name,
          email: emailAddress,
          password: password,
        },
      });
    } catch (err) {
      console.log(JSON.stringify(err, null, 2))
      Alert.alert('Error!', 'Failed to create account.' + err.message);
      setFoundError(true);
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
            Please enter your details to register...
          </Typography>
          <View style={styles.form}>
            <Typography size={16} fontWeight={'600'} color={colors.text}>
              Name:
            </Typography>
            <Input
              inputStyle={{flex: 1}}
              placeholder='Enter your name'
              onChangeText={setName}
              icon={<User size={32} weight="bold" color={colors.white} />}
            />
          </View>
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

          <View style={styles.form}>
            <Typography size={16} fontWeight={'600'} color={colors.text}>
              Confirm Password:
            </Typography>
            <Input
              inputStyle={{flex: 1}}
              placeholder='Enter your password again'
              secureTextEntry={true}
              onChangeText={setConfirmPassword}
              icon={<Password size={32} color={colors.white} weight='bold' />}
            />
          </View>

          <View style={{marginTop:20}}>
            <CustomButton2
              onPress={handleRegister}
              loading={isLoading}>
              <Typography
                size={16}
                fontWeight={'600'}
                color={colors.neutral90}
              >
                Sign Up
              </Typography>
            </CustomButton2>
          </View>
          <View style= {styles.footer}>
            <Typography size={14} color={colors.textSecondary}>
              Already have an account?{' '}
            </Typography>
            <TouchableOpacity
              onPress={() => router.replace('/(auth)/login')}
            >
              <Typography size={14} color={colors.warning} fontWeight={'700'}>
                Log In
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Register

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
  
})