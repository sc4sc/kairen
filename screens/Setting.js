import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import SwitchToggle from 'react-native-switch-toggle';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';
import AndroidTopMargin from '../components/AndroidTopMargin';

class Setting extends React.Component {
  constructor() {
    super();

    this.state = { alertAlarm: false };
  }

  goBack() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AndroidTopMargin />
        <View style={styles.headerContainer}>
          <Text style={styles.header}> 설정 </Text>
          <View style={styles.buttonContainer}>
            <TouchableWithoutFeedback
              style={{ flex: 1 }}
              onPress={this.goBack.bind(this)}
            >
              <Image source={require('../assets/images/back.png')} />
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}> 계정 </Text>
          <View style={[styles.cardContent, styles.accountContainer]}>
            <Text style={{ fontSize: 15 }}> {this.props.userId} </Text>
            <Text
              style={{ fontSize: 15, color: Colors.textRed, fontWeight: '500' }}
            >
              로그아웃
            </Text>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}> 알림 설정 </Text>
          <View style={styles.cardContent}>
            <Text style={{ fontSize: 15 }}> '주의' 제보 알림 받기 </Text>
            <SwitchToggle
              containerStyle={styles.switchStyle}
              circleStyle={{ width: 24, height: 24, borderRadius: 27.5 }}
              switchOn={this.state.alertAlarm}
              backgroundColorOn={Colors.switchGreen}
              circleColorOn="white"
              onPress={() =>
                this.setState({ alertAlarm: !this.state.alertAlarm })
              }
            />
          </View>
        </View>

        <View style={styles.cardContainer} />
        <View style={styles.delimiter} />
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 15, marginVertical: 17 }}> 문의하기 </Text>
          <Text style={{ fontSize: 15, marginVertical: 17 }}>
            이 앱에 대하여
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    flex: 6,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
  },
  buttonContainer: {
    position: 'absolute',
    left: 20,
    top: 20,
    width: 40,
    height: 30,
    alignItems: 'center',
  },
  switchStyle: {
    width: 53,
    height: 30,
    borderRadius: 28.5,
    padding: 2,
  },
  cardContainer: { margin: 20 },
  cardTitle: { fontSize: 13, color: Colors.lightGrey, marginBottom: 7.5 },
  cardContent: { flexDirection: 'row', justifyContent: 'space-between' },
  accountContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#eaeaea',
    borderRadius: 5,
    paddingHorizontal: 21,
    paddingVertical: 18.5,
    shadowOffset: { width: 0, height: 8 },
    shadowColor: '#ddd',
    shadowOpacity: 0.5,
    shadowRadius: 15,
    // elevation: 5,
  },
  delimiter: {
    borderTopWidth: 1,
    borderColor: '#d8d8d8',
    marginLeft: 20,
    width: 25,
  },
});

const mapStateToProps = state => ({
  userId: state.auth.user.username,
});
export default connect(mapStateToProps)(Setting);
