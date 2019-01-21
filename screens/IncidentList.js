import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { getBottomSpace } from '../utils';

import Colors from '../constants/Colors';

import Incident from '../components/Incident';
import AndroidTopMargin from '../components/AndroidTopMargin';
import { Notifications } from 'expo';
import {
  incidentsListLoadMore,
  incidentsListReset,
} from '../actions/incidentsList';

class IncidentList extends React.Component {
  static navigationOptions = { header: null };

  componentDidMount() {
    this._notificationSubscription = Notifications.addListener(notification =>
      console.log('Notification arrived:', notification)
    );

    this.props.incidentsListReset();
    this.props.incidentsListLoadMore();
  }

  componentWillUnmount() {
    this._notificationSubscription.remove();
  }

  renderItem = ({ item, index }) => {
    return (
      <Incident
        data={item}
        onPress={() => this.props.navigation.navigate('IncidentDetail')}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <AndroidTopMargin />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Recent</Text>
            <View style={{ flex: 1 }} />
            <Ionicons
              name="md-settings"
              size={26}
              onPress={() => this.props.navigation.navigate('Setting')}
            />
          </View>
          <FlatList data={this.props.incidents} renderItem={this.renderItem} />
          {/*<ScrollView style={{ flex: 1 }}>*/}
          {/*{[...Array(8)].map(() => (*/}
          {/*<Incident*/}
          {/*onPress={() => this.props.navigation.navigate('IncidentDetail')}*/}
          {/*/>*/}
          {/*))}*/}
          {/*</ScrollView>*/}
        </SafeAreaView>
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => this.props.navigation.navigate('NewIncident')}
        >
          <Text style={styles.reportButtonText}>Send Report</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  state => {
    const { byId, idList } = state.incidentsList;
    return {
      incidents: idList.map(id => byId[id]),
    };
  },
  {
    incidentsListLoadMore,
    incidentsListReset,
  }
)(IncidentList);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  headerContainer: {
    paddingLeft: 20,
    paddingVertical: 10,
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
