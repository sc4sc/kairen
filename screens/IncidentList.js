import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import * as apis from '../apis';

import { getBottomSpace } from '../utils';

import Colors from '../constants/Colors';

import Incident from '../components/Incident';
import AndroidTopMargin from '../components/AndroidTopMargin';
import { Notifications } from 'expo';
import {
  incidentsListLoadMore,
  incidentsListRefresh,
  incidentsListReset,
} from '../actions/incidentsList';

class IncidentList extends React.Component {
  static navigationOptions = { header: null };

  componentDidMount() {
    this._notificationSubscription = Notifications.addListener(notification =>
      console.log('Notification arrived:', notification)
    );
    this._willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      this.willFocus
    );
    this.handleRefresh();
  }

  componentWillUnmount() {
    this._notificationSubscription.remove();
    this._willFocusSubscription.remove();
  }

  willFocus = () => {
    this.handleRefresh();
  };

  renderItem = ({ item, index }) => {
    return (
      <Incident
        data={item}
        onPress={() =>
          this.props.navigation.navigate('IncidentDetail', {
            incidentDetail: item,
          })
        }
      />
    );
  };

  handleRefresh = () => {
    this.props.incidentsListRefresh();
  };

  handleEndReached = () => {
    this.props.incidentsListLoadMore();
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
          <FlatList
            data={this.props.incidents}
            renderItem={this.renderItem}
            refreshing={this.props.loading && this.props.incidents.length === 0}
            onRefresh={this.handleRefresh}
            onEndReached={this.handleEndReached}
          />
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
    const { byId, idList, loading } = state.incidentsList;
    return {
      incidents: idList.map(id => byId[id]),
      loading,
    };
  },
  {
    incidentsListLoadMore,
    incidentsListReset,
    incidentsListRefresh,
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
    alignItems: 'center',
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
