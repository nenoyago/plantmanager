import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

import fonts from '../styles/fonts';
import colors from '../styles/colors';

interface PlantProps extends RectButtonProps {
  plant: Plant;
}

type Plant = {
  name: string;
  photo: string;
};

export function PlantCardPrimary({ plant, ...rest }: PlantProps) {
  return (
    <RectButton style={styles.card}
      {...rest}
    >
      <SvgFromUri uri={plant.photo} width={70} height={70}/>
      <Text style={styles.text}>{plant.name}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    maxWidth: '45%',
    backgroundColor: colors.shape,
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 10,
    margin: 10,
  },

  text: {
    fontSize: 13,
    lineHeight: 23,
    color: colors.green_dark,
    fontFamily: fonts.heading,
    marginVertical: 16
  }
});