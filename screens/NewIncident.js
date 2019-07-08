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
import { blockStatement } from '@babel/types';

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

          // TODO: Uncomment this function call
          this.props.nextPage();

          // TODO: Comment this function call
          // this.props.navigation.navigate('NewIncidentDetail');
        }}
      />
    );
  }

  render() {
    // TODO: Uncomment this style.
    const { container } = styles;

    // TODO: Comment this style.
    // const { container, headerContainer, headerText } = styles;

    return (
      <View style={container}>
        {/* TODO: Comment this block, from here */}
        {/* <StatusBar backgroundColor="#ff0000" barStyle="light-content" />
        <View style={headerContainer}>
          <Text style={headerText}>제보 종류 선택</Text>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.dispatch(StackActions.popToTop())
            }
          >
            <Image
              source={require('../assets/images/combined-shape.png')}
              style={{ width: 20, height: 20, marginRight: 22 }}
            />
          </TouchableOpacity>
        </View> */}
        {/* to here */}

        <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 27 }}>
          <Text style={styles.subHeaderText}>긴급제보</Text>
          <FlatList
            data={incidentTypes}
            keyExtractor={(item, index) => `${index}`}
            renderItem={this.renderItem}
          />

          {/* TODO: Uncomment this View, from here */}
          {/* <View style={{ height: 40 }}></View> */}
          {/* to here */}
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

  // TODO: Comment this style block, from here
  // headerContainer: {
  //   paddingTop: statusBarHeight + (getBottomSpace() == 0 ? 20 : 25),
  //   paddingBottom: 22,
  //   flexDirection: 'row',
  //   backgroundColor: '#ff9412',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  // headerText: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   color: 'white',
  //   marginLeft: 20,
  // },
  // barContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   marginBottom: 25,
  // },
  // to here
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
