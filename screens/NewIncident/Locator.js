import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { MapView, Location } from 'expo';
import { connect } from 'react-redux';

import ReportItem from '../../components/ReportItem';
import { typeMap as incidentTypeMap } from '../../constants/Incidents';
import * as actions from '../../actions/newIncident';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

const { Marker } = MapView;

class Locator extends React.Component {
  constructor() {
    super();

    this.state = {
      markerRegion: {
        latitude: 36.374159,
        longitude: 127.365864,
        latitudeDelta: 0.00522,
        longitudeDelta: 0.00221,
      },
    };
    this.onPressReport = this.onPressReport.bind(this);
    this.changeMarkerRegion = this.changeMarkerRegion.bind(this);
    this.animation = {
      mapPosY: new Animated.Value(Layout.window.height),
      itemPosY: new Animated.Value(0),
      opacity: new Animated.Value(0),
    };
  }

  componentWillMount() {
    this.screenTransition();
    this.props.toggleVisibility();
  }

  onPressReport() {
    this.props.onConfirm(this.state.markerRegion);
  }

  changeMarkerRegion(markerRegion) {
    this.setState({ markerRegion });
  }

  async locatePosition() {
    await Location.requestPermissionsAsync();
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    const { longitude, latitude } = location.coords;
    this.map.animateToCoordinate({ longitude, latitude }, 0);
  }

  screenTransition() {
    this.animation.itemPosY = new Animated.Value(this.props.oldPosition.py);

    Animated.parallel([
      Animated.timing(this.animation.itemPosY, {
        toValue: 0,
        duration: 800,
      }),
      Animated.timing(this.animation.mapPosY, {
        toValue: 0,
        duration: 800,
      }),
      Animated.timing(this.animation.opacity, {
        toValue: 1,
        duration: 1000,
      }),
    ]).start();
  }

  render() {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state.markerRegion;

    return (
      <View style={{ flex: 1 }}>
        <Animated.View
          style={{ marginHorizontal: 20, transform: [{ translateY: this.animation.itemPosY }] }}
        >
          <View ref="view">
            <ReportItem
              type={this.props.selectedIncident}
              title={incidentTypeMap[this.props.selectedIncident].title}
            />
          </View>
        </Animated.View>
        <Animated.Text style={[styles.subHeaderText, { opacity: this.animation.opacity }]}>
          {' '}
          위치 선택{' '}
        </Animated.Text>

        <Animated.View
          style={[styles.mapContainer, { transform: [{ translateY: this.animation.mapPosY }] }]}
        >
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
            <TouchableOpacity style={styles.confirmButton} onPress={this.onPressReport}>
              <Text style={styles.buttonText}>제보 등록</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.gpsButton} onPress={this.locatePosition}>
            <MaterialIcons style={{ color: 'white' }} name="gps-fixed" size={26} />
          </TouchableOpacity>
        </Animated.View>
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
    marginHorizontal: 20,
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
  mapContainer: {
    flex: 1,
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

const mapStateToProps = state => ({
  visibleOthers: state.newIncident.visibleOthers,
  oldPosition: state.newIncident.oldPosition,
});

export default connect(
  mapStateToProps,
  actions
)(Locator);
