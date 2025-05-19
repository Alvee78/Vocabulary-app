import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { Redirect, router } from 'expo-router';

export default function Index() {
  const [isLogedIn, setIsLogedIn] = useState(false) // Replace with your actual authentication logic
  const isFirstTime = false; // Replace with your actual first-time check logic
  useEffect(() => {
    // Check if the user is logged in
    setIsLogedIn(true);
  }, []);
  return <Redirect href={isLogedIn?'/(tabs)':'/login'}/>;
} 