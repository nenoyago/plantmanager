import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface HeaderProps {
  isTab?: boolean;
}

export function Header({ isTab = false }: HeaderProps) {
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    async function loadStorageUsername() {
      const user = await AsyncStorage.getItem('@plantmanager:username');

      setUsername(user || '');
    }

    !isTab && loadStorageUsername();
  }, [username, isTab]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>{isTab ? 'Minhas' : 'Olá,'}</Text>
        <Text style={styles.headerTitle}>{isTab ? 'Plantinhas' : username}</Text>
      </View>
      <Image style={styles.avatar} source={{ uri: "https://github.com/nenoyago.png" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    marginTop: getStatusBarHeight()
  },

  greeting: {
    fontSize: 32,
    lineHeight: 36,
    color: colors.heading,
    fontFamily: fonts.text
  },

  headerTitle: {
    fontSize: 32,
    lineHeight: 36,
    color: colors.heading,
    fontFamily: fonts.heading,
    textTransform: 'capitalize'
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 56
  }


});