// import { SQLiteDatabase, SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
// import { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// import * as FileSystem from 'expo-file-system';
// import { Asset } from 'expo-asset';

// export default function App() {
//   return (
//     <View style={styles.container}>
    
        
//       <Content/>
//     </View>
//   );
// }
// export function MyFunc() {
//     const db = useSQLiteContext();
//     const [todos, setTodos] = useState([]);
//     const loadData = async () => {
//         const result = await db.getAllAsync('SELECT * FROM Dictionary limit 20');
//         setTodos(result);
//     };
//     useEffect(() => {
//         loadData();
//     }, []);

//     return (
//         <View style={styles.container}>
//             {todos.map((todo, index) => (
//                 <View style={styles.todoItemContainer} key={index}>
//                     <Text>{`${todo.id} - ${todo.word}`}</Text>
//                 </View>
//             ))}
//         </View>
//     );
// };


// interface Todo {
//   value: string;
//   intValue: number;
// }
// // CREATE TABLE IF NOT EXISTS "Dictionary" (
// //         "id"    INTEGER,
// //         "word"  TEXT,
// //         "meaning"       TEXT,
// //         "partsOfSpeech" TEXT,
// //         "example"       TEXT,
// //         "isFavorite"    INTEGER,
// //         PRIMARY KEY("id" AUTOINCREMENT)
// // );
// interface DictionaryEntry {
//   id: number;
//   word: string;
//   meaning: string;
//   partsOfSpeech: string;
//   example: string;
//   isFavorite: boolean;
// }

// export function Content() {
//   const db = useSQLiteContext();
//   const [entries, setEntries] = useState<DictionaryEntry[]>([]);

//   useEffect(() => {

//     async function setup() {
//       const result = await db.getAllAsync<DictionaryEntry>('SELECT * FROM Dictionary limit 5');
//       await db.execAsync(`update Dictionary set isFavorite = 0`);
//       setEntries(result);
//     }
    
//     setup();
//   }, []);

//   return (
//     <View style={styles.contentContainer}>
//       {entries.map((entry, index) => (
//         <View style={styles.todoItemContainer} key={index}>
//           <Text>{`${entry.id} - ${entry.word} - ${entry.meaning} - ${entry.partsOfSpeech} - ${entry.example} - ${entry.isFavorite}`}</Text>
//         </View>
//       ))}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   headerContainer: {
//     padding: 16,
//     backgroundColor: '#f8f8f8',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   contentContainer: {
//     padding: 16,
//   },
//   todoItemContainer: {
//     paddingVertical: 8,
//   },
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         padding: 16,
//     },
// });

//   export function Loader(){
//     const [isLoading, setIsLoading] = useState(true);
//     const db = useSQLiteContext();

//     const loadDB = async () => {
//       const dbFileName = 'dictionary.db';
//       const targetPath = FileSystem.documentDirectory + 'SQLite/' + dbFileName;

//       // Ensure target folder exists
//       await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite', {
//         intermediates: true,
//       });

//       // Copy DB from assets if not already in filesystem
//       const fileInfo = await FileSystem.getInfoAsync(targetPath);
//       if (!fileInfo.exists) {
//         const asset = Asset.fromModule(require('../../assets/database/dictionary.db'));
//         await asset.downloadAsync(); // make sure it's loaded
//         await FileSystem.copyAsync({
//           from: asset.localUri!,
//           to: targetPath,
//         });
//       }
//       setIsLoading(false);
//     }
//     useEffect(() => {
        
//         loadDB();
          
//     }, [db]);

//     if (isLoading) {
//       console.log("Loading...");
//       return <Text>Loading...</Text>;
//     }

//     return <Content />;
  
//   }
import React, { useState, useEffect } from 'react';
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
  Modal, // Import Modal for the pop-up functionality
} from 'react-native';
import { useSQLiteContext } from 'expo-sqlite'; // Only use useSQLiteContext, assuming SQLiteProvider is higher up
import ScreenWrapper from '../../Components/ScreenWraper2';
import { useTheme } from '../../context/ThemeContext';
import CustomButton from '../../Components/CustomButton';

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

// Placeholder for ScreenWrapper component as it's external
// In your actual project, ensure this component is correctly imported
// and provides flex: 1 and a background color.

const screenWrapperStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Example background color for ScreenWrapper
  },
});

export default function App() {
  return (
    // Removed SQLiteProvider as per request, assuming it's handled by parent layout
    <ScreenWrapper>
      {/* Content component will contain the main application logic */}
      <Content />
    </ScreenWrapper>
  );
}

export function Content() {
  const db = useSQLiteContext(); // Hook to access the SQLite database instance
  const [entries, setEntries] = useState<DictionaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme(); // Use theme context for dynamic styling
  const isDark = theme === 'dark'; // Determine if dark mode is enabled
  const styles = getThemedStyles(theme); // Get themed styles based on dark mode

  // State variables for new word input (moved to modal context)
  const [newWord, setNewWord] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [newPartsOfSpeech, setNewPartsOfSpeech] = useState('');
  const [newExample, setNewExample] = useState('');
  const [isAddWordModalVisible, setIsAddWordModalVisible] = useState(false); // State for modal visibility

  // State variables for search functionality
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<DictionaryEntry[] | null>(null);
  const [noResults, setNoResults] = useState(false);

  // useEffect to set up the database table and load initial data
  useEffect(() => {
    async function setupDatabaseAndLoadData() {
      if (!db) {
        // db is not yet available, wait for it
        return;
      }
      try {
        // Ensure the Dictionary table exists with the correct schema
        // This is crucial for new installs or if the DB is empty
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

        // Load initial random words for display
        await loadRandomWords();
        setIsLoading(false);
      } catch (err) {
        console.error('Error setting up database or loading initial data:', err);
        setError('Failed to initialize database or load data.');
        setIsLoading(false);
      }
    }
    setupDatabaseAndLoadData();
  }, [db]); // Dependency on db ensures this runs once db is available

  // Function to load 30 random words
  const loadRandomWords = async () => {
    try {
      const result = await db.getAllAsync<DictionaryEntry>(
        'SELECT * FROM Dictionary ORDER BY RANDOM() LIMIT 30'
      );
      setEntries(result);
      setSearchResults(null); // Clear search results when loading random words
      setNoResults(false);
    } catch (err) {
      console.error('Error loading random words:', err);
      setError('Failed to load random dictionary entries.');
    }
  };

  // Function to add a new word to the database
  const addWord = async () => {
    if (!db) {
      Alert.alert('Error', 'Database not initialized.');
      return;
    }
    if (!newWord.trim() || !newMeaning.trim()) {
      Alert.alert('Missing Info', 'Word and Meaning are required.');
      return;
    }

    try {
      // Use db.runAsync for INSERT operations
      const result = await db.runAsync(
        'INSERT INTO Dictionary (word, meaning, partsOfSpeech, example, isFavorite) VALUES (?, ?, ?, ?, ?);',
        [newWord.trim(), newMeaning.trim(), newPartsOfSpeech.trim(), newExample.trim(), 0] // isFavorite defaults to 0
      );
      console.log('Word added with ID:', result.lastInsertRowId);
      Alert.alert('Success', `"${newWord}" added to dictionary!`);

      // Clear input fields
      setNewWord('');
      setNewMeaning('');
      setNewPartsOfSpeech('');
      setNewExample('');
      setIsAddWordModalVisible(false); // Close modal after adding

      // Reload random words to include the new word (or clear search if active)
      await loadRandomWords();
    } catch (err) {
      console.error('Error adding word:', err);
      Alert.alert('Error', `Failed to add "${newWord}".`);
    }
  };

  // Function to toggle favorite status for a word
  const toggleFavorite = async (id: number, currentStatus: number) => {
    if (!db) {
      Alert.alert('Error', 'Database not initialized.');
      return;
    }
    const newStatus = currentStatus === 1 ? 0 : 1; // Toggle 0 to 1, or 1 to 0
    try {
      await db.runAsync(
        'UPDATE Dictionary SET isFavorite = ? WHERE id = ?;',
        [newStatus, id]
      );
      console.log(`Word ID ${id} favorite status toggled to ${newStatus}`);

      // Update local state directly to prevent re-shuffling
      if (searchResults !== null) {
        // If currently showing search results, update the searchResults state
        setSearchResults(prevResults =>
          prevResults.map(entry =>
            entry.id === id ? { ...entry, isFavorite: newStatus } : entry
          )
        );
      } else {
        // Otherwise, update the main entries state
        setEntries(prevEntries =>
          prevEntries.map(entry =>
            entry.id === id ? { ...entry, isFavorite: newStatus } : entry
          )
        );
      }

    } catch (err) {
      console.error('Error toggling favorite status:', err);
      Alert.alert('Error', 'Failed to update favorite status.');
    }
  };

  // Improved search handler
  const handleSearch = async () => {
    const query = search.trim();
    if (!query) {
      setSearchResults(null);
      setNoResults(false);
      await loadRandomWords(); // If search is cleared, load random words
      return;
    }

    try {
      // First, try to find exact matches (case-insensitive)
      const exactMatches = await db.getAllAsync<DictionaryEntry>(
        'SELECT * FROM Dictionary WHERE LOWER(word) = LOWER(?) LIMIT 30',
        [query]
      );

      // Then, find partial matches (excluding exact matches)
      const partialMatches = await db.getAllAsync<DictionaryEntry>(
        'SELECT * FROM Dictionary WHERE LOWER(word) LIKE LOWER(?) AND LOWER(word) != LOWER(?) LIMIT 30',
        [`%${query}%`, query]
      );

      const combinedResults = [...exactMatches, ...partialMatches];

      setSearchResults(combinedResults);
      setNoResults(combinedResults.length === 0);
    } catch (err) {
      console.error('Error during search:', err);
      Alert.alert('Search Error', 'Failed to perform search.');
      setSearchResults([]); // Clear results on error
      setNoResults(true);
    }
  };
  

  // Data to display: search results if searching, otherwise random entries
  const dataToShow = searchResults !== null ? searchResults : entries;

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
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>My Dictionary</Text>

      {/* Plus button to open add word modal */}
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => setIsAddWordModalVisible(true)}
      >
        <Text style={styles.plusButtonText}>+</Text>
      </TouchableOpacity>

      {/* Add Word Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddWordModalVisible}
        onRequestClose={() => setIsAddWordModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.addWordHeader}>Add New Word</Text>
            <TextInput
              style={styles.input}
              placeholder="Word (required)"
              placeholderTextColor={isDark ? '#ccc' : '#888'}
              value={newWord}
              onChangeText={setNewWord}
            />
            <TextInput
              style={styles.input}
              placeholder="Meaning (required)"
              placeholderTextColor={isDark ? '#ccc' : '#888'}
              value={newMeaning}
              onChangeText={setNewMeaning}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Parts of Speech (e.g., noun, verb)"
              placeholderTextColor={isDark ? '#ccc' : '#888'}
              value={newPartsOfSpeech}
              onChangeText={setNewPartsOfSpeech}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Example sentence"
              placeholderTextColor={isDark ? '#ccc' : '#888'}
              value={newExample}
              onChangeText={setNewExample}
              autoCapitalize="sentences"
            />
            <TouchableOpacity style={styles.addButton} onPress={addWord}>
              <Text style={styles.addButtonText}>Add Word to Dictionary</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cancelButton, { marginTop: 10 }]} // Use a specific cancel button style
              onPress={() => setIsAddWordModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Search Section */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search word..."
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
          autoCapitalize="none"
        />
        <CustomButton title="Search" onPress={handleSearch} style={styles.searchButton} />
      </View>

      {/* Display existing dictionary data */}
      <ScrollView style={styles.listContainer}>
        
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
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>
              {noResults ? 'No results found.' : 'No words found in the dictionary.'}
            </Text>
            {searchResults === null && (
              <Text style={styles.noDataText}>Add a new word using the '+' button!</Text>
            )}
          </View>
        )}

      {/* Shuffle Words Button */}
      <TouchableOpacity style={styles.shuffleButton} onPress={loadRandomWords}>
        <Text style={styles.shuffleButtonText}>Shuffle Words</Text>
      </TouchableOpacity>

      </ScrollView>



    </SafeAreaView>
  );
}

