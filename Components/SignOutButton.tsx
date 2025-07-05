import { useClerk } from '@clerk/clerk-expo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Linking from 'expo-linking'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '../context/ThemeContext'

const SignOutButton = () => {
  const { signOut } = useClerk()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const styles = getThemedStyles(isDark)

  const handleSignOut = async () => {
    try {
      await signOut()
      await AsyncStorage.removeItem('appData')
      Linking.openURL(Linking.createURL('../(home)'))
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }
  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
      <Text style={styles.logoutButtonText}>Sign out</Text>
    </TouchableOpacity>
  )
}
export default SignOutButton

function getThemedStyles(isDark: boolean) {
  return StyleSheet.create({
    logoutButton: {
      backgroundColor: isDark ? '#22304a' : '#FF4500', // dark blue in dark mode, orange red in light
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 15,
      marginTop: 30,
      marginBottom: 50,
      alignItems: 'center',
      shadowColor: isDark ? '#0057b8' : '#FF4500', // blue shadow in dark
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
    },
    logoutButtonText: {
      fontSize: 18,
      color: isDark ? '#7ecbff' : '#FFFFFF', // blue accent in dark, white in light
      fontWeight: 'bold',
    },
  })
}