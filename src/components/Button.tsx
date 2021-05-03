import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import fonts from '../styles/fonts';
import colors from '../styles/colors';

interface ButtonProps extends RectButtonProps {
  title: string;
}

export function Button({ title, enabled = true, ...rest }: ButtonProps) {
  return (
    <RectButton style={
      [styles.button,
      !enabled && styles.disabledButton]}
      enabled={enabled}
      {...rest}
    >
      <Text style={styles.title}>{title}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    height: 56
  },

  disabledButton: {
    opacity: 0.5
  },

  title: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading
  }
});