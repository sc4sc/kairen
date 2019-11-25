import React from 'react'
import { StyleSheet, View, AsyncStorage } from 'react-native'
import AppIntroScreen from './screens/AppIntro'
import { Provider } from 'react-redux'
import store from './store'
import AppNavigator from './navigation/AppNavigator'
import { Sentry } from 'react-native-sentry'
import { SENTRY_DSN } from 'babel-dotenv'
import ErrorBoundary from './components/ErrorBoundary'

console.disableYellowBox = true

if (SENTRY_DSN) {
  Sentry.config(SENTRY_DSN).install()
  Sentry.setTagsContext({
    environment: __DEV__ ? 'development' : 'production',
    react: true,
  })
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isReady: true,
    }
  }

  componentDidMount = () => {
    AsyncStorage.getItem('intro').then(value => {
      if (!value) {
        this.setState({ isReady: false })
      }
    })
  }

  _onDone = () => {
    AsyncStorage.setItem('intro', 'true')
    this.setState({ isReady: true })
  }

  render() {
    return (
      <ErrorBoundary>
        <Provider store={store}>
          {this.state.isReady ? (
            <View style={styles.container}>
              <AppNavigator />
            </View>
          ) : (
            <AppIntroScreen onDone={this._onDone} />
          )}
        </Provider>
      </ErrorBoundary>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

// export default from './storybook';
export default App
