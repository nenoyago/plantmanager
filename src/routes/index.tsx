import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { StackRoutes } from '../routes/Stack.routes';

export default function Routes() {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
}