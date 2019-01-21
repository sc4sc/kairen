import React from 'react';
import {
  Alert,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements';

import AndroidTopMargin from '../components/AndroidTopMargin';
import { authLoginRequest } from '../actions/auth';

class Login extends React.Component {
  state = { text: '', isSecureTeam: false };

  render() {
    const {
      container,
      headerText,
      inputBox,
      checkBoxContainer,
      loginButton,
      mainText,
      nameText,
    } = styles;

    return (
      <View style={{ flex: 1 }}>
        <AndroidTopMargin />
        <SafeAreaView style={container}>
          <Text style={headerText}> SC4SC </Text>

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
              onPress={() =>
                this.setState(s => ({
                  ...s,
                  isSecureTeam: !s.isSecureTeam,
                }))
              }
              checked={this.state.isSecureTeam}
              title={'나는 안전팀입니다.'}
            />
          </View>

          <TouchableOpacity
            style={loginButton}
            onPress={() => {
              const { text, isSecureTeam } = this.state;
              this.props.authLoginRequest(
                text,
                isSecureTeam,
                () => {
                  this.props.navigation.navigate('App', {
                    isSecureTeam: this.state.isSecureTeam,
                  });
                },
                () => {
                  Alert.alert('Login failed', 'Sorry, login has failed.');
                }
              );
            }}
          >
            <Text style={mainText}>로그인</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}

export default connect(
  null,
  { authLoginRequest }
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
