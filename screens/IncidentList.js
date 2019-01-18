import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from '@shoutem/ui';

import { getBottomSpace } from '../utils';

import Colors from '../constants/Colors';

import Incident from '../components/Incident';
import AndroidTopMargin from '../components/AndroidTopMargin';

export class IncidentList extends React.Component {
  static navigationOptions = { header: null };

  render() {
    return (
      <View style={styles.container}>
        <AndroidTopMargin />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Recent</Text>
            <View style={{ flex: 1 }} />
            <Icon
              name="settings"
              onPress={() => this.props.navigation.navigate('Setting')}
            />
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
  headerContainer: {
    paddingLeft: 20,
    paddingBottom: 10,
    paddingRight: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.borderGrey,
  },
  header: { fontSize: 28, fontWeight: '800', color: Colors.defaultBlack },
  reportButton: {
    backgroundColor: Colors.buttonGrey,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    padding: 16,
    paddingBottom: 16 + getBottomSpace(), // handle the bottom empty space for iPhone X
  },
  reportButtonText: { color: 'white', fontWeight: '500', fontSize: 24 },
});
