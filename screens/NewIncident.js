import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { StackActions } from 'react-navigation';
import { connect } from 'react-redux';

import ReportItem from '../components/ReportItem';
import { getBottomSpace, getStatusBarHeight } from '../utils/index.js';
import * as actions from '../actions/newIncident';
import { types as incidentTypes } from '../constants/Incidents';
import { incidentsListRefresh } from '../actions/incidentsList';

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
          this.props.nextPage();
          // this.props.navigation.navigate('NewIncidentDetail');
        }}
      />
    );
  }

  render() {
    const { container } = styles;

    return (
      <View style={container}>
        <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 27 }}>
          <Text style={styles.subHeaderText}>긴급제보</Text>
          <FlatList
            data={incidentTypes}
            keyExtractor={(item, index) => `${index}`}
            renderItem={this.renderItem}
          />
          <View style={{ height: 40 }}></View>
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
  subHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
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
