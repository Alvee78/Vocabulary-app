import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { userAppData } from '../../Data/appData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const progress = () => {
//     const [data, setData] = React.useState(userAppData);
//     useEffect(() => {
//         // Load user app data from AsyncStorage or any other source
//         const loadUserData = async () => {
//             const storedData = await AsyncStorage.getItem('appData');
//             if (storedData) {
//                 const parsedData = JSON.parse(storedData);
//                 setData(parsedData);
//             } else {
//                 // If no data found, use default userAppData
//                 setData(userAppData);
//             }
//         };
//         loadUserData();
//     }, []);
  return (
    <View>
      <Text>progress</Text>
    </View>
  )
}

export default progress

const styles = StyleSheet.create({})

// export const userAppData = {
//     userName: "User Name",
//     score: 0,
//     theme: "light",
//     level:0,
//     1: {
//         unlocked : true,
//         totalMarks: 0,
//         maxMarks:10,
//         passedQuizzes: false,
//     },
//     2: {
//         unlocked : false,
//         totalMarks: 0,
//         maxMarks:10,
//         passedQuizzes: false,
//     },
//     3: {
//         unlocked : false,
//         totalMarks: 0,
//         maxMarks:10,
//         passedQuizzes: false,
//     },
//     4: {
//         unlocked : false,
//         totalMarks: 0,
//         maxMarks:10,
//         passedQuizzes: false,
//     },
//     5: {
//         unlocked : false,
//         totalMarks: 0,
//         maxMarks:10,
//         passedQuizzes: false,
//     },
//     6: {
//         unlocked : false,
//         totalMarks: 0,
//         maxMarks:10,
//         passedQuizzes: false,
//     },
//     7: {
//         unlocked : false,
//         totalMarks: 0,
//         maxMarks:15,
//         passedQuizzes: false,
//     },
//     8: {
//         unlocked : false,
//         totalMarks: 0,
//         maxMarks:20,
//         passedQuizzes: false,
//     },
//     9: {
//         unlocked : false,
//         totalMarks: 0,
//         maxMarks:20,
//         passedQuizzes: false,
//     },
//     10: {
//         unlocked : false,
//         totalMarks: 0,
//         maxMarks:20,
//         passedQuizzes: false,
//     }
// }