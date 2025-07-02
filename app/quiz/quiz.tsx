import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { quizData } from '../../Data/quizData';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import CustomButton from '../../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateinsertUserAppData } from '../../config/CloudData/updateInsert';
import { useUser } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';

const Quiz = () => {
  const { user } = useUser();
  const userId = user?.id || '';
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const numberOfQuestions = 10;
  const { chapterNo } = useLocalSearchParams();
  const chapterNoInt = Number(chapterNo);
  const router = useRouter();
  
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
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={['#FFF4E0', '#FFE5B4']}
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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  questionBlock: {
    marginBottom: 30,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionButton: {
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
  },
  selectedOption: {
    backgroundColor: '#d0e8ff',
  },
  correctOption: {
    backgroundColor: '#a4f4a4',
  },
  incorrectOption: {
    backgroundColor: '#f4a4a4',
  },
  resultBlock: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default Quiz;
