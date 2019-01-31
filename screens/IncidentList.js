import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Notifications, Location } from 'expo';
import { createSelector } from 'reselect';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import IncidentCard from '../components/IncidentCard';
import { getBottomSpace } from '../utils';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

import {
  incidentsListLoadMore,
  incidentsListRefresh,
  incidentsListReset,
  incidentsListSelect,
} from '../actions/incidentsList';
import NaverMap from '../components/NaverMap';
import { KAISTN1Coords } from '../constants/Geo';
import memoize from 'fast-memoize';

// TODO : 리스트 로딩이 의외로 눈에 거슬림. 로딩을 줄일 수 있는 방법?
class IncidentList extends React.Component {
  state = { currentLocation: null };

  constructor() {
    super();

    this.data = ['Hello1', 'Hello2'];
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleEndReached = this.handleEndReached.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillMount() {
    this.notificationSubscription = Notifications.addListener(notification =>
      console.log('Notification arrived:', notification)
    );
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      this.handleRefresh
    );
    this.handleRefresh();
    Location.watchPositionAsync({}, this.handleLocationUpdate);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // It handles cases where
    // 1. List refreshes after map initialization (initialCoords cannot handle it)
    // 2. Selection changes as user swipe carousel
    const incident = this.props.incidents[this.props.indexSelected];
    const prevIncident = prevProps.incidents[prevProps.indexSelected];
    if (prevIncident !== incident && incident) {
      this._map.panTo(getCoordsFromIncident(incident), {});
    }
  }

  componentWillUnmount() {
    this.notificationSubscription.remove();
    this.willFocusSubscription.remove();
  }

  handleLocationUpdate = location => {
    this.setState({ currentLocation: location });
  };

  handleRefresh() {
    this.props.incidentsListRefresh();
  }

  handleEndReached() {
    this.props.incidentsListLoadMore();
  }

  handleSnapToItem = slideIndex => {
    this.props.incidentsListSelect(slideIndex);
  };

  // To prevent NaverMap from updating by reusing the old array
  getMarkers = memoize((selectedIncident, currentLocation) => {
    let markers = [];

    if (selectedIncident) {
      markers = markers.concat({
        key: 'selected',
        coords: getCoordsFromIncident(selectedIncident),
      });
    }

    if (currentLocation) {
      const { latitude, longitude } = currentLocation.coords;
      const myLocation = {
        key: 'myLocation',
        coords: { lat: latitude, lng: longitude },
        icon: Expo.Asset.fromModule(require('../assets/images/current_location_pin.png')).uri,
      };
      markers = markers.concat(myLocation);
    }

    return markers;
  });

  renderItem({ item: incident }) {
    return (
      <IncidentCard
        data={incident}
        onPress={() =>
          this.props.navigation.navigate('IncidentDetail', {
            incidentDetail: incident,
          })
        }
      />
    );
  }

  render() {
    const selectedIncident = this.props.selectedIncident;

    return (
      <View style={styles.container}>
        <NaverMap
          ref={el => {
            this._map = el;
          }}
          initialCoords={
            selectedIncident
              ? getCoordsFromIncident(selectedIncident)
              : KAISTN1Coords
          }
          style={{ flex: 1 }}
          markers={this.getMarkers(
            selectedIncident,
            this.state.currentLocation
          )}
        />
        <View style={styles.carouselContainer}>
          <Pagination
            dotsLength={this.props.incidents.length}
            activeDotIndex={this.props.indexSelected}
            containerStyle={{ marginBottom: -15 }}
            dotStyle={{ width: 20 }}
            inactiveDotStyle={{ width: 7 }}
            inactiveDotScale={1}
          />
          <Carousel
            ref={el => {
              this._carousel = el;
            }}
            data={this.props.incidents}
            renderItem={this.renderItem.bind(this)}
            onBeforeSnapToItem={this.handleSnapToItem}
            sliderWidth={Layout.window.width}
            itemWidth={Layout.window.width - 50}
            containerCustomStyle={{ height: 200 }}
            slideStyle={{ paddingLeft: 5, paddingRight: 5 }}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.reportButton}
            onPress={() => this.props.navigation.navigate('NewIncident')}
          >
            <Text style={styles.reportButtonText}>제보하기</Text>
          </TouchableOpacity>
        </View>

        {/*<SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always'}}></SafeAreaView>*/}
      </View>
    );
  }
}

const bottomUnsafeArea = getBottomSpace();

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
  carouselContainer: { position: 'absolute', bottom: bottomUnsafeArea + 80 },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: Layout.window.width,
  },
  reportButton: {
    backgroundColor: '#ff9412',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
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

const getCoordsFromIncident = incident => ({
  lat: incident.lat,
  lng: incident.lng,
});

const incidentsSelector = createSelector(
  state => state.incidentsList.byId,
  state => state.incidentsList.idList,
  (byId, idList) => idList.map(id => byId[id])
);

// const incidentMarkersSelector = createSelector(
//   incidentsSelector,
//   incidents =>
//     incidents.map(incident => ({
//       coords: { lat: incident.lat, lng: incident.lng },
//       key: `incident-${incident.id}`,
//     }))
// );

const selectedIncidentSelector = createSelector(
  incidentsSelector,
  state => state.incidentsList.indexSelected,
  (incidents, indexSelected) => {
    return incidents[indexSelected];
  }
);

export default connect(
  state => {
    const { loading, indexSelected } = state.incidentsList;
    const incidents = incidentsSelector(state);

    return {
      incidents,
      selectedIncident: selectedIncidentSelector(state),
      loading,
      indexSelected,
    };
  },
  {
    incidentsListLoadMore,
    incidentsListReset,
    incidentsListRefresh,
    incidentsListSelect,
  }
)(IncidentList);
