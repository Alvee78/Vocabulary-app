import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';
import ScreenWrapper from '../../Components/ScreenWraper2';

// Theme colors
const themeColors = {
  light: {
    background: '#FFF8E1',
    cardBackground: '#FFFFFF',
    text: '#3E2723',
    headerText: '#BF360C',
    statusBadgeGreenBg: '#E8F5E9',
    statusBadgeGreenText: '#2E7D32',
    statusBadgeRedBg: '#FFEBEE',
    statusBadgeRedText: '#D32F2F',
    progressBarBackground: '#E0E0E0',
    chapterCardUnlockedBg: '#FFFFFF',
    chapterCardUnlockedBorder: '#E0E0E0',
    chapterCardLockedBg: '#F5F5F5',
    chapterCardLockedBorder: '#EEEEEE',
    descriptionText: '#616161',
  },
  dark: {
    background: '#1A237E',
    cardBackground: '#232f47',
    text: '#E0F2F7',
    headerText: '#BBDEFB',
    statusBadgeGreenBg: '#4CAF50',
    statusBadgeGreenText: '#E0F2F7',
    statusBadgeRedBg: '#F44336',
    statusBadgeRedText: '#E0F2F7',
    progressBarBackground: '#3F51B5',
    chapterCardUnlockedBg: '#283593',
    chapterCardUnlockedBorder: '#3F51B5',
    chapterCardLockedBg: '#1A237E',
    chapterCardLockedBorder: '#283593',
    descriptionText: '#90CAF9',
  },
};

const chapters = [
  { id: 1, title: "Chapter 1: Basics", description: "Learn common everyday vocabulary." },
  { id: 2, title: "Chapter 2: Emotions", description: "Words to describe feelings and moods." },
  { id: 3, title: "Chapter 3: Travel", description: "Essential travel and tourism vocabulary." },
  { id: 4, title: "Chapter 4: Work & Career", description: "Words used in professional settings." },
  { id: 5, title: "Chapter 5: Technology", description: "Tech-related words and expressions." },
  { id: 6, title: "Chapter 6: Food & Drink", description: "Vocabulary related to food and beverages." },
  { id: 7, title: "Chapter 7: Health & Fitness", description: "Words about health, exercise, and wellness." },
  { id: 8, title: "Chapter 8: Nature & Environment", description: "Terms related to nature and environmental issues." },
  { id: 9, title: "Chapter 9: Arts & Culture", description: "Words about art, music, and cultural topics." },
  { id: 10, title: "Chapter 10: Science & Education", description: "Vocabulary for scientific concepts and education." },
];

const initialUserAppData = {
  userName: "Learner Pro",
  score: 1250,
  theme: "light",
  level: 7,
  ...chapters.reduce((acc, chapter, index) => {
    let totalMarks = 0;
    let maxMarks = 10;
    let unlocked = false;
    let passedQuizzes = false;

    if (index < 5) {
      unlocked = true;
      totalMarks = Math.floor(Math.random() * 3) + 7;
      passedQuizzes = true;
    } else if (index < 10) {
      unlocked = true;
      totalMarks = Math.floor(Math.random() * 6) + 4;
      passedQuizzes = totalMarks >= 7;
    } else {
      unlocked = false;
      totalMarks = 0;
      passedQuizzes = false;
    }

    if (chapter.id === 7) maxMarks = 15;
    if (chapter.id >= 8 && chapter.id <= 10) maxMarks = 20;
    if (chapter.id >= 13 && chapter.id <= 14) maxMarks = 25;
    if (chapter.id === 15) maxMarks = 30;

    acc[chapter.id] = {
      unlocked,
      totalMarks,
      maxMarks,
      passedQuizzes,
      chapterName: chapter.title,
      description: chapter.description,
    };
    return acc;
  }, {}),
};

