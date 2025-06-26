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
