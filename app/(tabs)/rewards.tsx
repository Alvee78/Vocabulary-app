import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { scale } from 'react-native-size-matters'
import ScreenWrapper from '../../Components/ScreenWraper2'
import { useTheme } from '../../context/ThemeContext'

const achievements = [
  { id: '1', title: 'First Quiz Completed', points: 50, unlocked: true },
  { id: '2', title: 'Learned 100 Words', points: 100, unlocked: true },
  { id: '3', title: '7-Day Streak', points: 70, unlocked: false },
  { id: '4', title: 'Achieved 500 Points', points: 150, unlocked: false },
  { id: '5', title: 'Completed All Chapters', points: 200, unlocked: false },
  { id: '6', title: 'Shared App with Friends', points: 80, unlocked: false },
  { id: '7', title: 'Participated in Feedback', points: 60, unlocked: false },
  { id: '8', title: 'Daily Practice for a Month', points: 120, unlocked: false },
  { id: '9', title: 'Mastered 50 New Words', points: 90, unlocked: false },
  { id: '10', title: 'Achieved Perfect Score in Quiz', points: 200, unlocked: false },
  { id: '11', title: 'Completed All Quizzes', points: 250, unlocked: false },
  // Add more achievements as you wish
]

export default function Rewards() {
  const userPoints = 320
  const { theme } = useTheme()
  const styles = getThemedStyles(theme)

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="trophy" size={60} color={theme === 'dark' ? "#7ecbff" : "#FFD700"} />
          <Text style={styles.pointsText}>{userPoints} Points</Text>
          <Text style={styles.subtitle}>Your Achievements</Text>
        </View>
        <FlatList
          data={achievements}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={[
              styles.achievementCard,
              item.unlocked && styles.achievementCardUnlocked
            ]}>
              {item.unlocked ? (
                <Ionicons name="star" size={28} color={theme === 'dark' ? "#7ecbff" : "#FF9900"} style={{ marginRight: 12 }} />
              ) : (
                <Ionicons name="lock-closed" size={28} color={theme === 'dark' ? "#22304a" : "#FFD59E"} style={{ marginRight: 12 }} />
              )}
              <View>
                <Text style={[
                  styles.achievementTitle,
                  item.unlocked && styles.achievementTitleUnlocked
                ]}>
                  {item.title}
                </Text>
                <Text style={[
                  styles.achievementPoints,
                  item.unlocked && styles.achievementPointsUnlocked
                ]}>
                  +{item.points} pts
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </ScreenWrapper>
  )
}

function getThemedStyles(theme: 'light' | 'dark') {
  const isDark = theme === 'dark'
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#181f2a' : '#FFF4E0',
      alignItems: 'center',
      paddingTop: 40,
      paddingHorizontal: 18,
    },
    header: {
      alignItems: 'center',
      marginBottom: 30,
    },
    pointsText: {
      fontSize: scale(32),
      fontWeight: 'bold',
      color: isDark ? '#7ecbff' : '#FF9900',
      marginTop: 10,
    },
    subtitle: {
      fontSize: 18,
      color: isDark ? '#b0b8d1' : '#555',
      marginTop: 6,
      marginBottom: 10,
    },
    list: {
      width: '100%',
      paddingBottom: 30,
    },
    achievementCard: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#232f47' : '#fff',
      borderRadius: 14,
      padding: 16,
      marginBottom: 14,
      shadowColor: isDark ? '#0057b8' : '#FFA500',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      elevation: 2,
    },
    achievementTitle: {
      fontSize: 17,
      fontWeight: '600',
      color: isDark ? '#e0e6f7' : '#222',
    },
    achievementPoints: {
      fontSize: 14,
      color: isDark ? '#7ecbff' : '#FF9900',
      marginTop: 2,
    },
    achievementCardUnlocked: {
      backgroundColor: isDark ? '#22304a' : '#FFF8E1',
      borderColor: isDark ? '#7ecbff' : '#FF9900',
      shadowColor: isDark ? '#7ecbff' : '#FF9900',
      elevation: 4,
    },
    achievementTitleUnlocked: {
      color: isDark ? '#7ecbff' : '#FF9900',
    },
    achievementPointsUnlocked: {
      color: isDark ? '#b0b8d1' : '#B8860B',
    },
  })
}