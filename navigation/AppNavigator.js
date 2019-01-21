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
  NewIncidentDetail,
  ProgressList,
  SettingsScreen,
  Login,
} from '../screens';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Auth: Login,
    App: createStackNavigator(
      {
        Main: createStackNavigator(
          {
            IncidentList,
            IncidentDetail,
          },
          { headerMode: 'none' }
        ),
        Modal: NewIncident,
        NewIncidentDetail: NewIncidentDetail,
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
