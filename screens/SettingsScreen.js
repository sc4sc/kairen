import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native'

import SwitchToggle from 'react-native-switch-toggle';

import Colors from '../constants/Colors'
import { Icon } from '@shoutem/ui';


export class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  state = { alertAlarm: false };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.notchMargin} />
        <View style={styles.headerContainer}>
          <Text style={styles.header}> 설정 </Text>
          <Icon 
            name="close" 
            style={{ flex: 1 }}
            onPress={() => {this.props.navigation.pop()}}
          />
        </View>
        
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}> 계정 </Text>
          <View style={styles.cardContent}>
            <Text style={{ fontSize: 15 }}> 홍길동 </Text>
            <Text style={{ fontSize: 15, color: Colors.textRed }}> 로그아웃 </Text>
          </View>
        </View>
        
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}> 알림 설정 </Text>
          <View style={styles.cardContent}>
            <Text style={{ fontSize: 15 }}> '주의' 제보 알림 받기 </Text>
            <SwitchToggle
              containerStyle={{ width: 53, hegiht: 30, borderRadius: 28.5, padding: 2 }}
              circleStyle= {{ width: 24, height: 24, borderRadius: 27.5 }}
              switchOn={this.state.alertAlarm} 
              backgroundColorOn={Colors.switchGreen}
              circleColorOn='white'
              onPress={() => this.setState({ alertAlarm: !this.state.alertAlarm })} 
            />
          </View>
        </View>

        <View style={styles.cardContainer}/>

        <View style={styles.cardContainer}>
          <Text style={{ fontSize: 15 }}> 이 앱에 대하여 </Text> 
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notchMargin: { height: Platform.select({ android: 40, ios: 0 }) },
  headerContainer: { flexDirection: 'row', justifyContent: 'center', paddingLeft: 20, paddingBottom: 10 },
  header: { flex: 6, textAlign: 'center', fontSize: 20, fontWeight: '800', color: Colors.defaultBlack},
  
  cardContainer: { margin: 20 },
  cardTitle: { fontSize: 13, color: Colors.lightGrey },
  cardContent: { flexDirection: 'row', justifyContent: 'space-between'}
});
