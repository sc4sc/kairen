import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Location } from 'expo';

import ReportItem from '../../components/ReportItem';
import { typeMap as incidentTypeMap } from '../../constants/Incidents';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import NaverMap from '../../components/NaverMap';

const geojsonutil = require('geojson-utils');

export default class Locator extends React.Component {
  constructor() {
    super();

    this.state = {
      markerRegion: {
        lat: 36.374159,
        lng: 127.365864,
      },
      location: '',
    };
    this.onPressReport = this.onPressReport.bind(this);
    this.locatePosition = this.locatePosition.bind(this);
    this.checkIsInbuilding = this.checkIsInbuilding.bind(this);
  }

  onPressReport() {
    this.props.onConfirm(this.state.markerRegion);
  }

  async locatePosition() {
    const location = await Location.getCurrentPositionAsync();
    const { longitude, latitude } = location.coords;

    this.setState({ markerRegion: { lat: latitude, lng: longitude } });
    this.checkIsInbuilding({ lat: latitude, lng: longitude });
    this.map.panTo({ lng: longitude, lat: latitude }, {});
  }

  checkIsInbuilding(coords) {
      const n1 = require('../../assets/geojson/N1.json');
      const isIn = geojsonutil.pointInPolygon(
          {'type':'Point','coordinates':[coords.lng, coords.lat]}, n1);
      if (isIn) {
          this.setState({ location: n1.properties.name });
      } else {
          this.setState({ location: '' });
      }
  }

  render() {
    const { lat, lng } = this.state.markerRegion;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ marginHorizontal: 20 }}>
          <ReportItem
            type={this.props.selectedIncident}
            title={incidentTypeMap[this.props.selectedIncident].title}
          />
          <Text style={styles.subHeaderText}> 위치 선택 </Text>
        </View>
        <View style={styles.searchBox}>
          <Text style={styles.searchText}>{this.state.location}</Text>
          <Ionicons name="md-search" size={26} />
        </View>
        <NaverMap
          ref={el => (this.map = el)}
          style={{ flex: 1 }}
          markers={[{ key: 'incidentLocation', coords: this.state.markerRegion }]}
          onPress={coords => {
              this.checkIsInbuilding(coords);
              this.setState({ markerRegion: coords });
          }}
        >
        </NaverMap>

        {/* 큰 View를 만들면 지도를 가려 인터랙션이 안 됨 */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: Layout.window.width,
            padding: 12,
          }}
        >
          <TouchableOpacity style={styles.confirmButton} onPress={this.onPressReport}>
            <Text style={styles.buttonText}>제보 등록</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.gpsButton} onPress={this.locatePosition}>
          <MaterialIcons style={{ color: 'white' }} name="gps-fixed" size={26} />
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            top: 150,
            right: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
          }}
        >
          <Text>lat {lat}</Text>
          <Text>lng {lng}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subHeaderText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  searchBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    height: 57,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.22,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: 'white',
  },
  searchText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  gpsButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 80,
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
  confirmButton: {
    backgroundColor: Colors.buttonGrey,
    marginHorizontal: 8,
    paddingVertical: 18,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.22,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  buttonContainer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    width: Layout.window.width,
    height: Layout.window.height,
  },
});
