import React from 'react';
import { Text, View, Animated, StyleSheet, ActivityIndicator } from 'react-native';

import { SvgFromUri } from 'react-native-svg';
import { Swipeable, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import fonts from '../styles/fonts';
import colors from '../styles/colors';

interface PlantProps {
  plant: Plant;
  removeLoading: boolean;
  handleRemove: () => void;
}

type Plant = {
  name: string;
  photo: string;
  hour: string;
};

export function PlantCardSecondary({ plant, removeLoading = false, handleRemove }: PlantProps) {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() =>
        <Animated.View>
          <RectButton
            style={styles.buttonRemove}
            onPress={handleRemove}
            enabled={!removeLoading}
          >
            {removeLoading
              ? <ActivityIndicator color={colors.white} size={32}/>
              : <Feather name="trash" size={32} color={colors.white} />
            }
          </RectButton>
        </Animated.View>
      }
    >
      <RectButton style={styles.card}>
        <SvgFromUri uri={plant.photo} width={56} height={56} />
        <Text style={styles.title}>{plant.name}</Text>

        <View style={styles.details}>
          <Text style={styles.timeLabel}>
            Regar às
        </Text>
          <Text style={styles.time}>
            {plant.hour}
          </Text>
        </View>

      </RectButton>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.shape,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 80,
    marginVertical: 5,
  },

  title: {
    marginLeft: 20,
    fontSize: 17,
    lineHeight: 25,
    color: colors.heading,
    fontFamily: fonts.heading,
  },

  details: {
    flex: 1,
    alignItems: 'flex-end',
  },

  timeLabel: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: fonts.text,
    color: colors.body_light
  },

  time: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: fonts.heading,
    color: colors.body_dark
  },

  buttonRemove: {
    width: 120,
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: 5,
    right: 35,
    paddingLeft: 35
  }
});