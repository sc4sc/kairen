import { Platform, StatusBar } from 'react-native';
import { getStatusBarHeight as getIOSStatusBarHeight } from 'react-native-iphone-x-helper';

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
