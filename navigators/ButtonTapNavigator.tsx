import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegistroScreen from '../screens/RegistroScreen';
import ConsultasScreen from '../screens/ConsultasScreen';
import EditarScreen from '../screens/EditarScreen';
import ApiScreen from '../screens/ApiScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={RegistroScreen} />
      <Tab.Screen name="Consultas" component={ConsultasScreen} />
      <Tab.Screen name="Editar" component={EditarScreen} />
      <Tab.Screen name="API" component={ApiScreen} />
    </Tab.Navigator>
  );
}
