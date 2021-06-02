import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from '../../pages/Home';

const Tab = createMaterialTopTabNavigator();

function TopTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen component={Home} name='Home' />
    </Tab.Navigator>
  );
}

export default TopTabNavigator;