function getThemedStyles(theme: 'light' | 'dark') {
  const isDark = theme === 'dark';
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#181f2a' : 'transparent',
      paddingTop: StatusBar.currentHeight,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? '#232f47' : '#f8f9fa',
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: isDark ? '#7ecbff' : '#343a40',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? '#2d3553' : '#ffe0e0',
      padding: 20,
    },
    errorText: {
      fontSize: 16,
      color: isDark ? '#7ecbff' : '#dc3545',
      textAlign: 'center',
      marginBottom: 5,
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDark ? '#7ecbff' : '#212529',
      textAlign: 'center',
      marginVertical: 20,
      paddingHorizontal: 15,
    },
    addWordHeader: {
      fontSize: 22,
      fontWeight: 'bold',
      color: isDark ? '#e0e6f7' : '#343a40',
      marginBottom: 15,
      textAlign: 'center',
    },
    input: {
      height: 45,
      borderColor: isDark ? '#22304a' : '#ced4da',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 10,
      fontSize: 16,
      backgroundColor: isDark ? '#232f47' : '#ffffff',
      color: isDark ? '#e0e6f7' : '#222',
    },
    addButton: {
      backgroundColor: isDark ? '#28a745' : '#28a745',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
      shadowColor: isDark ? '#0057b8' : '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
    },
    addButtonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    cancelButton: {
      backgroundColor: isDark ? '#22304a' : '#6c757d',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
      shadowColor: isDark ? '#0057b8' : '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
    },
    cancelButtonText: {
      color: '#7ecbff',
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
      borderColor: isDark ? '#22304a' : '#aaa',
      borderRadius: 8,
      padding: 8,
      fontSize: 16,
      backgroundColor: isDark ? '#ccf' : '#ffffff',//still not visible in dark mode
      color: isDark ? '#000' : '#222',
    },
    shuffleButton: {
      backgroundColor: isDark ? '#0057b8' : '#ffc107',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: 15,
      marginBottom: 10,
      shadowColor: isDark ? '#0057b8' : '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
    },
    shuffleButtonText: {
      color: isDark ? '#e0e6f7' : '#343a40',
      fontSize: 18,
      fontWeight: 'bold',
    },
    listHeader: {
      fontSize: 22,
      fontWeight: 'bold',
      color: isDark ? '#e0e6f7' : '#343a40',
      marginBottom: 15,
      marginTop: 10,
      textAlign: 'center',
    },
    listContainer: {
      flex: 1,
      paddingHorizontal: 15,
    },
    itemContainer: {
      backgroundColor: isDark ? '#232f47' : '#ffffff',
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      shadowColor: isDark ? '#0057b8' : '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.13,
      shadowRadius: 3,
      elevation: 3,
      borderLeftWidth: 5,
      borderLeftColor: isDark ? '#0057b8' : '#007bff',
    },
    wordAndFavorite: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
    },
    word: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDark ? '#7ecbff' : '#007bff',
      flexShrink: 1,
      marginRight: 10,
    },
    partsOfSpeech: {
      fontSize: 14,
      fontStyle: 'italic',
      color: isDark ? '#b0b8d1' : '#6c757d',
      marginBottom: 5,
    },
    meaning: {
      fontSize: 16,
      color: isDark ? '#e0e6f7' : '#343a40',
      lineHeight: 22,
      marginBottom: 10,
    },
    example: {
      fontSize: 14,
      color: isDark ? '#a3bffa' : '#495057',
      fontStyle: 'italic',
      borderLeftWidth: 2,
      borderLeftColor: isDark ? '#3b5998' : '#ced4da',
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
      color: isDark ? '#b0b8d1' : '#6c757d',
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
      backgroundColor: isDark ? '#232f47' : '#ffffff',
      borderRadius: 15,
      padding: 25,
      width: '90%',
      maxHeight: '80%',
      shadowColor: isDark ? '#0057b8' : '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    plusButton: {
      position: 'absolute',
      bottom: 15,
      right: 15,
      backgroundColor: isDark ? '#0057b8' : '#007bff',
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: isDark ? '#0057b8' : '#000',
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
    searchButton: {
      backgroundColor: isDark ? '#0057b8' : '#ffc107',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 8,
      alignItems: 'center',
      shadowColor: isDark ? '#0057b8' : '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
    },
  });
}