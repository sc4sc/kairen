import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';

import IncidentList from '../screens/IncidentList';
import IncidentDetail from '../screens/IncidentDetail';
import SettingScreen from '../screens/SettingsScreen'

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: createStackNavigator({
      Main: createStackNavigator({
        IncidentList,
        IncidentDetail,
      }, { headerMode: 'none'}),
      Modal: IncidentDetail,
      Setting: SettingScreen
    }, { mode: 'modal', headerMode: 'none' }),
  })
);
