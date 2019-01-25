import React from 'react';
import {
  Alert,
  View,
  Text,
  Animated,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements';

import AndroidTopMargin from '../components/AndroidTopMargin';
import Spinner from '../components/Spinner';
import { authLoginRequest, authToggleSecureTeam } from '../actions/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  onButtonPress() {
    const { navigation } = this.props;
    const alertTitle = 'Login Failed';
    const alertMsg = 'Sorry, login has failed.';

    if (this.state.text.trim() === '') {
      Alert.alert('Name is empty', 'Please fill in the form.');
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
      <SafeAreaView style={{ flex: 1 }}>
        <AndroidTopMargin />
        <View style={container}>
          <Text style={headerText}>SC4SC</Text>

          <Text style={nameText}> 이름 </Text>
          <TextInput
            style={inputBox}
            placeholder={'입력...'}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />

          <View style={checkBoxContainer}>
            <CheckBox
              containerStyle={{
                backgroundColor: 'transparent',
                borderWidth: 0,
              }}
              textStyle={mainText}
              onPress={this.props.authToggleSecureTeam}
              checked={this.props.isSecureTeam}
              title={'나는 안전팀입니다.'}
            />
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={this.onButtonPress.bind(this)}
            disabled={this.props.isLoading}
          >
            {this.props.isLoading ? (
              <Spinner size="small" />
            ) : (
              <Text style={styles.mainText}>로그인</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSecureTeam: state.auth.isSecureTeam,
    isLoading: state.auth.loginInProgress,
  };
};

export default connect(
  mapStateToProps,
  { authLoginRequest, authToggleSecureTeam }
)(Login);

const styles = {
  container: { flex: 1, backgroundColor: '#424242', padding: 15 },
  headerText: {
    fontSize: 33,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 60,
    letterSpacing: 0.5,
  },
  inputBox: {
    backgroundColor: 'white',
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
    backgroundColor: '#5c5c5c',
    alignItems: 'center',
    justifyContent: 'center',
    height: 53,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.22,
    shadowRadius: 2,
    elevation: 5,
  },
  mainText: {
    fontSize: 15,
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
};
