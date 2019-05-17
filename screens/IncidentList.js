import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import { connect } from 'react-redux';
import { Notifications, Location } from 'expo';
import { createSelector } from 'reselect';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import memoize from 'fast-memoize';

import NewIncident from '../screens/NewIncident'
import NewIncidentDetail from '../screens/NewIncidentDetail'
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
// import { Ionicons } from '@expo/vector-icons';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const bottomHeight = getBottomSpace()
// TODO : 리스트 로딩이 의외로 눈에 거슬림. 로딩을 줄일 수 있는 방법?
class IncidentList extends React.Component {
  constructor() {
    super();

    this.state = {
      currentLocation: null,
      isExpanded: false,
      buttonWidth: new Animated.Value(SCREEN_WIDTH - 20),
      buttonRightMargin: new Animated.Value(10),
      page: 1,
      touchedOpen: false,
      touchedClose: false,
    };
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

    this.animation = new Animated.ValueXY({x: 0, y: SCREEN_HEIGHT - (65 + bottomHeight)})
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder:(evt, gestureState) => {
        return !(gestureState.dx === 0 && gestureState.dy === 0)
      },
      onPanResponderGrant:(evt, gestureState) => {
        this.animation.extractOffset()
      },
      onPanResponderMove: (evt, gestureState) => {
        this.animation.setValue({x: 0, y: gestureState.dy})
      },
      onPanResponderRelease: (evt, gestureState) => {
        if ((gestureState.dy < 0) && !this.state.isExpanded) {
          Animated.spring(this.animation.y, {
            toValue: bottomHeight == 0 ? -SCREEN_HEIGHT + 100 : -SCREEN_HEIGHT+150,
            duration: 50,
            tension: 50,
            friction: 10,
          }).start()
          Animated.timing(this.state.buttonWidth, {
            toValue: SCREEN_WIDTH,
            duration: 200,
          }).start();
          Animated.timing(this.state.buttonRightMargin, {
            toValue: 0,
            duration: 200,
          }).start();
          this.setState({isExpanded: true })
        } else if ((gestureState.dy < 0) && this.state.isExpanded) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            duration: 50,
            tension: 50,
            friction: 10,
          }).start()
        } else if ((gestureState.dy > 0) && this.state.isExpanded) {
          Animated.spring(this.animation.y, {
            toValue: bottomHeight == 0 ? SCREEN_HEIGHT - 100 : SCREEN_HEIGHT - 150,
            duration: 50,
            tension: 50,
            friction: 8,
          }).start()
          Animated.timing(this.state.buttonWidth, {
            toValue: SCREEN_WIDTH-20,
            duration: 200,
          }).start();
          Animated.timing(this.state.buttonRightMargin, {
            toValue: 10,
            duration: 200,
          }).start();
          this.setState({isExpanded: false, page: 1})
        } else if ((gestureState.dy > 0) && !this.state.isExpanded) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            duration: 50,
            tension: 50,
            friction: 8,
          }).start()
        }
      }
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const refreshing =
      prevProps.incidents.length === 0 &&
      prevProps.incidents !== this.props.incidents;
    if (refreshing) {
      this.props.incidentsListSelect(0);
    }

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
    this.willFocusSubscription.remove()
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
        icon: Expo.Asset.fromModule(
          require('../assets/images/current_location_pin.png')
        ).uri,
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

  renderCarousel() {
    if (this.props.incidents.length === 0) {
      return (
        <View style={styles.emptyIncidentBox} pointerEvents={'none'}>
          <Text style={{ fontSize: 13, color: '#4a4a4a' }}>
            사고 목록이 비어있습니다.
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.carouselContainer}>
        <Pagination
          dotsLength={this.props.incidents.length}
          activeDotIndex={this.props.indexSelected}
          containerStyle={{
            paddingVertical: 0,
            paddingHorizontal: 0,
            marginBottom: 15,
          }}
          dotStyle={{ width: 20 }}
          inactiveDotStyle={{ width: 7 }}
          inactiveDotScale={1}
          carouselRef={this._carousel}
          tappableDots
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
          containerCustomStyle={{ height: 200, overflow: 'visible' }}
          slideStyle={{ paddingLeft: 5, paddingRight: 5 }}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
        />
      </View>
    );
  }

  nextPage = () => {
    this.setState({
      page: 2,
    })
  }

  shrinkButton = async () => {
    if (this.state.isExpanded) {
      Animated.spring(this.animation.y, {
        toValue: (bottomHeight == 0) ? (this.state.touchedOpen ? 150 : -50) : (this.state.touchedOpen ?  200 : 0),
        duration: 50,
        tension: 50,
        friction: 8,
      }).start()
      Animated.timing(this.state.buttonWidth, {
        toValue: SCREEN_WIDTH-20,
        duration: 200,
      }).start();
      Animated.timing(this.state.buttonRightMargin, {
        toValue: 10,
        duration: 200,
      }).start();
      await this.setState({isExpanded: false, page: 1, touchedOpen: false, touchedClose: true})

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
  }

  render() {
    const { headerText } = styles;
    const selectedIncident = this.props.selectedIncident;

    const animatedHeight = {
      transform: this.animation.getTranslateTransform()
    }

    return (
      <Animated.View style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
        {/* <StatusBar /> */}
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
        {this.renderCarousel()}
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => this.props.navigation.openDrawer()}
        >
          <Image source={require('../assets/images/menu.png')} />
        </TouchableOpacity>
        <Animated.View
          style={[animatedHeight,
            {
              position: 'absolute',
              left: 0,
              right: 0,
              elevation: 10,
              shadowOffset: {width: 0, height: -5},
              shadowColor: '#aaa',
              shadowOpacity: 1,
              shadowRadius: 10,
              backgroundColor: '#ff9412',
              height: SCREEN_HEIGHT-50,
              width: this.state.buttonWidth.interpolate({
                inputRange: [SCREEN_WIDTH - 20, SCREEN_WIDTH],
                outputRange: [SCREEN_WIDTH - 20, SCREEN_WIDTH],
              }),
              marginLeft: this.state.buttonRightMargin.interpolate({
                inputRange: [0, 10],
                outputRange: [0, 10]
              }),
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderWidth: 1.5,
              borderColor: "#dd7507",
            },
          ]}
        >
            <Animated.View
              {... this.panResponder.panHandlers}
              style={{
                height: 70 + bottomHeight,
                // height: 70,
                width: SCREEN_WIDTH,
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingTop: 20,
              }}
            >
              <Text style={headerText}>
                제보 종류 선택
              </Text>
            </Animated.View>
          {
            this.state.page == 1
            ? (
              <NewIncident nextPage={this.nextPage}/>
            ) : (
              <NewIncidentDetail shrinkButton={this.shrinkButton}/>
            )
          }
        </Animated.View>
      </Animated.View>
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
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20,
  },
  menuIcon: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
    elevation: 5,
    borderRadius: 5,
  },
  carouselContainer: { position: 'absolute', bottom: bottomUnsafeArea + 80 },
  emptyIncidentBox: {
    position: 'absolute',
    bottom: bottomUnsafeArea + 100,
    height: 118,
    width: Layout.window.width - 112,
    marginHorizontal: 56,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.09)',
    justifyContent: 'center',
    alignItems: 'center',
  },
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

const selectedIncidentSelector = createSelector(
  incidentsSelector,
  state => state.incidentsList.indexSelected,
  (incidents, indexSelected) => incidents[indexSelected]
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
