import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Button,
  Modal,
  RefreshControl,
} from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import ScreenWrapper from '../../Components/ScreenWraper2';
import { useTheme } from '../../context/ThemeContext';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

// Define the database file name
const DATABASE_NAME = 'dictionary.db';

// Define the interface for a dictionary entry
interface DictionaryEntry {
  id: number;
  word: string;
  meaning: string;
  partsOfSpeech: string;
  example: string;
  isFavorite: number; // SQLite stores booleans as 0 or 1
}

export default function App() {
  const { theme } = useTheme();
  const styles = getThemedStyles(theme);
  return (
    <ScreenWrapper>
      <Content />
    </ScreenWrapper>
  );
}

export function Content() {
  const db = useSQLiteContext();
  const { theme } = useTheme();
  const styles = getThemedStyles(theme);
  const [entries, setEntries] = useState<DictionaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchResults, setSearchResults] = useState<DictionaryEntry[] | null>(null);
  const [noResults, setNoResults] = useState(false); // This state is still useful for initial empty state

  const [refreshing, setRefreshing] = useState(false);

  const loadFavoriteWords = async () => {
    try {
      const result = await db.getAllAsync<DictionaryEntry>(
        'SELECT * FROM Dictionary WHERE isFavorite = 1 ORDER BY word ASC;'
      );
      setEntries(result);
      setSearchResults(null);
      setNoResults(result.length === 0); // Correctly set noResults based on fetched data
    } catch (err) {
      console.error('Error loading favorite words:', err);
      setError('Failed to load favorite dictionary entries.');
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Clear previous error message on refresh attempt
      setError(null);
      await loadFavoriteWords();
    } catch (err) {
      console.error("Error during pull-to-refresh:", err);
      Alert.alert("Refresh Error", "Could not refresh data.");
      setError("Could not refresh data."); // Set error if refresh fails
    } finally {
      setRefreshing(false);
    }
  }, [db]);

  useEffect(() => {
    async function setupDatabaseAndLoadData() {
      if (!db) {
        return;
      }
      try {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS "Dictionary" (
              "id" INTEGER PRIMARY KEY AUTOINCREMENT,
              "word" TEXT,
              "meaning" TEXT,
              "partsOfSpeech" TEXT,
              "example" TEXT,
              "isFavorite" INTEGER
          );
        `);
        console.log('Dictionary table ensured.');

        await loadFavoriteWords();
        setIsLoading(false);
      } catch (err) {
        console.error('Error setting up database or loading initial data:', err);
        setError('Failed to initialize database or load data.');
        setIsLoading(false);
      }
    }
    setupDatabaseAndLoadData();
  }, [db]);



  const toggleFavorite = async (id: number, currentStatus: number) => {
    if (!db) {
      Alert.alert('Error', 'Database not initialized.');
      return;
    }
    const newStatus = currentStatus === 1 ? 0 : 1;
    try {
      await db.runAsync(
        'UPDATE Dictionary SET isFavorite = ? WHERE id = ?;',
        [newStatus, id]
      );
      console.log(`Word ID ${id} favorite status toggled to ${newStatus}`);

      if (searchResults !== null) {
        setSearchResults(prevResults =>
          prevResults.map(entry =>
            entry.id === id ? { ...entry, isFavorite: newStatus } : entry
          )
        );
      } else {
        // Optimistically update if unfavoriting, otherwise re-fetch for accuracy
        if (newStatus === 0) {
            setEntries(prevEntries => {
                const updatedEntries = prevEntries.filter(entry => entry.id !== id);
                // If the list becomes empty after unfavoriting the last item
                setNoResults(updatedEntries.length === 0);
                return updatedEntries;
            });
        } else {
            // Re-fetch to ensure newly favorited item appears in correct sorted order
            await loadFavoriteWords();
        }
      }

    } catch (err) {
      console.error('Error toggling favorite status:', err);
      Alert.alert('Error', 'Failed to update favorite status.');
    }
  };

  const dataToShow = searchResults !== null ? searchResults : entries;

  // Handle loading and error states first
  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading dictionary...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Text style={styles.errorText}>Please ensure 'dictionary.db' is in your 'assets' folder and is valid.</Text>
        {/* Option to retry loading */}
        <TouchableOpacity style={styles.addButton} onPress={onRefresh}>
          <Text style={styles.addButtonText}>Retry Load</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <ScreenWrapper>
    <View style={styles.container}>
      <Text style={styles.header}>My Favorite</Text>

      <ScrollView
        style={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007bff']}
            tintColor={'#007bff'}
          />
        }
      >
        <Text style={styles.listHeader}>
          "Favorite Words List"
        </Text>
        {/* Improved conditional rendering for no data */}
        {dataToShow.length > 0 ? (
          dataToShow.map((entry) => (
            <View style={styles.itemContainer} key={entry.id}>
              <View style={styles.wordAndFavorite}>
                <Text style={styles.word}>{entry.word}</Text>
                <TouchableOpacity
                  onPress={() => toggleFavorite(entry.id, entry.isFavorite)}
                  style={styles.favoriteButton}
                >
                  <Text style={[styles.favoriteIcon, { color: entry.isFavorite === 1 ? '#ffc107' : '#ced4da' }]}>
                    ⭐
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.partsOfSpeech}>({entry.partsOfSpeech || 'N/A'})</Text>
              <Text style={styles.meaning}>{entry.meaning}</Text>
              {entry.example ? (
                <Text style={styles.example}>Example: "{entry.example}"</Text>
              ) : null}
            </View>
          ))
        ) : (
          // This block only shows if dataToShow is empty and we are NOT loading or have an error
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>
              No favorite words yet. Tap the ⭐ on other screens to add some!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  </ScreenWrapper>
  );
}

function getThemedStyles(theme: 'light' | 'dark') {
  const isDark = theme === 'dark';

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      paddingTop: StatusBar.currentHeight,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? '#343a40' : '#f8f9fa',
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: isDark ? '#ffffff' : '#343a40',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? '#343a40' : '#ffe0e0',
      padding: 20,
    },
    errorText: {
      fontSize: 16,
      color: isDark ? '#ffffff' : '#dc3545',
      textAlign: 'center',
      marginBottom: 5,
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#212529',
      textAlign: 'center',
      marginVertical: 0,
      paddingHorizontal: 15,
    },
    addWordHeader: {
      fontSize: 22,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#343a40',
      marginBottom: 15,
      textAlign: 'center',
    },
    input: {
      height: 45,
      borderColor: isDark ? '#495057' : '#ced4da',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 10,
      fontSize: 16,
      backgroundColor: isDark ? '#495057' : '#ffffff',
    },
    addButton: {
      backgroundColor: isDark ? '#28a745' : '#28a745',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
      shadowColor: isDark ? '#000' : '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
    },
    addButtonText: {
      color: isDark ? '#ffffff' : '#ffffff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    cancelButton: {
      backgroundColor: isDark ? '#6c757d' : '#6c757d',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
      shadowColor: isDark ? '#000' : '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
    },
    cancelButtonText: {
      color: isDark ? '#ffffff' : '#ffffff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      gap: 8,
      paddingHorizontal: 15,
    },
    searchInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: isDark ? '#495057' : '#aaa',
      borderRadius: 8,
      padding: 8,
      fontSize: 16,
      backgroundColor: isDark ? '#495057' : '#ffffff',
    },
    actionButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 15,
      marginBottom: 10,
      gap: 10,
    },
    shuffleButton: {
      backgroundColor: isDark ? '#ffc107' : '#ffc107',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      flex: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
    },
    shuffleButtonText: {
      color: isDark ? '#ffffff' : '#343a40',
      fontSize: 16,
      fontWeight: 'bold',
    },
    favoritesButton: {
      backgroundColor: isDark ? '#17a2b8' : '#17a2b8',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      flex: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
    },
    favoritesButtonText: {
      color: isDark ? '#ffffff' : '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    listHeader: {
      fontSize: 22,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#343a40',
      marginBottom: 15,
      marginTop: 10,
      textAlign: 'center',
    },
    listContainer: {
      flex: 1,
      paddingHorizontal: 15,
    },
itemContainer: {
  backgroundColor: isDark ? '#232f47' : '#ffffff', // darker card for dark mode
  borderRadius: 12,
  padding: 16,
  marginBottom: 14,
  shadowColor: isDark ? '#000' : '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.18,
  shadowRadius: 4,
  elevation: 4,
  borderLeftWidth: 5,
  borderLeftColor: isDark ? '#0057b8' : '#007bff', // dark blue for dark mode
},
    wordAndFavorite: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
    },
    word: {
  fontSize: 22,
  fontWeight: 'bold',
  color: isDark ? '#7ecbff' : '#007bff', // light blue in dark mode
  flexShrink: 1,
  marginRight: 10,
},
    partsOfSpeech: {
  fontSize: 15,
  fontStyle: 'italic',
  color: isDark ? '#b0b8d1' : '#6c757d', // muted blue-gray in dark mode
  marginBottom: 5,
},
meaning: {
  fontSize: 17,
  color: isDark ? '#e0e6f7' : '#343a40', // near-white in dark mode
  lineHeight: 24,
  marginBottom: 10,
},
    example: {
  fontSize: 15,
  color: isDark ? '#a3bffa' : '#495057', // soft blue in dark mode
  fontStyle: 'italic',
  borderLeftWidth: 2,
  borderLeftColor: isDark ? '#3b5998' : '#ced4da', // blue border in dark mode
  paddingLeft: 10,
  marginBottom: 5,
},
    favoriteButton: {
      padding: 5,
    },
    favoriteIcon: {
      fontSize: 24,
    },
    noDataContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    noDataText: {
      fontSize: 18,
      color: '#6c757d',
      textAlign: 'center',
      marginBottom: 10,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: '#ffffff',
      borderRadius: 15,
      padding: 25,
      width: '90%',
      maxHeight: '80%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    plusButton: {
      position: 'absolute',
      bottom: 10,
      right: 30,
      backgroundColor: '#007bff',
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 8,
      zIndex: 10,
    },
    plusButtonText: {
      color: '#ffffff',
      fontSize: 35,
      lineHeight: 35,
    },
  });
}