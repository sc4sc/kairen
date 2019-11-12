import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

import store from './store'
import AppNavigator from './navigation/AppNavigator'

import { Sentry } from 'react-native-sentry'
import { SENTRY_DSN } from 'babel-dotenv'
import ErrorBoundary from './components/ErrorBoundary'

console.disableYellowBox = true

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font))
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isReady: false,
    }
  }

  async _loadAssetsAsync() {
    const awesomeFont = cacheFonts([FontAwesome.font])
    const iconFont = Font.loadAsync(Ionicons.font)
    await Promise.all([awesomeFont, iconFont])
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          autoHideSplash={false}
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }

    return (
      <ErrorBoundary>
        <Provider store={store}>
          <View style={styles.container}>
            <AppNavigator />
          </View>
        </Provider>
      </ErrorBoundary>
    )
  }
}

if (SENTRY_DSN) {
  Sentry.config(SENTRY_DSN).install()
  // set the tag context
  Sentry.setTagsContext({
    environment: __DEV__ ? 'development' : 'production',
    react: true,
  })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

// export default from './storybook';
export default App;
