import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { AppLoading, Font, Icon } from 'expo';
import { FontAwesome } from '@expo/vector-icons';

import store from './store';
import AppNavigator from './navigation/AppNavigator';

console.disableYellowBox = true;

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends React.Component {
  state = {
    isReady: false,
  };

  async _loadAssetsAsync() {
    const awesomeFont = cacheFonts([FontAwesome.font]);
    const iconFont = Font.loadAsync({ ...Icon.Ionicons.font });
    await Promise.all([...awesomeFont, ...iconFont]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <Provider store={store}>
        <View style={styles.container}>
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
