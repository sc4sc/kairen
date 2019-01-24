import { Platform, StatusBar } from 'react-native';
import { getStatusBarHeight as getIOSStatusBarHeight } from 'react-native-iphone-x-helper';
import { Permissions } from 'expo';
import moment from 'moment';

export const getStatusBarHeight = () => {
  if (Platform.OS === 'android') {
    if (global.Expo) {
      return global.Expo.Constants.statusBarHeight;
    } else if (StatusBar && StatusBar.currentHeight) {
      if (Platform.Version <= 18) {
        return 0;
      } else {
        return StatusBar.currentHeight;
      }
    } else {
      return 0;
    }
  } else {
    return getIOSStatusBarHeight();
  }
};

export { getBottomSpace } from 'react-native-iphone-x-helper';

export function formatDate(dateString) {
  return moment(dateString).format('MMM d, YYYY');
}

export async function requestPermission(type) {

  // if already granted
  if ((await Permissions.getAsync(type)).status === 'granted') {
    return true;
  }

  // otherwise request permission
  if ((await Permissions.askAsync(type)) === 'granted') {
    return true;
  }

  // failed
  return false;
}