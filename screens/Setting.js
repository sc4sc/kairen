import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
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
            <TouchableWithoutFeedback onPress={this.goBack.bind(this)}>
              <Ionicons name="md-close" size={26} />
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}> 계정 </Text>
          <View style={styles.cardContent}>
            <Text style={{ fontSize: 15 }}> {this.props.userId} </Text>
            <Text style={{ fontSize: 15, color: Colors.textRed, fontWeight: '500' }}>로그아웃</Text>
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
              onPress={() => this.setState({ alertAlarm: !this.state.alertAlarm })}
            />
          </View>
        </View>

        <View style={styles.cardContainer} />

        <View style={styles.cardContainer}>
          <Text style={{ fontSize: 15 }}> 이 앱에 대하여 </Text>
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
    right: 20,
    top: 20,
    width: 30,
    alignItems: 'center',
  },
  switchStyle: {
    width: 53,
    height: 30,
    borderRadius: 28.5,
    padding: 2,
  },
  cardContainer: { margin: 20 },
  cardTitle: { fontSize: 13, color: Colors.lightGrey },
  cardContent: { flexDirection: 'row', justifyContent: 'space-between' },
});

const mapStateToProps = state => ({
  userId: state.auth.user.username,
});
export default connect(mapStateToProps)(Setting);
