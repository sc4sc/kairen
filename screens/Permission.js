import React from 'react'
import {
  AppState,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native'
import { SplashScreen } from 'expo'
import Layout from '../constants/Layout'
import { requestPermission } from '../utils'
import * as Permissions from 'expo-permissions'
import i18n from '../i18n'

export default class Permission extends React.Component {
  state = {
    locationPermission: false,
    phoneCallPermission: false,
    appState: AppState.currentState,
  }

  async componentDidMount() {
    SplashScreen.hide()

    const locationPermission = await requestPermission(Permissions.LOCATION)
    AppState.addEventListener('change', this.handleAppStateChange)
    this.setState({ locationPermission })
    this.props.navigation.navigate('AuthLoading')
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange = async nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState == 'active'
    ) {
      const { status } = await Permissions.getAsync(Permissions.LOCATION)
      if (status === 'granted') {
        this.setState({ locationPermission: true })
      } else {
        this.setState({ locationPermission: false })
      }
    }
    this.setState({ appState: nextAppState })
  }

  renderPermissionWait() {
    return (
      <View style={[styles.buttonStyle, styles.buttonDisabled]}>
        <Text style={styles.buttonDisabledText}>
          {i18n.t('wait_for_permission')}
        </Text>
      </View>
    )
  }

  renderGoNext() {
    return (
      <TouchableOpacity
        style={[styles.buttonStyle, styles.buttonEnabled]}
        onPress={() => this.props.navigation.navigate('AuthLoading')}>
        <Text style={[styles.buttonEnabledText, { alignItems: 'center' }]}>
          {i18n.t('next')}
        </Text>
        <Image
          style={{ marginLeft: 7.5 }}
          source={require('../assets/images/next.png')}
        />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />

        <View>
          <Text style={styles.headerText}>{i18n.t('permission_setting')}</Text>
          <Text style={[styles.plainText, { marginBottom: 55 }]}>
            {i18n.t('permission_description')}
          </Text>

          <View style={styles.permissionContainer}>
            <View style={{ width: 30, marginRight: 10 }}>
              <Image source={require('../assets/images/mapPermission.png')} />
            </View>

            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.permissionType}>{i18n.t('location')}</Text>
                {this.state.locationPermission ? (
                  <Image source={require('../assets/images/check.png')} />
                ) : (
                  <Text style={{ color: '#bdbdbd', letterSpacing: -0.9 }}>
                    {i18n.t('wait_for_permission')}
                  </Text>
                )}
              </View>
              <Text style={styles.plainText}>{i18n.t('current_location')}</Text>
            </View>
          </View>
          {this.state.locationPermission
            ? this.renderGoNext()
            : this.renderPermissionWait()}
        </View>
      </View>
    )
  }
}

const styles = {
  container: { flex: 1, backgroundColor: 'white', justifyContent: 'center' },
  headerText: {
    width: Layout.window.width,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: -0.7,
    marginBottom: 21,
  },
  permissionContainer: {
    flexDirection: 'row',
    width: Layout.window.width,
    alignItems: 'center',
    marginLeft: 35,
    marginBottom: 30,
  },
  plainText: {
    fontSize: 14,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  permissionType: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 10,
  },
  buttonStyle: {
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: 35,
    marginHorizontal: 17,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonEnabled: {
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonEnabledText: {
    fontSize: 17,
    letterSpacing: -0.6,
  },
  buttonDisabled: {
    backgroundColor: '#eaeaea',
  },
  buttonDisabledText: {
    fontSize: 17,
    letterSpacing: -0.6,
    color: '#d3d3d3',
  },
}
