import { StyleSheet, Text, View, ScrollView, Button } from 'react-native'
import React from 'react'
import CustomButton from '../../Components/CustomButton2'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Typography from '../../Components/Typography'
import { useRouter } from 'expo-router'
import SignOutButton from '../../Components/SignOutButton'
import { userAppData } from '../../Data/appData'
import { updateinsertUserAppData } from '../../config/CloudData/updateInsert'
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from '@expo/vector-icons'
import { verticalScale } from 'react-native-size-matters'
import { LinearGradient } from 'expo-linear-gradient'

export default function Settings() {
  const router = useRouter();
  const { user } = useUser();
  const userid = user?.id || "12345";
  
  const data = userAppData;

  const addData = async () => {
    await updateinsertUserAppData(userid, data);
  };

  const updateData = async () => {
    data[1].maxMarks = 100;
    await updateinsertUserAppData(userid, data);
  };

  const showappdata = async () => {
    try {
      const storedData = await AsyncStorage.getItem('appData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        console.log('App Data:', parsedData);
      } else {
        console.log('No app data found');
      }
    } catch (error) {
      console.error('Error retrieving app data:', error);
    }
  };
  const uploadData = async () => {
    
  }

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#FFF4E0', '#FFE5B4']}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <Ionicons name="person-circle" size={72} color="#FF9900" style={{ marginBottom: 10 }} />
          <Text style={styles.userName}>{user?.fullName || "User"}</Text>
          <Text style={styles.userEmail}>{user?.primaryEmailAddress?.emailAddress || "No email"}</Text>
          <View style={styles.userIdRow}>
            <Ionicons name="key-outline" size={18} color="#FFB84C" />
            <Text style={styles.userIdText}>{user?.id}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Typography size={18} fontWeight="700" color="#FF9900" style={styles.sectionTitle}>
            App Data
          </Typography>
          <View style={styles.divider} />
          
          <View style={styles.actionButton}>
            <Button title="Add Data" onPress={addData} />
          </View>
          <View style={styles.actionButton}>
            <Button title="Update Data" onPress={updateData} />
          </View>
          <View style={styles.actionButton}>
            <Button title="Show App Data" onPress={showappdata} />
          </View>

          <Typography size={18} fontWeight="700" color="#FF9900" style={styles.sectionTitle }>
            Account
          </Typography>
          <View style={styles.divider} />
          <SignOutButton />
        </View>

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 28,
    alignItems: 'center',
    marginTop: verticalScale(36),
    marginBottom: 32,
    width: '100%',
    shadowColor: '#FFB84C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.13,
    shadowRadius: 16,
    elevation: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9900',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 15,
    color: '#B8860B',
    marginBottom: 8,
  },
  userIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },
  userIdText: {
    fontSize: 13,
    color: '#FFB84C',
    marginLeft: 4,
  },
  section: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 18,
    padding: 20,
    marginBottom: 22,
    width: '100%',
    shadowColor: '#FFB84C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#FFE5B4',
    marginVertical: 10,
    width: '100%',
    borderRadius: 2,
  },
  actionButton: {
  marginBottom: 16,
  backgroundColor: '#FF9900',
  borderRadius: 24,
  paddingVertical: 12,
  alignItems: 'center',
  // Add shadow if your CustomButton supports style prop
  shadowColor: '#FFB84C',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 3,
  },
  versionText: {
    color: '#B8860B',
    marginTop: 18,
    fontSize: 13,
    alignSelf: 'center',
    opacity: 0.7,
  },
});