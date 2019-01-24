import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { MapView, Location } from 'expo';
const { Marker } = MapView;
import lodash from 'lodash';

import ReportItem from '../../components/ReportItem';

import { typeMap as incidentTypeMap } from '../../constants/Incidents';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

export default class Locator extends React.Component {
  state = {
    markerRegion: {
      latitude: 36.374159,
      longitude: 127.365864,
      latitudeDelta: 0.00522,
      longitudeDelta: 0.00221,
    },
  };

  locatePosition = async () => {
    await Location.requestPermissionsAsync();
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    const { longitude, latitude } = location.coords;
    this.map.animateToCoordinate({ longitude, latitude }, 0);
  };

  changeMarkerRegion = markerRegion => {
    this.setState({ markerRegion });
  };

  render() {
    const {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    } = this.state.markerRegion;

    const { onConfirm } = this.props;

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
          <Text style={styles.searchText}> 한국과학기술원 N1 </Text>
          <Ionicons name="md-search" size={26} />
        </View>
        <MapView
          ref={el => (this.map = el)}
          style={{ flex: 1 }}
          initialRegion={this.state.markerRegion}
          onRegionChange={this.changeMarkerRegion}
        >
          <Marker coordinate={this.state.markerRegion} />
        </MapView>
        {/* 큰 View를 만들면 지도를 가려 인터랙션이 안 됨 */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: Layout.window.width,
            padding: 12,
          }}
        >
          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.buttonText}>제보 등록</Text>
          </TouchableOpacity>
        </View>
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
        <View
          style={{
            position: 'absolute',
            top: 150,
            right: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
          }}
        >
          <Text>lat {latitude}</Text>
          <Text>lng {longitude}</Text>
          <Text>lat-d {latitudeDelta}</Text>
          <Text>lng-d {longitudeDelta}</Text>
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
