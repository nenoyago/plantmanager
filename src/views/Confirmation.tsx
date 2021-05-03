import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Button } from '../components/Button';

import fonts from '../styles/fonts';
import colors from '../styles/colors';
import Toast from 'react-native-tiny-toast';
import { SuccesToast } from '../libs/toast';

export interface ConfirmationParams {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug';
  nextScreen: 'PlantSelect' | 'MyPlants';
}

const emojis = {
  hug: '🤗',
  smile: '😄'
}

export function Confirmation() {
  const routes = useRoute();
  const navigation = useNavigation();

  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen
  } = routes.params as ConfirmationParams;

  function handleMoveOn() {
    if (nextScreen === 'MyPlants') {
      Toast.show(`Oba! Sua plantinha foi cadastrada ${emojis['hug']}`,
        { ...SuccesToast, duration: 5000 });
    }

    navigation.navigate(nextScreen);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          {emojis[icon]}
        </Text>

        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.subTitle}>
          {subtitle}
        </Text>

        <View style={styles.footer}>
          <Button title={buttonTitle} onPress={handleMoveOn} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 30
  },

  emoji: {
    fontSize: 72
  },

  title: {
    fontSize: 24,
    fontFamily: fonts.heading,
    textAlign: 'center',
    lineHeight: 30,
    marginTop: 54,
    color: colors.heading,
  },

  subTitle: {
    fontSize: 17,
    lineHeight: 25,
    fontFamily: fonts.text,
    textAlign: 'center',
    paddingVertical: 10,
    color: colors.heading,
  },

  footer: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 30
  }
})