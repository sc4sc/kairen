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

import Layout from '../constants/Layout';
import Colors from '../constants/Colors'

import Incident from '../components/Incident';

export default class IncidentList extends React.Component {
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
            <Icon name="settings" />
          </View>
          <ScrollView style={{ flex: 1 }}>
            {[...Array(8)].map(() => <Incident onPress={() => this.props.navigation.navigate('IncidentDetail')}/>)}
          </ScrollView>
        </SafeAreaView>
        <TouchableOpacity style={styles.reportButton}>
          <Text style={styles.reportButtonText}>Send Report</Text>
        </TouchableOpacity>
        <View style={{ height: 20 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width,
    height: Layout.window.height + 40,
    backgroundColor: '#fff',
  },
  notchMargin: { height: Platform.select({ android: 40, ios: 0 }) },
  headerContainer: { margin: 8, marginLeft: 16, flexDirection: 'row' },
  header: { fontSize: 28, fontWeight: '800', color: Colors.defaultBlack },
  reportButton: {
    backgroundColor: 'grey',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    padding: 8,
  },
  reportButtonText: { color: Colors.buttonGrey, fontWeight: '500', fontSize: 24 },
});
