import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';

import IncidentList from '../screens/IncidentList';
import IncidentDetail from '../screens/IncidentDetail';
import NewIncident from '../screens/NewIncident';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
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
      },
      {
        mode: 'modal',
        headerMode: 'none',
        cardStyle: {
          backgroundColor: 'rgba(0, 0, 0, 0)'
        },
      }
    ),
  })
);
