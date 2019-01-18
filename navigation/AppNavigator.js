import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';

import { CommentInput, IncidentDetail, IncidentList, ProgressList, SettingsScreen } from '../screens';


export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: createStackNavigator({
      Main: createStackNavigator({
        IncidentList,
        IncidentDetail,
      }, { headerMode: 'none' }),
      Modal: IncidentDetail,
      Setting: SettingsScreen,
      Comment: CommentInput,
      Progress: ProgressList
    }, { mode: 'modal', headerMode: 'none' }),
  })
);
