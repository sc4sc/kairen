import React from 'react';
import { FlatList, StyleSheet, Text, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import ReportItem from '../components/ReportItem';
import AndroidTopMargin from '../components/AndroidTopMargin';
import { getStatusBarHeight } from '../utils/index.js';
import * as actions from '../actions/newIncident';
import { types as incidentTypes } from '../constants/Incidents';
import { incidentsListRefresh } from '../actions/incidentsList';
// import Locator from './NewIncident/Locator';

const statusBarHeight = getStatusBarHeight();

class NewIncident extends React.Component {
  constructor() {
    super();
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem({ item: incident }) {
    return (
      <ReportItem
        type={incident.type}
        title={incident.title}
        onPress={() => {
          this.props.selectIncident(incident.type);
          this.props.navigation.navigate('NewIncidentDetail');
        }}
      />
    );
  }

  render() {
    const { container, headerContainer, headerText } = styles;

    return (
      <View style={container}>
        <StatusBar backgroundColor={'#ff0000'} barStyle={'light-content'} />
        <View style={headerContainer}>
          <Text style={headerText}>제보 종류 선택</Text>
          <Ionicons
            name="ios-close"
            size={40}
            style={{ color: 'white', marginRight: 20 }}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 27 }}>
          <Text style={styles.subHeaderText}>긴급제보</Text>
          <FlatList data={incidentTypes} renderItem={this.renderItem} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    paddingTop: statusBarHeight + 10,
    flexDirection: 'row',
    backgroundColor: '#ff9412',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20,
  },
  subHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  stageBar: { width: 30, height: 3, borderRadius: 25.5 },
});

const mapStateToProps = state => {
  const { selectedIncident, isFirstStage } = state.newIncident;
  return {
    selectedIncident,
    isFirstStage,
  };
};

export default connect(
  mapStateToProps,
  { ...actions, incidentsListRefresh }
)(NewIncident);
