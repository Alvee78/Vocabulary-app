import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Switch, // For toggle settings
  ScrollView, // For scrollable content
} from 'react-native';
import SignOutButton from '../../Components/SignOutButton';

// Placeholder for ScreenWrapper component if you use it globally
// If you don't have a global ScreenWrapper, you can remove this and
// directly apply styles to the top-level View in this component.
const ScreenWrapper = ({ children }) => (
  <View style={settingsScreenStyles.wrapper}>
    {children}
  </View>
);

export default function SettingsScreen() {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false); // Example setting

  const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);
  const toggleDarkMode = () => setIsDarkModeEnabled(previousState => !previousState);

  return (
    <ScreenWrapper>
      <SafeAreaView style={settingsScreenStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFDAB9" /> {/* Light orange status bar */}
        <Text style={settingsScreenStyles.header}>Settings</Text>

        <ScrollView style={settingsScreenStyles.settingsList}>
          {/* General Settings Section */}
          <Text style={settingsScreenStyles.sectionHeader}>General</Text>
          <View style={settingsScreenStyles.settingItem}>
            <Text style={settingsScreenStyles.settingText}>Enable Notifications</Text>
            <Switch
              trackColor={{ false: "#f4f3f4", true: "#FFA07A" }} // Light orange for active track
              thumbColor={isNotificationsEnabled ? "#FF6347" : "#f4f3f4"} // Tomato red for active thumb
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleNotifications}
              value={isNotificationsEnabled}
            />
          </View>

          <View style={settingsScreenStyles.settingItem}>
            <Text style={settingsScreenStyles.settingText}>Dark Mode</Text>
            <Switch
              trackColor={{ false: "#f4f3f4", true: "#FFA07A" }}
              thumbColor={isDarkModeEnabled ? "#FF6347" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleDarkMode}
              value={isDarkModeEnabled}
            />
          </View>

          <TouchableOpacity style={settingsScreenStyles.settingButton}>
            <Text style={settingsScreenStyles.settingButtonText}>Change Password</Text>
          </TouchableOpacity>

          {/* About Section */}
          <Text style={settingsScreenStyles.sectionHeader}>About</Text>
          <TouchableOpacity style={settingsScreenStyles.settingButton}>
            <Text style={settingsScreenStyles.settingButtonText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={settingsScreenStyles.settingButton}>
            <Text style={settingsScreenStyles.settingButtonText}>Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity style={settingsScreenStyles.settingButton}>
            <Text style={settingsScreenStyles.settingButtonText}>App Version</Text>
            <Text style={settingsScreenStyles.settingValue}>1.0.0</Text>
          </TouchableOpacity>

          {/* Logout Button */}
          <SignOutButton />

        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
}

const settingsScreenStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFEFD5', // Very light peach/orange background for the wrapper
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFAF0', // Floral White - a soft, light orange-ish white
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF6347', // Tomato - a vibrant orange-red
    textAlign: 'center',
    marginVertical: 25,
    paddingHorizontal: 15,
  },
  settingsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF8C00', // Dark Orange
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FFDAB9', // Peach Puff - light orange border
    paddingBottom: 5,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF5EE', // Seashell - very light orange-pink
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    shadowColor: '#FF8C00', // Dark Orange shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  settingText: {
    fontSize: 18,
    color: '#333333',
  },
  settingValue: {
    fontSize: 16,
    color: '#666666',
  },
  settingButton: {
    backgroundColor: '#FFDAB9', // Peach Puff
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    flexDirection: 'row', // To align text and value if present
    justifyContent: 'space-between', // To align text and value if present
  },
  settingButtonText: {
    fontSize: 18,
    color: '#FF6347', // Tomato
    fontWeight: '500',
  },
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
});