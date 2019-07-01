import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import * as apis from '../apis';
import { authLoginSuccess } from '../actions/auth';

class AutoLogin extends React.Component {
  componentDidMount = async () => {
    const { navigation } = this.props;
    const appToken = await SecureStore.getItemAsync('appToken');
    if (!appToken) {
      console.log('[AutoLogin] Token does not exist');
      navigation.navigate('Login');
      return;
    }

    apis.setAppToken(appToken);
    const userProfile = await apis.getProfile();

    if (userProfile.error) {
      // Invalidate token
      SecureStore.deleteItemAsync('appToken');
      console.log('[AutoLogin] Token is not valid - Server error');
      navigation.navigate('Login');
      return;
    }

    this.props.authLoginSuccess(userProfile);
    console.log('[AutoLogin] Autologin Succeeded');

    const tryUpdatePushToken = () => {
      apis.updatePushToken().then(r => {
        if (r.error) {
          setTimeout(tryUpdatePushToken, 5000);
        }
      });
    };

    tryUpdatePushToken();

    navigation.navigate('App');
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'small'} />
      </View>
    );
  }
}

export default connect(
  null,
  {
    authLoginSuccess,
  }
)(AutoLogin);
