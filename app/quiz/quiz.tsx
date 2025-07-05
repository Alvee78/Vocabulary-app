import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { quizData } from '../../Data/quizData';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import CustomButton from '../../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateinsertUserAppData } from '../../config/CloudData/updateInsert';
import { useUser } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import ScreenWrapper from '../../Components/ScreenWraper2';

const Quiz = () => {
  const { user } = useUser();
  const userId = user?.id || '';
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const numberOfQuestions = 10;
  const { chapterNo } = useLocalSearchParams();
  const chapterNoInt = Number(chapterNo);
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const styles = getThemedStyles(isDark);
  
  const passedQuizzes = (score: number, maxScore: number) => {
    return score / maxScore >= 0.8;
  }
 
  const data = useMemo(() => {
    const initialData = quizData[chapterNoInt];
    return [...initialData].sort(() => Math.random() - 0.5).slice(0, numberOfQuestions);
  }, [chapterNoInt]); // Only re-shuffle if chapterNo changes

  const handleOptionSelect = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < data.length) {
      Alert.alert('Please answer all questions.');
      return;
    }
    setSubmitted(true);
  };

  const getResults =  () => {
    let score = 0;

    let details: {
    question: string;
    selected: string;
    correct: string;
    isCorrect: boolean;
    }[] = [];

    data.forEach((item) => {
      const isCorrect = answers[item.id] === item.correctAnswer;
      if (isCorrect) score++;
      details.push({
        question: item.question,
        selected: answers[item.id],
        correct: item.correctAnswer,
        isCorrect,
      });
    });
    updateAppData(score); // Update app data with the score
    // Update the appData with the score
    return { score, details };
  };
  const updateAppData = async (score: number) => {
        const appData = await AsyncStorage.getItem('appData');
        const parsedData = appData ? JSON.parse(appData) : {};
        parsedData[chapterNoInt].totalMarks = score > parsedData[chapterNoInt].totalMarks ? score : parsedData[chapterNoInt].totalMarks;
        parsedData[chapterNoInt].passedQuizzes = passedQuizzes(score, data.length);
        if(parsedData[chapterNoInt].passedQuizzes && chapterNoInt < 10) {
          parsedData[chapterNoInt + 1].unlocked = true;
        }
        const jsonString = JSON.stringify(parsedData);
        await AsyncStorage.setItem('appData', jsonString);
        //try to upload the data to the server
        await updateinsertUserAppData(userId,jsonString);
  }

  const results = submitted ? getResults() : null;

  return (
    <ScreenWrapper>
    <View style={{ padding: 16, backgroundColor: theme === 'dark' ? '#232f47' : '#fff5f0', borderBottomWidth: 1, borderBottomColor: theme === 'dark' ? '#22304a' : '#ffe4d6' ,marginBottom: 16 }}>
      <Text style={styles.headerTitle}>Chapter {chapterNoInt} Quiz</Text>
    </View>
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={isDark ? ['#1a2236', '#232f47'] : ['#FFF4E0', '#FFE5B4']}
        style={StyleSheet.absoluteFill}
      />
      {data.map((q) => (
        <View key={q.id} style={styles.questionBlock}>
          <Text style={styles.questionText}>{q.question}</Text>
          {q.options.map((opt) => {
            const isSelected = answers[q.id] === opt;
            const isCorrect = q.correctAnswer === opt;
            const isIncorrect = submitted && isSelected && !isCorrect;

            return (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.optionButton,
                  isSelected && styles.selectedOption,
                  submitted && isCorrect && styles.correctOption,
                  isIncorrect && styles.incorrectOption,
                ]}
                onPress={() => handleOptionSelect(q.id, opt)}
                disabled={submitted}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      {!submitted ? (
      <Button title="Submit Quiz" onPress={handleSubmit} />
    ) : (
      <View style={styles.resultBlock}>
        <Text style={styles.resultText}>
          {results
            ? `You got ${results.score} out of ${data.length} correct!`
            : null}
        </Text>
        <CustomButton
          title="Go to Home Page"
          onPress={() => {
            router.replace('(tabs)');
          }}
        />
      </View>
    )}
    </ScrollView>
    </ScreenWrapper>
  );
};

function getThemedStyles(isDark: boolean) {
  return StyleSheet.create({
    container: {
      padding: 20,
      paddingBottom: 100,
      backgroundColor: isDark ? '#181f2a' : 'transparent',
      minHeight: '100%',
    },
    questionBlock: {
      marginBottom: 30,
      backgroundColor: isDark ? '#232f47' : '#fff',
      borderRadius: 12,
      padding: 16,
      shadowColor: isDark ? '#0057b8' : '#FFD59E',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.10,
      shadowRadius: 6,
      elevation: 2,
    },
    questionText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: isDark ? '#7ecbff' : '#222',
    },
    optionButton: {
      padding: 12,
      backgroundColor: isDark ? '#22304a' : '#eee',
      borderRadius: 8,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: isDark ? '#2d3553' : '#ddd',
    },
    optionText: {
      fontSize: 16,
      color: isDark ? '#e0e6f7' : '#222',
    },
    selectedOption: {
      backgroundColor: isDark ? '#0057b8' : '#d0e8ff',
      borderColor: isDark ? '#7ecbff' : '#007bff',
    },
    correctOption: {
      backgroundColor: isDark ? '#28a745' : '#a4f4a4',
      borderColor: isDark ? '#28a745' : '#34c759',
    },
    incorrectOption: {
      backgroundColor: isDark ? '#b22234' : '#f4a4a4',
      borderColor: isDark ? '#ff4d6d' : '#e57373',
    },
    resultBlock: {
      marginTop: 30,
      padding: 15,
      backgroundColor: isDark ? '#232f47' : '#f0f0f0',
      borderRadius: 8,
      shadowColor: isDark ? '#0057b8' : '#FFD59E',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.10,
      shadowRadius: 6,
      elevation: 2,
    },
    resultText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#7ecbff' : '#333',
      textAlign: 'center',
      marginBottom: 15,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#7ecbff' : '#222',
      marginBottom: 8,
    },
  });
}

export default Quiz;
