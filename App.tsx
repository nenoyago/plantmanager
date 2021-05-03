import React, { useEffect } from 'react';

import * as Notifications from 'expo-notifications';

import AppLoading from 'expo-app-loading';
import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';

import Routes from './src/routes';
import { StatusBar } from 'expo-status-bar';

interface PlantProps {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
  hour?: string;
  dateTimeNotification: Date;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(() => {
    const subscription = Notifications
      .addNotificationReceivedListener(
        async ({ request }) => {
          const plant = request.content.data.plant as PlantProps;
          console.log(plant);
        });
        
        return function removeSubscription() {
          subscription.remove();
        }
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar />
      <Routes />
    </>
  );
}
