import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Platform
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Toast from 'react-native-tiny-toast';
import { SuccesToast } from '../libs/toast';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Button } from '../components/Button';
import { ConfirmationParams } from './Confirmation';


export function UserIdentification() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>('');

  const navigation = useNavigation();

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setName(value);
  }

  async function handleSubmit() {
    if (!name || name.trim() === '') {
      Toast.show('Antes de prosseguir, me diga como chamar você 🤗', SuccesToast);

      return;
    }

    try {
      await AsyncStorage.setItem('@plantmanager:username', name);

      const navigationToConfirmParams = {
        title: 'Prontinho',
        subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen: 'PlantSelect'
      } as ConfirmationParams;

      navigation.navigate('Confirmation', navigationToConfirmParams);
    } catch {
      Toast.show('Não foi possível salvar o seu nome 😥', {
        position: Toast.position.TOP,
        duration: 3000,
        textColor: colors.white,
        textStyle: {
          fontFamily: fonts.text
        },
        containerStyle: {
          backgroundColor: colors.red,
          padding: 15
        }
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <View style={styles.form}>
            <View style={styles.header}>
              <Text style={styles.emoji}>
                {isFilled ? '😄' : '😀'}
              </Text>
              <Text style={styles.title}>
                Como podemos {'\n'}
                chamar você?
          </Text>
            </View>
            <TextInput
              style={[
                styles.input,
                (isFocused || isFilled) && { borderColor: colors.green },
              ]}
              placeholder="Digite um nome"
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              onChangeText={handleInputChange}
              selectionColor={colors.green}
            />
            <View style={styles.footer}>
              <Button title="Confirmar" onPress={handleSubmit} enabled={!!name} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  content: {
    flex: 1,
    width: '100%',
  },

  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 54
  },

  header: {
    alignItems: 'center',
  },

  emoji: {
    fontSize: 36
  },

  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },

  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20
  }
});