import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'chapterProgress';

export interface QuizPartProgress {
  score: number;
  completed: boolean;
}

export interface ChapterProgress {
  [partId: string]: QuizPartProgress;
}

export interface AllProgress {
  [chapterId: string]: ChapterProgress;
}

// ✅ Save score only if it's higher than the existing one
export const saveMaxQuizResult = async (
  chapterId: string,
  partId: string,
  newScore: number
): Promise<void> => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const data: AllProgress = raw ? JSON.parse(raw) : {};

    if (!data[chapterId]) data[chapterId] = {};
    const existingScore = data[chapterId][partId]?.score || 0;

    if (newScore > existingScore) {
      data[chapterId][partId] = {
        score: newScore,
        completed: true,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  } catch (error) {
    console.error('Error saving quiz result:', error);
  }
};

// ✅ Get all stored progress
export const getAllProgress = async (): Promise<AllProgress> => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.error('Error getting progress:', error);
    return {};
  }
};

// ✅ Calculate total score of a chapter
export const getChapterScore = (chapterData: ChapterProgress | undefined): number => {
  if (!chapterData) return 0;
  return Object.values(chapterData).reduce((sum, part) => sum + (part?.score || 0), 0);
};

// ✅ Check if a chapter is unlocked
export const isChapterUnlocked = (
  chapterIndex: number,
  allProgress: AllProgress,
  threshold: number = 20
): boolean => {
  if (chapterIndex === 1) return true;
  const prevChapterId = `chapter${chapterIndex - 1}`;
  const prevScore = getChapterScore(allProgress[prevChapterId]);
  return prevScore >= threshold;
};

// ✅ Optional: Reset all stored progress
export const resetAllProgress = async (): Promise<void> => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};


// import React, { useEffect, useState } from 'react';
// import { Text, View, ScrollView } from 'react-native';
// import * as FileSystem from 'expo-file-system';
// import { Asset } from 'expo-asset';
// import { openDatabaseSync } from 'expo-sqlite';

// export default function App() {
//   const [tables, setTables] = useState<string[]>([]);

//   useEffect(() => {
//     const loadDB = async () => {
//       const dbFileName = 'test.db';
//       const targetPath = FileSystem.documentDirectory + 'SQLite/' + dbFileName;

//       // Ensure target folder exists
//       await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite', {
//         intermediates: true,
//       });

//       // Copy DB from assets if not already in filesystem
//       const fileInfo = await FileSystem.getInfoAsync(targetPath);
//       if (!fileInfo.exists) {
//         const asset = Asset.fromModule(require('./assets/test.db'));
//         await asset.downloadAsync(); // make sure it's loaded
//         await FileSystem.copyAsync({
//           from: asset.localUri!,
//           to: targetPath,
//         });
//       }

//       // Open the database using the new API
//       const db = openDatabaseSync(dbFileName);

//       // Query all table names
//       const result = db.getAllSync(
//         `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';`
//       );

//       const tableNames = result.map((row) => row.name);
//       setTables(tableNames);
//     };

//     loadDB();
//   }, []);

//   return (
//     <ScrollView contentContainerStyle={{ padding: 20 }}>
//       <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Tables in test.db:</Text>
//       {tables.length === 0 ? (
//         <Text>Loading or no tables found.</Text>
//       ) : (
//         tables.map((table, index) => (
//           <Text key={index} style={{ fontSize: 16, marginVertical: 4 }}>
//             • {table}
//           </Text>
//         ))
//       )}
//     </ScrollView>
//   );
// }