export default function Progress() {
  const { theme } = useTheme();
  const colors = themeColors[theme];
  const [data, setData] = useState(null);
  const [unlockedChaptersCount, setUnlockedChaptersCount] = useState(0);
  const [passedQuizzesCount, setPassedQuizzesCount] = useState(0);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('appData');
        let currentAppData;
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          currentAppData = {
            ...initialUserAppData,
            ...parsedData,
            ...chapters.reduce((acc, chapter) => {
              acc[chapter.id] = {
                ...initialUserAppData[chapter.id],
                ...parsedData[chapter.id],
                chapterName: chapter.title,
                description: chapter.description,
              };
              return acc;
            }, {}),
          };
        } else {
          await AsyncStorage.setItem('appData', JSON.stringify(initialUserAppData));
          currentAppData = initialUserAppData;
        }
        setData(currentAppData);
      } catch (error) {
        setData(initialUserAppData);
      }
    };
    loadUserData();
  }, []);

  useEffect(() => {
    if (data) {
      let tempUnlockedChapters = 0;
      let tempPassedQuizzes = 0;
      chapters.forEach((chapter) => {
        const chapterData = data[chapter.id];
        if (chapterData) {
          if (chapterData.unlocked) tempUnlockedChapters++;
          if (chapterData.passedQuizzes) tempPassedQuizzes++;
        }
      });
      setUnlockedChaptersCount(tempUnlockedChapters);
      setPassedQuizzesCount(tempPassedQuizzes);
    }
  }, [data]);

  if (!data) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.headerText} />
        <Text style={[styles.loadingText, { color: colors.headerText }]}>Loading your progress...</Text>
      </View>
    );
  }

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: "transparent" }]}>
        {/* Header and User Info */}
        <View style={styles.headerContainer}>
          <Text style={[styles.mainHeader, { color: colors.headerText }]}>Your Learning Journey</Text>
          <Text style={[styles.subHeader, { color: colors.text }]}>
            Welcome back, <Text style={[styles.userName, { color: colors.headerText }]}>{data.userName}</Text>!
          </Text>
          <View style={styles.infoGrid}>
            <View style={[styles.infoCard, { backgroundColor: colors.cardBackground }]}>
              <Text style={[styles.infoCardLabel, { color: colors.headerText }]}>Total Score</Text>
              <Text style={[styles.infoCardValue, { color: colors.text }]}>{data.score}</Text>
            </View>
            <View style={[styles.infoCard, { backgroundColor: colors.cardBackground }]}>
              <Text style={[styles.infoCardLabel, { color: colors.headerText }]}>Current Level</Text>
              <Text style={[styles.infoCardValue, { color: colors.text }]}>{data.level}</Text>
            </View>
            <View style={[styles.infoCard, { backgroundColor: colors.cardBackground }]}>
              <Text style={[styles.infoCardLabel, { color: colors.headerText }]}>Quizzes Passed</Text>
              <Text style={[styles.infoCardValue, { color: colors.text }]}>{passedQuizzesCount} / {unlockedChaptersCount}</Text>
            </View>
          </View>
        </View>

        {/* Detailed Chapter List */}
        <View style={[styles.detailListCard, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.detailListHeader, { color: colors.text }]}>Detailed Chapter Status</Text>
          <View style={styles.chapterGrid}>
            {chapters.map((chapter) => {
              const chapterData = data[chapter.id];
              if (!chapterData) return null;

              const progressPercentage = Math.round((chapterData.totalMarks / chapterData.maxMarks) * 100);

              return (
                <View
                  key={chapter.id}
                  style={[
                    styles.chapterCard,
                    chapterData.unlocked ?
                      [styles.chapterCardUnlocked, { backgroundColor: colors.chapterCardUnlockedBg, borderColor: colors.chapterCardUnlockedBorder }] :
                      [styles.chapterCardLocked, { backgroundColor: colors.chapterCardLockedBg, borderColor: colors.chapterCardLockedBorder }],
                  ]}
                >
                  <View style={styles.chapterCardHeader}>
                    <View>
                                          <Text
                      style={[styles.chapterCardTitle, { color: colors.headerText }]}
                      numberOfLines={4}
                    >
                      {chapter.title}
                    </Text>
                    </View>
                    <Text
                      style={[
                        styles.chapterStatusBadge,
                        chapterData.unlocked ? styles.statusBadgeGreen : styles.statusBadgeRed,
                        {
                          backgroundColor: chapterData.unlocked ? colors.statusBadgeGreenBg : colors.statusBadgeRedBg,
                          color: chapterData.unlocked ? colors.statusBadgeGreenText : colors.statusBadgeRedText,
                        }
                      ]}
                    >
                      {chapterData.unlocked ? 'Unlocked' : 'Locked'}
                    </Text>
                  </View>
                  <View style={[styles.progressBarBackground, { backgroundColor: colors.progressBarBackground }]}>
                    <View
                      style={[
                        styles.progressBarFill,
                        { width: `${progressPercentage}%`, backgroundColor: chapterData.unlocked ? '#4CAF50' : '#aaa' },
                      ]}
                    />
                  </View>
                  <Text style={[styles.chapterProgressText, { color: colors.text }]}>Progress: {progressPercentage}%</Text>
                  {chapterData.unlocked && (
                    <>
                      <Text style={[styles.chapterMaxMarksText, { color: colors.text }]}>Max Marks: {chapterData.maxMarks}</Text>
                      <Text style={[styles.chapterQuizStatusText, { color: colors.text }]}>
                        Quiz Status:{' '}
                        <Text
                          style={chapterData.passedQuizzes ? styles.quizStatusPassed : styles.quizStatusNotPassed}
                        >
                          {chapterData.passedQuizzes ? 'Passed' : 'Not Passed'}
                        </Text>
                      </Text>
                    </>
                  )}
                  <Text style={[styles.chapterDescription, { color: colors.descriptionText }]}>{chapter.description}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  container: {
    padding: 16,
    paddingTop: 40,
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  mainHeader: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
  },
  userName: {
    fontWeight: 'bold',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
  },
  infoCard: {
    flex: 1,
    minWidth: 100,
    margin: 4,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoCardLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  infoCardValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailListCard: {
    borderRadius: 16,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  detailListHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  chapterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  chapterCard: {
    width: '48%',
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
  },
  chapterCardUnlocked: {},
  chapterCardLocked: {
    opacity: 0.8,
  },
  chapterCardHeader: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  chapterCardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    flexShrink: 1,
    marginRight: 8,
    letterSpacing: 0.2,
  },
  chapterStatusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  statusBadgeGreen: {},
  statusBadgeRed: {},
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  chapterProgressText: {
    fontSize: 13,
    marginBottom: 4,
  },
  chapterMaxMarksText: {
    fontSize: 13,
    marginBottom: 4,
  },
  chapterQuizStatusText: {
    fontSize: 13,
    marginBottom: 4,
  },
  quizStatusPassed: {
    fontWeight: 'bold',
    color: '#388E3C',
  },
  quizStatusNotPassed: {
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  chapterDescription: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 8,
  },
});