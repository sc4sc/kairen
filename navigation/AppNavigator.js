import Layout from '../constants/Layout'
import { 
  createAppContainer, 
  createSwitchNavigator, 
  createStackNavigator, 
  createDrawerNavigator 
} from 'react-navigation';
import {
  IncidentDetail,
  IncidentList,
  NewComment,
  NewProgress,
  NewIncident,
  NewIncidentDetail,
  ProgressList,
  Setting,
  Login,
  SafetyContact
} from '../screens';

const MainNavigator = createStackNavigator ({
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
  },
  {
    headerMode: 'none',
  }
)

const LoginNavigator = createSwitchNavigator ({
  Auth: Login,
  App: MainNavigator
}, { headerMode: 'none' })

const drawerNavigator = createDrawerNavigator({
  Side: {
    screen: LoginNavigator,
    }
  }, {
    contentComponent: SafetyContact,
    drawerWidth: Layout.window.width - 100,
  });

export default createAppContainer(drawerNavigator);

