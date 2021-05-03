import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { api } from '../services/api';

import { Header } from '../components/Header';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { PlantLoad } from '../components/PlantLoad';
import { useNavigation } from '@react-navigation/native';

interface EnvironmentsProps {
  key: string;
  title: string;
}

interface PlantsProps {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  }
}

export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentsProps[]>([]);
  const [plants, setPlants] = useState<PlantsProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState('all');
  const [loading, setLoading] = useState(true);


  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    fetchEnvironment();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  async function fetchEnvironment() {
    const { data } = await api.get('plants_environments', {
      params: {
        _sort: 'title',
        _order: 'asc'
      }
    });

    setEnvironments([{
      key: 'all',
      title: 'Todos'
    },
    ...data
    ]);
  }

  async function fetchPlants() {
    const { data } = await api.get('plants', {
      params: {
        _sort: 'name',
        _order: 'asc',
        _page: page,
        _limit: 8,
      }
    });

    if (!data) {
      setLoading(false);
    }

    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data]);
      setFilteredPlants(oldValue => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  function handleSelectEnvironment(environment: string) {
    setEnvironmentSelected(environment);

    if (environment === 'all') {
      return setFilteredPlants(plants);
    }

    const filtered = plants.filter(plant => plant.environments.includes(environment));

    setFilteredPlants(filtered);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) {
      return;
    }

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }

  function handlePlantSelect(plant: PlantsProps) {
    navigation.navigate('PlantSave', { plant });
  }

  if (loading) {
    return <PlantLoad />;
  }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.header}>
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          data={environments}
          keyExtractor={({ key }) => String(key)}
          renderItem={({ item }) => (
            <EnvironmentButton
              text={item.title}
              active={item.key === environmentSelected}
              onPress={() => handleSelectEnvironment(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plantsContent}>
        <FlatList
          data={filteredPlants}
          keyExtractor={({ id }) => String(id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              plant={{ name: item.name, photo: item.photo }}
              onPress={() => handlePlantSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1} // 10% end of screen
          onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
          contentContainerStyle={{ paddingBottom: 10 }}
          ListFooterComponent={
            loadingMore
              ?
              <ActivityIndicator color={colors.green} />
              : <></>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },

  header: {
    marginTop: 10,
    paddingHorizontal: 30
  },

  title: {
    fontSize: 17,
    lineHeight: 23,
    fontFamily: fonts.heading,
    color: colors.heading
  },

  subtitle: {
    fontSize: 17,
    lineHeight: 23,
    fontFamily: fonts.text,
    color: colors.heading
  },

  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    paddingStart: 32,
    marginVertical: 32
  },

  plantsContent: {
    flex: 1,
    paddingHorizontal: 22,
    justifyContent: 'center'
  }
});