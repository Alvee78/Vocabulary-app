import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { Redirect, router } from 'expo-router';

export default function Index() {
  const [isLogedIn, SetIsLogedIn] = useState() // Replace with your actual authentication logic
  const isFirstTime = false; // Replace with your actual first-time check logic
  useEffect(() => {
    // Check if the user is logged in
    SetIsLogedIn(true);
  }, isLogedIn);
  return <Redirect href={isLogedIn?'/(tabs)':'/login'}/>;
}