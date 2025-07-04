import { useClerk } from '@clerk/clerk-expo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Linking from 'expo-linking'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

 const SignOutButton = () => {
  const { signOut } = useClerk()
  const handleSignOut = async () => {
    try {
      await signOut()
      await AsyncStorage.removeItem('appData') // Clear app data on sign out
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
const styles = StyleSheet.create({
  logoutButton: {
  backgroundColor: '#FF4500', // Orange Red
  borderRadius: 10,
  paddingVertical: 15,
  paddingHorizontal: 15,
  marginTop: 30,
  marginBottom: 50, // More space at the bottom
  alignItems: 'center',
  shadowColor: '#FF4500',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 5,
  elevation: 5,
},
logoutButtonText: {
  fontSize: 18,
  color: '#FFFFFF',
  fontWeight: 'bold',
},
})