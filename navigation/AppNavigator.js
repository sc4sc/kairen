import Layout from '../constants/Layout';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import {
  AboutThisApp,
  IncidentDetail,
  IncidentList,
  Login,
  NewComment,
  NewProgress,
  NewIncident,
  NewIncidentDetail,
  Permission,
  PermissionLoading,
  ProgressList,
  Setting,
  SafetyContact,
} from '../screens';

console.log(PermissionLoading);

const MainNavigator = createStackNavigator(
  {
    Main: createStackNavigator(
      {
        IncidentList,
        IncidentDetail,
      },
      { headerMode: 'none' }
    ),
    NewIncident,
    NewIncidentDetail,
    NewComment,
    ProgressList,
    NewProgress,
    Setting,
    AboutUs: AboutThisApp,
  },
  {
    headerMode: 'none',
  }
);

const drawerNavigator = createDrawerNavigator(
  {
    Side: {
      screen: MainNavigator,
    },
  },
  {
    contentComponent: SafetyContact,
    drawerWidth: Layout.window.width - 100,
  }
);

const loginStack = createStackNavigator(
  {
    Auth: Login,
    AboutUs: AboutThisApp,
  },
  { headerMode: 'none' }
);

const LoginNavigator = createSwitchNavigator(
  {
    PermissionLoading: PermissionLoading,
    Permission: Permission,
    Auth: loginStack,
    App: drawerNavigator,
  },
  { headerMode: 'none' }
);

export default createAppContainer(LoginNavigator);
