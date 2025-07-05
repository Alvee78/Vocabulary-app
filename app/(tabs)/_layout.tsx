import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { loadSqliteDatabase } from '../../config/loadSQliteDatabase';
import Loading from '../../Components/Loading';
import { useTheme } from '../../context/ThemeContext';

export default function TabLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    loadSqliteDatabase().then(() => {
      setIsLoading(false);
    }).catch((error) => {
      console.error("Error loading SQLite database:", error);
      setIsLoading(false);
    });
  }, []);

  async function migrationOnInit(db: SQLiteDatabase) {
    const DATABASE_VERSION = 1;
    let { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>(
      'PRAGMA user_version'
    );
    if (currentDbVersion >= DATABASE_VERSION) {
      return;
    }
    if (currentDbVersion === 0) {
      await db.execAsync(`
        PRAGMA journal_mode = 'wal';
        CREATE TABLE todos (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
      `);
      await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'hello', 1);
      await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'world', 2);
      currentDbVersion = 1;
    }
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  }

  if (isLoading) return <Loading />;
// Theme-based colors
const isDark = theme === 'dark';
const tabBarBg = isDark ? '#232f47' : '#fff5f0';           // deep blue in dark, soft cream in light
const tabBarBorder = isDark ? '#22304a' : '#ffe4d6';       // blue border in dark
const tabBarActive = isDark ? '#7ecbff' : 'tomato';        // blue accent in dark
const tabBarInactive = isDark ? '#b0b8d1' : 'grey';        // muted blue in dark

return (
  <SQLiteProvider databaseName="dictionary.db">
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          backgroundColor: tabBarBg,
          borderTopWidth: 1,
          borderTopColor: tabBarBorder,
          elevation: 8,
          shadowColor: isDark ? '#0057b8' : '#000',        // blue shadow in dark
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.12,
        },
        tabBarActiveTintColor: tabBarActive,
        tabBarInactiveTintColor: tabBarInactive,
      }}
    >
        <Tabs.Screen name="index" options={{ headerShown: false, title: 'Home', tabBarIcon: ({ color }) => (<Ionicons name='home' size={24} color={color} />) }} />
        <Tabs.Screen name="rewards" options={{ headerShown: false, title: 'Rewards', tabBarIcon: ({ color }) => (<Ionicons name='trophy' size={24} color={color} />) }} />
        <Tabs.Screen name="dictionary" options={{ headerShown: false, title: 'Dictionary', tabBarIcon: ({ color }) => (<Ionicons name='book' size={24} color={color} />) }} />
        <Tabs.Screen name="favorite" options={{ headerShown: false, title: 'Favorites', tabBarIcon: ({ color }) => (<Ionicons name='heart' size={24} color={color} />) }} />
        <Tabs.Screen name="settings" options={{ headerShown: false, title: 'Settings', tabBarIcon: ({ color }) => (<Ionicons name='settings' size={24} color={color} />) }} />
      </Tabs>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({});