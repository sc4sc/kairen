import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Notifications } from 'expo';
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

// TODO : 리스트 로딩이 의외로 눈에 거슬림. 로딩을 줄일 수 있는 방법?
class IncidentList extends React.Component {
  constructor() {
    super();

    this.data = ['Hello1', 'Hello2'];
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleEndReached = this.handleEndReached.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.state = {
      selectedIncident: 0,
    };
  }

  componentWillMount() {
    this.notificationSubscription = Notifications.addListener(notification =>
      console.log('Notification arrived:', notification)
    );
    this.willFocusSubscription = this.props.navigation.addListener('willFocus', this.handleRefresh);
    this.handleRefresh();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // It handles cases where
    // 1. List refreshes after map initialization (initialCoords cannot handle it)
    // 2. Selection changes as user swipe carousel
    if (prevProps.indexSelected !== this.props.indexSelected) {
      const incident = this.props.incidents[this.props.indexSelected];
      if (incident) {
        this._map.panTo(getCoordsFromIncident(incident), {});
      }
    }
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

  handleSnapToItem = slideIndex => {
    this.props.incidentsListSelect(slideIndex);
  };

  handleSnapToItem = slideIndex => {
    this.props.incidentsListSelect(slideIndex);
    const incident = this.props.incidents[slideIndex];
    this._map.panTo(getCoordsFromIncident(incident), {});
    this.setState({
      selectedIncident: slideIndex,
    });
  };

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
    const selectedIncident = this.props.incidents[this.props.indexSelected];

    return (
      <View style={styles.container}>
        <NaverMap
          ref={el => {
            this._map = el;
          }}
          initialCoords={
            selectedIncident
              ? getCoordsFromIncident(selectedIncident)
              : { lat: 36.37334626411133, lng: 127.36397930294454 }
          }
          style={{ flex: 1 }}
          markers={this.props.markers}
        />
        <View style={styles.carouselContainer}>
          <Pagination
            dotsLength={this.props.incidents.length}
            activeDotIndex={this.state.selectedIncident}
            containerStyle={{ marginBottom: -15 }}
            dotStyle={{ width: 20 }}
            inactiveDotStyle={{ width: 7 }}
            inactiveDotScale={1}
          />
          <Carousel
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

export default connect(
  state => {
    const { loading, indexSelected } = state.incidentsList;
    const incidents = incidentsSelector(state);

    return {
      incidents,
      markers: incidentMarkersSelector(state),
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
