import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from '@shoutem/ui';

import { getBottomSpace } from 'react-native-iphone-x-helper';

import Layout from '../constants/Layout';
import Colors from '../constants/Colors';

import Incident from '../components/Incident';

export class IncidentList extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.notchMargin} />

        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Recent</Text>
            <View style={{ flex: 1 }} />
            <Icon name="settings" onPress={() => this.props.navigation.navigate('Setting')}/>
          </View>
          <ScrollView style={{ flex: 1 }}>
            {[...Array(8)].map(() => (
              <Incident
                onPress={() => this.props.navigation.navigate('IncidentDetail')}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => this.props.navigation.navigate('Modal')}
        >
          <Text style={styles.reportButtonText}>Send Report</Text>
        </TouchableOpacity>
        <View style={styles.iPhoneBottomFill} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  notchMargin: { height: Platform.select({ android: 40, ios: 0 }) },
  headerContainer: { paddingLeft: 20, paddingBottom: 10, paddingRight: 16, flexDirection: 'row', borderBottomWidth: 1, borderColor: Colors.borderGrey },
  header: { fontSize: 28, fontWeight: '800', color: Colors.defaultBlack },
  reportButton: {
    backgroundColor: Colors.buttonGrey,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    padding: 16,
    paddingBottom: 16,
  },
  reportButtonText: { color: 'white', fontWeight: '500', fontSize: 24 },
  iPhoneBottomFill: { backgroundColor: 'black', height: getBottomSpace() },
});
