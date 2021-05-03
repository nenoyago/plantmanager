import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import { PlantSelect } from '../views/PlantSelect';

import { MaterialIcons } from '@expo/vector-icons';
import { MyPlants } from '../views/MyPlants';

const { Navigator, Screen } = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Navigator tabBarOptions={{
      activeTintColor: colors.green,
      inactiveTintColor: colors.body_light,
      labelPosition: 'beside-icon',
      style: {
        height: 88
      }
    }}>
      <Screen
        name="Nova planta"
        component={PlantSelect}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ))
        }}
      />

      <Screen
        name="Minhas plantas"
        component={MyPlants}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ))
        }}
      />
    </Navigator>
  );
}