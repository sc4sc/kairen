import React from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements';

import Layout from '../constants/Layout';
import AndroidTopMargin from '../components/AndroidTopMargin';
import Spinner from '../components/Spinner';
import { authLoginRequest, authToggleSecureTeam } from '../actions/auth';

import { getStatusBarHeight } from '../utils/index.js';

const statusBarHeight = getStatusBarHeight();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '테스트' };
  }

  onButtonPress() {
    const { navigation } = this.props;
    const alertTitle = 'Login Failed';
    const alertMsg = 'Sorry, login has failed.';

    if (this.state.text.trim() === '') {
      Alert.alert(
        'Empty Name',
        '공백으로 이루어진 이름으로는 접속하실 수 없습니다.'
      );
      return;
    }

    this.props.authLoginRequest(
      this.state.text,
      this.props.isSecureTeam,
      () => {
        navigation.navigate('App');
      },
      () => {
        Alert.alert(alertTitle, alertMsg);
      }
    );
  }

  render() {
    const {
      container,
      headerText,
      inputBox,
      checkBoxContainer,
      nameText,
      mainText,
    } = styles;
    return (
      <View style={{ flex: 1 }}>
        <View style={container}>
          <Image
            style={{ marginLeft: -10 }}
            source={require('../assets/images/fronticon.png')}
          />
          <Text style={headerText}>KAIREN</Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={this.onButtonPress.bind(this)}
            disabled={this.props.isLoading}
          >
            {this.props.isLoading ? (
              <Spinner size="small" />
            ) : (
              <Text style={styles.mainText}>KAIST SSO 로그인</Text>
            )}
          </TouchableOpacity>
          <Text
            style={styles.aboutText}
            onPress={() =>
              this.props.navigation.navigate('AboutUs', { parent: '로그인' })
            }
          >
            이 앱에 대하여
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isSecureTeam: state.auth.isSecureTeam,
  isLoading: state.auth.loginInProgress,
});

export default connect(
  mapStateToProps,
  { authLoginRequest, authToggleSecureTeam }
)(Login);

const styles = {
  container: {
    flex: 1,
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    paddingTop: statusBarHeight,
    fontSize: 33,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 29,
    marginTop: -15,
    letterSpacing: -1,
  },
  inputBox: {
    backgroundColor: 'black',
    height: 53,
    borderRadius: 5,
    marginBottom: 23,
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 12,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 53,
  },
  loginButton: {
    backgroundColor: '#2c8ff5',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: Layout.window.width - 40,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 8 },
    shadowColor: '#2c8ff5',
    shadowOpacity: 0.5,
    shadowRadius: 15,
    // elevation: 5,
  },
  mainText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  nameText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  aboutText: {
    marginTop: 25,
    textDecorationLine: 'underline',
  },
};
