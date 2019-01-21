import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';

import {
  IncidentDetail,
  IncidentList,
  NewComment,
  NewIncident,
  ProgressList,
  SettingsScreen,
  Login,
} from '../screens';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    App: createStackNavigator(
      {
        Main: createStackNavigator(
          {
            Login,
            IncidentList,
            IncidentDetail,
          },
          { headerMode: 'none' }
        ),
        Modal: NewIncident,
        Comment: NewComment,
        Progress: ProgressList,
        Setting: SettingsScreen,
        Login: Login,
      },
      {
        mode: 'modal',
        headerMode: 'none',
        cardStyle: {
          backgroundColor: 'rgba(0, 0, 0, 0)',
        },
      }
    ),
  })
);
