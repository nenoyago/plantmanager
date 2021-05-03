import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import fonts from '../styles/fonts';
import colors from '../styles/colors';

interface EnvironmentButtonProps extends RectButtonProps {
  text: string;
  active?: boolean;
}

export function EnvironmentButton({
  text,
  active = false,
  ...rest
}: EnvironmentButtonProps) {
  return (
    <RectButton style={[
      styles.button,
      active && styles.buttonActive
    ]}
      {...rest}
    >
      <Text style={[
        styles.text,
        active && styles.textActive
      ]}>
        {text}
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.shape,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginRight: 5,
    width: 76,
    height: 40
  },

  buttonActive: {
    backgroundColor: colors.green_light
  },

  text: {
    fontSize: 13,
    lineHeight: 23,
    color: colors.heading,
    fontFamily: fonts.text
  },

  textActive: {
    color: colors.green_dark,
    fontFamily: fonts.heading
  }
});