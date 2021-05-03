import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, Alert, StyleSheet } from 'react-native';

import { formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { loadPlants, removePlant } from '../libs/storage';

import waterDropImg from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import Toast from 'react-native-tiny-toast';
import { DangerToast } from '../libs/toast';

import { Header } from '../components/Header';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { PlantLoad } from '../components/PlantLoad';

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
  },
  hour?: string;
  dateTimeNotification: Date;
}

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [nextWatered, setNextWatered] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [loadingToRemovePlant, setLoadingToRemovePlant] = useState(false);

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlants();

      setMyPlants(plantsStoraged);

      if (plantsStoraged.length > 0) {
        const nextTime = formatDistance(
          new Date(plantsStoraged[0].dateTimeNotification).getTime(),
          new Date().getTime(),
          { locale: ptBR });

        setNextWatered(`Regue a sua ${plantsStoraged[0].name} daqui a ${nextTime}.`);
      } else {
        setNextWatered('Que tal adicionar uma nova plantinha?');
      }

      setLoading(false);
    }

    loadStorageData();
  }, [myPlants, nextWatered]);

  function handleRemovePlant(plant: PlantProps) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            setLoadingToRemovePlant(true);
            await removePlant(plant.id);

            setMyPlants(oldPlants =>
              oldPlants.filter(oldPlant => oldPlant.id !== plant.id)
            );

          } catch {
            Toast.show('Oops, não conseguimos remover sua plantinha 😥', DangerToast);
          } finally {
            setLoadingToRemovePlant(false);
          }
        }
      }
    ]);
  }

  if (loading) {
    return <PlantLoad />
  }

  return (
    <View style={styles.container}>
      <Header isTab={true} />

      <View style={styles.spotlight}>
        <Image
          style={styles.spotlightImage}
          source={waterDropImg}
        />
        <Text style={styles.spotlightText}>{nextWatered}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>

        {myPlants.length > 0 ?
          (
            <FlatList
              data={myPlants}
              keyExtractor={({ id }) => String(id)}
              renderItem={({ item }) => (
                <PlantCardSecondary
                  plant={{
                    name: item.name,
                    photo: item.photo,
                    hour: item.hour!
                  }}
                  removeLoading={loadingToRemovePlant}
                  handleRemove={() => handleRemovePlant(item)}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 10 }}
            />
          )
          : <Text style={styles.withoutPlantsText}>Sem plantinhas registradas no momento.</Text>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background
  },

  spotlight: {
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  spotlightImage: {
    width: 56,
    height: 56,
  },

  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
    textAlign: 'justify',
    fontSize: 15,
    lineHeight: 23,
    fontFamily: fonts.text
  },

  plants: {
    flex: 1,
    marginTop: 48,
    paddingHorizontal: 32,
    width: '100%',
  },

  plantsTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginBottom: 16,
  },

  withoutPlantsText: {
    fontSize: 15,
    lineHeight: 23,
    fontFamily: fonts.text,
    color: colors.body_dark,
  }
});