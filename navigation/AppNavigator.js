import Layout from '../constants/Layout'
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation'
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
} from '../screens'
import SSO from '../screens/SSO'
import AutoLogin from '../screens/AutoLogin'

console.log(PermissionLoading)

const MainNavigator = createStackNavigator(
  {
    Main: createStackNavigator(
      {
        IncidentList,
        IncidentDetail,
        Setting,
        AboutUs: AboutThisApp,
      },
      { headerMode: 'none' }
    ),
    NewIncident,
    NewIncidentDetail,
    NewComment,
    ProgressList,
    NewProgress,
  },
  {
    // mode: 'modal',
    headerMode: 'none',
  }
)

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
)

const LoginNavigator = createStackNavigator(
  {
    Login,
    AboutUs: AboutThisApp,
    SSO: SSO,
  },
  { headerMode: 'none' }
)

const AppNavigator = createSwitchNavigator(
  {
    PermissionLoading: PermissionLoading,
    Permission: Permission,
    AuthLoading: AutoLogin,
    Login: LoginNavigator,
    App: drawerNavigator,
  },
  { headerMode: 'none' }
)

export default createAppContainer(AppNavigator)
