import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Notifications } from 'expo';

import { getBottomSpace } from '../utils';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Incident from '../components/Incident';
import AndroidTopMargin from '../components/AndroidTopMargin';

import {
  incidentsListLoadMore,
  incidentsListRefresh,
  incidentsListReset,
} from '../actions/incidentsList';

class IncidentList extends React.Component {
  constructor() {
    super();

    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleEndReached = this.handleEndReached.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.notificationSubscription = Notifications.addListener(notification =>
      console.log('Notification arrived:', notification)
    );
    this.willFocusSubscription = this.props.navigation.addListener('willFocus', this.handleRefresh);
    this.handleRefresh();
  }

  componentWillUnmount() {
    this.notificationSubscription.remove();
    this.willFocusSubscription.remove();
  }

  handleRefresh() {
    this.props.incidentsListRefresh();
  }

  handleEndReached() {
    this.props.incidentsListLoadMore();
  }

  renderItem(incident) {
    return (
      <Incident
        data={incident.item}
        onPress={() =>
          this.props.navigation.navigate('IncidentDetail', {
            incidentDetail: incident.item,
          })
        }
      />
    );
  }

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

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.reportButton}
              onPress={() => this.props.navigation.navigate('NewIncident')}
            >
              <Text style={styles.reportButtonText}>제보하기</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.borderGrey,
    alignItems: 'center',
  },
  header: { fontSize: 28, fontWeight: '800', color: Colors.defaultBlack },
  buttonContainer: {
    position: 'absolute',
    width: Layout.window.width,
    bottom: 38,
  },
  reportButton: {
    backgroundColor: '#ff9412',
    borderRadius: 5,
    height: 63,
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 15,
    paddingBottom: 16 + getBottomSpace(), // handle the bottom empty space for iPhone X
    shadowOffset: { width: 0, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.22,
    shadowRadius: 2,
    elevation: 5,
  },
  reportButtonText: { color: 'white', fontWeight: 'bold', fontSize: 20 },
});
