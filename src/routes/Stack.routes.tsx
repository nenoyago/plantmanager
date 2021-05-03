import React from 'react';

import colors from '../styles/colors';

import { createStackNavigator } from '@react-navigation/stack';

import { Welcome } from '../views/Welcome';
import { UserIdentification } from '../views/UserIdentification';
import { Confirmation } from '../views/Confirmation';
import { PlantSelect } from '../views/PlantSelect';
import { PlantSave } from '../views/PlantSave';
import { MyPlants } from '../views/MyPlants';
import { TabRoutes } from './Tab.routes';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
      <Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: colors.white
          }
        }}
      >
        <Screen name="Welcome" component={Welcome} />
        <Screen name="UserIdentification" component={UserIdentification} />
        <Screen name="Confirmation" component={Confirmation} />
        <Screen name="PlantSelect" component={TabRoutes} />
        <Screen name="PlantSave" component={PlantSave} />
        <Screen name="MyPlants" component={TabRoutes} />
      </Navigator>
  );
}