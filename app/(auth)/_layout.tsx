import React, { ReactNode } from 'react';
import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';

interface Props {
  children: ReactNode;
}

export default function AuthRoutesLayout({ children }: Props) {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={'../(tabs)'} />
  }

  return <Stack screenOptions={{ headerShown: false }} >
    
  </Stack>;
}
