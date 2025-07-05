import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Switch,
  ScrollView,
  Linking,
} from 'react-native';
import SignOutButton from '../../Components/SignOutButton';
import ScreenWrapper from '../../Components/ScreenWraper2';
import { useTheme } from '../../context/ThemeContext';
import { verticalScale } from 'react-native-size-matters';

export default function SettingsScreen() {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);
  const { theme, toggleTheme } = useTheme();

  const isDarkModeEnabled = theme === 'dark';

  const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);

  // Dynamic styles based on theme
  const themedStyles = getThemedStyles(theme);

  const openTerms = () => {
    Linking.openURL('https://servicesonline.fwh.is/vocabulary.php?page=terms');
  };
  const openPrivacyPolicy = () => {
    Linking.openURL('https://servicesonline.fwh.is/vocabulary.php?page=privacy');
  };
  const openAboutUs = () => {
    Linking.openURL('https://servicesonline.fwh.is/vocabulary.php?page=version');
  };

  return (
    <ScreenWrapper>
      <View style={themedStyles.container}>
        <Text style={themedStyles.header}>Settings</Text>

        <ScrollView style={themedStyles.settingsList}>
          <Text style={themedStyles.sectionHeader}>General</Text>
          <View style={themedStyles.settingItem}>
            <Text style={themedStyles.settingText}>Enable Notifications</Text>
            <Switch
              trackColor={{ false: "#f4f3f4", true: "#FFA07A" }}
              thumbColor={isNotificationsEnabled ? "#FF6347" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleNotifications}
              value={isNotificationsEnabled}
            />
          </View>

          <View style={themedStyles.settingItem}>
            <Text style={themedStyles.settingText}>Dark Mode</Text>
            <Switch
              trackColor={{ false: "#f4f3f4", true: "#FFA07A" }}
              thumbColor={isDarkModeEnabled ? "#FF6347" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleTheme}
              value={isDarkModeEnabled}
            />
          </View>

          {/* <TouchableOpacity style={themedStyles.settingButton}>
            <Text style={themedStyles.settingButtonText}>Change Password</Text>
          </TouchableOpacity> */}

          <Text style={themedStyles.sectionHeader}>About</Text>
          <TouchableOpacity style={themedStyles.settingButton} onPress={openPrivacyPolicy}>
            <Text style={themedStyles.settingButtonText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={themedStyles.settingButton} onPress={openTerms}>
            <Text style={themedStyles.settingButtonText}>Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity style={themedStyles.settingButton} onPress={openAboutUs}>
            <Text style={themedStyles.settingButtonText}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={themedStyles.settingButton}>
            <Text style={themedStyles.settingButtonText}>App Version</Text>
            <Text style={themedStyles.settingValue}>1.0.0</Text>
          </TouchableOpacity>

          <SignOutButton />
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}

// Dynamic styles based on theme
function getThemedStyles(theme: 'light' | 'dark') {
  const isDark = theme === 'dark';
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#181f2a' : '#FFFAF0', // deep blue for dark mode
      paddingTop: StatusBar.currentHeight,
    },
    header: {
      fontSize: 30,
      fontWeight: 'bold',
      color: isDark ? '#7ecbff' : '#FF6347', // blue accent in dark
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
      color: isDark ? '#4ea8de' : '#FF8C00', // blue accent in dark
      marginTop: 20,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#22304a' : '#FFDAB9', // blue border in dark
      paddingBottom: 5,
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: isDark ? '#232f47' : '#FFF5EE', // blue card in dark
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 15,
      marginBottom: 10,
      shadowColor: isDark ? '#0057b8' : '#FF8C00', // blue shadow in dark
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 4,
      elevation: 2,
      height: verticalScale(50),
    },
    settingText: {
      fontSize: 18,
      color: isDark ? '#e0e6f7' : '#333333', // light blue text in dark
    },
    settingValue: {
      fontSize: 16,
      color: isDark ? '#a3bffa' : '#666666', // soft blue in dark
    },
    settingButton: {
      backgroundColor: isDark ? '#22304a' : '#FFDAB9', // blue button in dark
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 15,
      marginBottom: 10,
      alignItems: 'center',
      shadowColor: isDark ? '#0057b8' : '#FF8C00',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 4,
      elevation: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: verticalScale(50),
    },
    settingButtonText: {
      fontSize: 18,
      color: isDark ? '#7ecbff' : '#FF6347', // blue accent in dark
      fontWeight: '500',
    },
  });
}