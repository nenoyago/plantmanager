import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';

import Toast from 'react-native-tiny-toast';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { SvgFromUri } from 'react-native-svg';

import waterDropImg from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { savePlant } from '../libs/storage';
import { DangerToast } from '../libs/toast';

import { Button } from '../components/Button';
import { ConfirmationParams } from './Confirmation';

type Plant = {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  },
  dateTimeNotification: Date;
}

interface ParamsProps {
  plant: Plant;
}

export function PlantSave() {
  const [dateTimeSelected, setDateTimeSelected] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const route = useRoute();
  const navigation = useNavigation();

  const { plant } = route.params as ParamsProps;

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleChangeDateTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setDateTimeSelected(new Date());

      Toast.show('Por favor, escolha um horário futuro ⏰', DangerToast);

      return;
    }

    if (dateTime) {
      setDateTimeSelected(dateTime);
    }
  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker(!showDatePicker);
  }

  async function handleSavePlant() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: dateTimeSelected
      });

      const navigationToConfirmParams = {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
        buttonTitle: 'Muito obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants'
      } as ConfirmationParams;

      navigation.navigate('Confirmation', navigationToConfirmParams);
    } catch {
      Toast.show('Não foi possível cadastrar sua plantinha 😥', DangerToast);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <BorderlessButton
            style={styles.backButton}
            onPress={handleNavigateBack}
          >
            <Feather name="chevron-left" size={32} color={colors.heading} />
          </BorderlessButton>
          <SvgFromUri uri={plant.photo} width={150} height={150} />

          <Text style={styles.plantName}>
            {plant.name}
          </Text>

          <Text style={styles.plantAbout}>
            {plant.about}
          </Text>
        </View>


        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image style={styles.tipImage} source={waterDropImg} />
            <Text style={styles.tipText}>
              {plant.water_tips}
            </Text>
          </View>

          <Text style={styles.alertLabel}>
            Ecolha o melhor horário para ser lembrado:
        </Text>

          {showDatePicker && (
            <DateTimePicker
              textColor={colors.heading}
              value={dateTimeSelected}
              mode="time"
              display="spinner"
              is24Hour={true}
              onChange={handleChangeDateTime}
            />
          )}

          {Platform.OS === 'android' && (
            <RectButton
              style={styles.dateTimePickerButton}
              onPress={handleOpenDateTimePickerForAndroid}
            >
              <Text style={styles.dateTimePickerText}>
                {`Mudar ${format(dateTimeSelected, 'HH:mm')}h`}
              </Text>
            </RectButton>
          )}

          <View style={styles.footer}>
            <Button title="Cadastrar planta" onPress={handleSavePlant} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.white
  },

  header: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: colors.shape,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButton: {
    alignSelf: 'flex-start',
    position: 'relative',
    top: 48,
    left: -10
  },

  controller: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingBottom: getBottomSpace() || 20,
  },

  plantName: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginTop: 32
  },

  plantAbout: {
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 25,
    fontFamily: fonts.text,
    color: colors.heading,
    marginTop: 16,
    marginBottom: 62
  },

  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    marginTop: -50,
    marginBottom: 40
  },

  tipImage: {
    width: 56,
    height: 56
  },

  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    fontSize: 15,
    lineHeight: 23,
    color: colors.blue,
    textAlign: 'justify'
  },

  alertLabel: {
    fontFamily: fonts.complement,
    fontSize: 13,
    lineHeight: 23,
    color: colors.green_dark,
    textAlign: 'center',
  },

  dateTimePickerButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 10
  },

  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    lineHeight: 30,
    fontFamily: fonts.text
  },

  footer: {
    marginTop: 40
  }
});