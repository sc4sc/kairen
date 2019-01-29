import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { Asset, Permissions } from 'expo';

import store from './store';
import AppNavigator from './navigation/AppNavigator';
import { requestPermission } from './utils';

console.disableYellowBox = true;

export default class App extends React.Component {
  componentDidMount() {
    Asset.loadAsync(require('./assets/map.html'));
    requestPermission(Permissions.LOCATION);
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {<StatusBar barStyle="dark-content" />}
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
