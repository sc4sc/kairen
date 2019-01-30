import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { createSelector } from 'reselect';

import NaverMap from '../components/NaverMap';
import ReportItem from '../components/ReportItem';
import AndroidTopMargin from '../components/AndroidTopMargin';
import * as actions from '../actions/newIncident';
import Layout from '../constants/Layout';

class NewIncidentDetail extends React.Component {
  constructor() {
    super();

    this.handlePressReport = this.handlePressReport.bind(this);
    this.report = this.report.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  handlePressReport(region) {
    Alert.alert(
      '제보하시겠습니까?',
      '자세한 현장 상황 확인을 위해 카이스트 안전팀이 곧 연락합니다',
      [{ text: '취소' }, { text: '확인', onPress: () => this.report(region) }]
    );
  }

  report(region) {
    const { latitude, longitude } = region;
    this.props.newIncidentPostRequested(
      {
        type: this.props.selectedIncident,
        lat: latitude,
        lng: longitude,
      },
      () => {
        this.props.navigation.goBack();
      }
    );
  }

  renderItem(incident) {
    return (
      <ReportItem
        type={incident.item.type}
        title={incident.item.title}
        onPressNext={this.handleChangeScreen}
      />
    );
  }

  render() {
    const { container, headerContainer, headerText } = styles;

    return (
      <SafeAreaView style={container}>
        <StatusBar barStyle="light-content" backgroundColor="#ff9412" />
        <AndroidTopMargin style={{ backgroundColor: '#ff9412' }} />
        <View style={headerContainer}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
            <Text style={headerText}>{this.props.selectedIncident}</Text>
          </TouchableWithoutFeedback>
          <Ionicons
            name="ios-close"
            size={40}
            style={{ color: 'white', marginRight: 20 }}
            onPress={() => this.props.navigation.navigate('IncidentList')}
          />
        </View>

        <View style={styles.searchBoxContainer}>
          <Text style={styles.questionText}>장소는 어디인가요?</Text>
          <View style={styles.searchBox}>
            <Text style={styles.searchText}>한국과학기술원 N1 404</Text>
            <Ionicons name="md-search" size={26} />
          </View>
        </View>

        <NaverMap style={{ flex: 1 }} markers={this.props.markers} />
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText}>제보 등록</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf4',
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#ff9412',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  headerText: { fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: 20 },
  searchBoxContainer: {
    width: Layout.window.width - 40,
    top: 115,
    position: 'absolute',
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 15,
  },
  questionText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#f5a623',
    marginBottom: 9,
  },
  searchBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchText: {
    fontSize: 16,
  },
  buttonStyle: {
    position: 'absolute',
    width: Layout.window.width - 30,
    bottom: 38,
    backgroundColor: '#f47b36',
    borderRadius: 10,
    marginHorizontal: 15,
    padding: 17,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const getCoordsFromIncident = incident => ({
  lat: incident.lat,
  lng: incident.lng,
});

const incidentsSelector = createSelector(
  state => state.incidentsList.byId,
  state => state.incidentsList.idList,
  (byId, idList) => idList.map(id => byId[id])
);

const incidentMarkersSelector = createSelector(
  incidentsSelector,
  state => state.incidentsList.indexSelected,
  (incidents, indexSelected) => {
    if (!(typeof indexSelected === 'number' && indexSelected >= 0)) {
      return [];
    }
    return [
      {
        key: 'selected',
        coords: getCoordsFromIncident(incidents[indexSelected]),
      },
    ];
  }
);

export default connect(state => {
  const { loading, indexSelected } = state.incidentsList;
  const incidents = incidentsSelector(state);

  return {
    incidents,
    markers: incidentMarkersSelector(state),
    loading,
    indexSelected,
    selectedIncident: state.newIncident.selectedIncident,
  };
})(NewIncidentDetail);
