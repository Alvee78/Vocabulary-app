import  { useState } from 'react'
import ScreenWrapper from '../../Components/ScreenWrapper'
import { spacing } from '../../Constants/Theme'
import { verticalScale } from 'react-native-size-matters'
import Typography from '../../Components/Typography'
import BackButton from '../../Components/backButton'
import Input from '../../Components/input'
import { EnvelopeSimple, Password } from 'phosphor-react-native'
import CustomButton2 from '../../Components/CustomButton2'
import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Alert, TouchableOpacity, View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUser } from '@clerk/clerk-expo';

const accentColor = '#FF9900';
const secondaryText = '#B8860B';
const backgroundColor = '#FFF4E0';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if(!emailAddress || !password) {
      alert("Please enter both email and password");
      return;
    }
    onSignInPress();
  }

  const onSignInPress = async () => {
    if (!isLoaded) return
    setIsLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        await AsyncStorage.setItem('dataStoreStatus', "New login");
        router.replace('/');
      } else {
        Alert.alert('Error', 'Invalid email or password. Please try again.');
      }
    } catch (err) {
      Alert.alert('Error!', 'Failed to log in. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScreenWrapper>
      <View style={[styles.container]}>
        <View style={styles.card}>
          <Typography size={24} fontWeight={'800'} color={accentColor} style={{ marginBottom: spacing.xs }}>
            Welcome Back!
          </Typography>
          <Typography size={16} color={secondaryText} style={{ marginBottom: spacing.sm }}>
            Please enter your credentials to continue...
          </Typography>
          <View style={styles.form}>
            <Typography size={16} fontWeight={'600'} color={secondaryText}>
              Email:
            </Typography>
            <Input
              inputStyle={{flex: 1 , color: '#3E2723'}}
              placeholder='Enter your email'
              placeholderTextColor={secondaryText}
              keyboardType='email-address'
              autoCapitalize='none'
              onChangeText={setEmailAddress}
              icon={<EnvelopeSimple size={32} color={accentColor} weight='bold' />}
            />
          </View>
          <View style={styles.form}>
            <Typography size={16} fontWeight={'600'} color={secondaryText}>
              Password:
            </Typography>
            <Input
              inputStyle={{flex: 1 , color: '#3E2723'}}
              placeholder='Enter your password'
              placeholderTextColor={secondaryText}
              secureTextEntry={true}
              onChangeText={setPassword}
              icon={<Password size={32} color={accentColor} weight='bold' />}
            />
          </View>

          <CustomButton2
            onPress={handleLogin}
            loading={isLoading}
            style={styles.loginButton}
          >
            <Typography
              size={16}
              fontWeight={'600'}
              color="#fff"
            >
              Log In
            </Typography>
          </CustomButton2>
          <View style={styles.footer}>
            <Typography size={14} color={secondaryText}>
              Don't have an account?{' '}
            </Typography>
            <TouchableOpacity
              onPress={() => router.replace('/register')}
            >
              <Typography size={14} color={accentColor} fontWeight={'700'}>
                Sign Up
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "transparent",
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: spacing.lg,
    shadowColor: accentColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 8,
    marginTop: verticalScale(40),
    marginBottom: verticalScale(20),
    alignItems: 'stretch',
  },
  form: {
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  loginButton: {
    backgroundColor: accentColor,
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 36,
    alignItems: 'center',
    marginTop: spacing.md,
    shadowColor: accentColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  forgotPasswordText: {
    alignSelf: 'flex-end',
    paddingBottom: verticalScale(8),
    marginBottom: spacing.sm,
  },
});