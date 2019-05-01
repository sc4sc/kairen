import { Platform, StatusBar } from 'react-native';
import { getStatusBarHeight as getIOSStatusBarHeight } from 'react-native-iphone-x-helper';
import { Permissions, Notifications } from 'expo';

import moment from 'moment';
import * as _ from 'lodash';
import * as geojsonutil from 'geojson-utils';

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
  return moment(dateString).format('lll');
}

export async function requestPermission(type) {
  // if already granted
  if ((await Permissions.getAsync(type)).status === 'granted') {
    return true;
  }

  // otherwise request permission
  if ((await Permissions.askAsync(type)).status === 'granted') {
    return true;
  }

  // failed
  return false;
}

export async function getPushToken() {
  try {
    if (await requestPermission(Permissions.NOTIFICATIONS)) {
      return Notifications.getExpoPushTokenAsync();
    }
  } catch (error) {
    console.log('getPushToken Error:', error);
  }
  return '';
}

export function checkIsInbuilding(coords) {
  const point = { type: 'Point', coordinates: [coords.lng, coords.lat] };

  const west = require('../assets/geojson/WestKAIST.json');
  const north = require('../assets/geojson/NorthKAIST.json');
  const east = require('../assets/geojson/EastKAIST.json');
  const dorm = require('../assets/geojson/Dormitory.json');

  const areas = _.flatMap(
    [west, north, east, dorm],
    section => section.features
  );
  const locatedAreasByPriority = _.sortBy(
    areas.filter(area => geojsonutil.pointInPolygon(point, area.geometry)),
    area => area.properties.priority
  );

  const locationFound = locatedAreasByPriority.length > 0;
  return locationFound ? locatedAreasByPriority[0] : undefined;
}
