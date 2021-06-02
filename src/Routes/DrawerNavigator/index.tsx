import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import TopTabNavigator from '../TopTabNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName='Home'>
      <Drawer.Screen component={TopTabNavigator} name='FreeRoutes' />
    </Drawer.Navigator>
  );
}
