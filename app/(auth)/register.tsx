import { useState } from 'react'
import ScreenWrapper from '../../Components/ScreenWrapper'
import { spacing } from '../../Constants/Theme'
import { verticalScale } from 'react-native-size-matters'
import Typography from '../../Components/Typography'
import BackButton from '../../Components/backButton'
import Input from '../../Components/input'
import { User, EnvelopeSimple, Password } from 'phosphor-react-native'
import CustomButton2 from '../../Components/CustomButton2'
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

const accentColor = '#FF9900'
const secondaryText = '#B8860B'
const backgroundColor = '#FFF4E0'

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Form state
  const [name, setName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Clerk sign up
  const { isLoaded, signUp } = useSignUp()

  // Validate and handle register
  const handleRegister = () => {
    if (!emailAddress || !password || !confirmPassword || !name) {
      alert("Please enter all fields")
      return
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    onSignUpPress()
  }

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return
    setIsLoading(true)
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
      })
    } catch (err) {
      Alert.alert('Error!', 'Failed to create account. ' + (err.message || ''))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ScreenWrapper>
      <View style={[styles.container, { backgroundColor: "transparent" }]}>

        <View style={styles.card}>
          <Typography size={24} fontWeight={'800'} color={accentColor} style={{ marginBottom: spacing.xs }}>
            Hey there! 👋
          </Typography>
          <Typography size={16} color={secondaryText} style={{ marginBottom: spacing.sm }}>
            Please enter your details to register...
          </Typography>
          <View style={styles.form}>
            <Typography size={16} fontWeight={'600'} color={secondaryText}>
              Name:
            </Typography>
            <Input
              inputStyle={{ flex: 1 , height: verticalScale(50)}}
              placeholder='Enter your name'
              placeholderTextColor={secondaryText}
              onChangeText={setName}
              icon={<User size={28} weight="bold" color={accentColor} />}
            />
          </View>
          <View style={styles.form}>
            <Typography size={16} fontWeight={'600'} color={secondaryText}>
              Email:
            </Typography>
            <Input
              inputStyle={{ flex: 1 , height: verticalScale(50)}}
              placeholder='Enter your email'
              placeholderTextColor={secondaryText}
              autoCapitalize='none'
              keyboardType='email-address'
              onChangeText={setEmailAddress}
              icon={<EnvelopeSimple size={28} color={accentColor} weight='bold' />}
            />
          </View>
          <View style={styles.form}>
            <Typography size={16} fontWeight={'600'} color={secondaryText}>
              Password:
            </Typography>
            <Input
              inputStyle={{ flex: 1 , height: verticalScale(40) }}
              placeholder='Enter your password'
              placeholderTextColor={secondaryText}
              secureTextEntry={true}
              onChangeText={setPassword}
              icon={<Password size={32} color={accentColor} weight='bold' />}
            />
          </View>
          <View style={styles.form}>
            <Typography size={16} fontWeight={'600'} color={secondaryText}>
              Confirm Password:
            </Typography>
            <Input
              inputStyle={{ flex: 1 }}
              placeholder='Enter your password again'
              placeholderTextColor={secondaryText}
              secureTextEntry={true}
              onChangeText={setConfirmPassword}
              icon={<Password size={32} color={accentColor} weight='bold' />}
            />
          </View>
          <CustomButton2
            onPress={handleRegister}
            loading={isLoading}
            style={styles.registerButton}
          >
            <Typography
              size={16}
              fontWeight={'600'}
              color="#fff"
            >
              Sign Up
            </Typography>
          </CustomButton2>
          <View style={styles.footer}>
            <Typography size={14} color={secondaryText}>
              Already have an account?{' '}
            </Typography>
            <TouchableOpacity
              onPress={() => router.replace('./login')}
            >
              <Typography size={14} color={accentColor} fontWeight={'700'}>
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
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
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
  registerButton: {
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
});