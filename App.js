import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import {Asset, Location} from 'expo'

import store from './store';
import AppNavigator from './navigation/AppNavigator';

console.disableYellowBox = true;

export default class App extends React.Component {
  componentDidMount() {
    Asset.loadAsync(require('./assets/map.html'));
    Location.requestPermissionsAsync();
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
