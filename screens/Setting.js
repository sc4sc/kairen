import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Linking,
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

  goToAboutPage() {
    this.props.navigation.navigate('AboutUs', { parent: '설정' });
  }

  handleLogout = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AndroidTopMargin />
        <View style={styles.headerContainer}>
          <Text style={styles.header}> 설정 </Text>
          <View style={styles.buttonContainer}>
            <TouchableWithoutFeedback onPress={this.goBack.bind(this)}>
              <View style={{ width: 20, alignItems: 'center' }}>
                <Image source={require('../assets/images/back.png')} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}> 계정 </Text>
          <View style={[styles.cardContent, styles.accountContainer]}>
            <Text style={{ fontSize: 15 }}> 이름 아직 없음 </Text>
            <TouchableOpacity onPress={this.handleLogout}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text
                    style={{ fontSize: 15,
                      color: Colors.textRed,
                      fontWeight: '500',
                      marginRight: 5 }}
                >
                  로그아웃
                </Text>
                <Image style={{ width: 12, height:10 }} source={require('../assets/images/logout.png')}/>
              </View>
            </TouchableOpacity>
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
              duration={150}
              onPress={() =>
                this.setState({ alertAlarm: !this.state.alertAlarm })
              }
            />
          </View>
        </View>

        <View style={styles.cardContainer} />
        <View style={styles.delimiter} />
        <View style={{ paddingHorizontal: 20 }}>
          <TouchableWithoutFeedback
            onPress={() => Linking.openURL('mailto:kairen@kaist.ac.kr')}
          >
            <Text style={{ fontSize: 15, marginVertical: 17 }}>문의하기</Text>
          </TouchableWithoutFeedback>
          <Text
            style={{ fontSize: 15, marginVertical: 17 }}
            onPress={() => this.goToAboutPage()}
          >
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
    alignItems: 'center',
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
    left: 5,
    top: 23,
    width: 40,
    height: 30,
    alignItems: 'center',
  },
  switchStyle: {
    width: 53,
    height: 28,
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
});
export default connect(mapStateToProps)(Setting);
