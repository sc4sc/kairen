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
import { SafeAreaView, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Location } from 'expo';

import { getStatusBarHeight } from '../utils/index.js';
import NaverMap from '../components/NaverMap';
import AndroidTopMargin from '../components/AndroidTopMargin';
import Layout from '../constants/Layout';
import { newIncidentPostRequested } from '../actions/newIncident';
import { checkIsInbuilding } from '../utils';
import Colors from '../constants/Colors';
import memoize from 'fast-memoize';
import * as geojsonutil from 'geojson-utils';

const statusBarHeight = getStatusBarHeight();

class NewIncidentDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      markerCoords: null,
      locationName: '',
    };
    this.handlePressReport = this.handlePressReport.bind(this);
    this.report = this.report.bind(this);
    this.locatePosition = this.locatePosition.bind(this);
  }

  handlePressReport() {
    Alert.alert(
      '제보하시겠습니까?',
      '자세한 현장 상황 확인을 위해 카이스트 안전팀이 곧 연락합니다',
      [
        { text: '취소' },
        { text: '확인', onPress: () => this.report(this.state.markerCoords) },
      ]
    );
  }

  handlePressMap = coords => {
    const kaist = require('../assets/geojson/KAIST.json');
    const point = { type: 'Point', coordinates: [coords.lng, coords.lat] };

    if (geojsonutil.pointInPolygon(point, kaist.features[0].geometry)) {
        this.updateLocationName(coords);
        this.setState({ markerCoords: coords });
    } else {
      Alert.alert('위치를 지정할 수 없습니다.', 'KAIST 내부만 선택해주세요.', [
        { text: '확인' },
      ]);
    }
  };

  report(region) {
    const { lat, lng } = region;
    this.props.newIncidentPostRequested(
      {
        type: this.props.selectedIncident,
        lat,
        lng,
      },
      () => {
        this.props.navigation.dispatch(StackActions.popToTop());
      }
    );
  }

  updateLocationName = coords => {
    const locationGeoObj = checkIsInbuilding(coords);
    this.setState({
      locationName: locationGeoObj ? locationGeoObj.properties.name : '',
    });
  };

  async locatePosition() {
    const currentPosition = (await Location.getCurrentPositionAsync({
      maximumAge: 5000,
    })).coords;
    const { longitude, latitude } = currentPosition;
    const coords = { lng: longitude, lat: latitude };
    this.updateLocationName(coords);
    this.setState({ markerCoords: coords });
    this.map.panTo(coords, {});
  }

  getMarkers = memoize(markerCoords => {
    if (!markerCoords) {
      return [];
    }
    return [
      {
        key: 'incidentLocation',
        coords: markerCoords,
      },
    ];
  });

  render() {
    const { container, headerContainer, headerText } = styles;
    // const { lat, lng } = this.state.markerCoords;

    return (
      <View style={container}>
        <StatusBar barStyle="light-content" backgroundColor="#ff9412" />
        <View style={headerContainer}>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={headerText}>{this.props.selectedIncident}</Text>
          </TouchableWithoutFeedback>
          <Ionicons
            name="ios-close"
            size={40}
            style={{ color: 'white', marginRight: 20 }}
            onPress={() => this.props.navigation.navigate('IncidentList')}
          />
        </View>

        <NaverMap
          ref={el => (this.map = el)}
          style={{ flex: 1 }}
          markers={this.getMarkers(this.state.markerCoords)}
          onPress={this.handlePressMap}
        />
        <View style={styles.searchBoxContainer}>
          <Text style={styles.questionText}>장소는 어디인가요?</Text>
          <View style={styles.searchBox}>
            <Text style={styles.searchText}>{this.state.locationName}</Text>
            <Ionicons name="md-search" size={26} />
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={this.handlePressReport}
        >
          <Text style={styles.buttonText}>제보 등록</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gpsButton}
          onPress={this.locatePosition}
        >
          <MaterialIcons
            style={{ color: 'white' }}
            name="gps-fixed"
            size={26}
          />
        </TouchableOpacity>
        {/*<View*/}
        {/*style={{*/}
        {/*position: 'absolute',*/}
        {/*top: 200,*/}
        {/*right: 10,*/}
        {/*backgroundColor: 'rgba(0, 0, 0, 0.12)',*/}
        {/*}}*/}
        {/*>*/}
        {/*<Text>lat {lat}</Text>*/}
        {/*<Text>lng {lng}</Text>*/}
        {/*</View>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf4',
  },
  headerContainer: {
    paddingTop: statusBarHeight+10,
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
  searchBoxContainer: {
    width: Layout.window.width - 40,
    top: 115,
    position: 'absolute',
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 15,
    zIndex: 999,
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
  gpsButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 116,
    right: 12,
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: Colors.buttonGrey,
    marginBottom: 21,
    marginRight: 13,
    alignSelf: 'flex-end',
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.22,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default connect(
  state => {
    return {
      selectedIncident: state.newIncident.selectedIncident,
    };
  },
  {
    newIncidentPostRequested,
  }
)(NewIncidentDetail);
