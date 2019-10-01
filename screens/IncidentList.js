import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native'
import { connect } from 'react-redux'
import { Notifications } from 'expo'
import * as Location from 'expo-location'
import { createSelector } from 'reselect'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import memoize from 'fast-memoize'
import IncidentCard from '../components/IncidentCard'
import { getBottomSpace } from '../utils'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import {
  incidentsListLoadMore,
  incidentsListRefresh,
  incidentsListReset,
  incidentsListSelect,
} from '../actions/incidentsList'
import NaverMap from '../components/NaverMap'
import { KAISTN1Coords } from '../constants/Geo'
import i18n from '../i18n'
import { sampleIncident } from '../constants/SampleIncidents'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const bottomHeight = getBottomSpace()
// TODO: 리스트 로딩이 의외로 눈에 거슬림. 로딩을 줄일 수 있는 방법?
class IncidentList extends React.Component {
  constructor() {
    super()

    this.state = {
      currentLocation: null,
      isExpanded: false,
      buttonWidth: new Animated.Value(SCREEN_WIDTH - 20),
      buttonRightMargin: new Animated.Value(10),
      page: 1,
      touchedOpen: false,
      touchedClose: false,
    }
    this.handleRefresh = this.handleRefresh.bind(this)
    this.handleEndReached = this.handleEndReached.bind(this)
    this.renderItem = this.renderItem.bind(this)
  }

  componentWillMount() {
    this.notificationSubscription = Notifications.addListener(notification =>
      console.log('Notification arrived:', notification)
    )
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      this.handleRefresh
    )
    this.handleRefresh()
    Location.watchPositionAsync({}, this.handleLocationUpdate)

    this.animation = new Animated.ValueXY({
      x: 0,
      y: SCREEN_HEIGHT - (65 + bottomHeight),
    })
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return !(gestureState.dx === 0 && gestureState.dy === 0)
      },
      onPanResponderGrant: (evt, gestureState) => {
        this.animation.extractOffset()
      },
      onPanResponderMove: (evt, gestureState) => {
        this.animation.setValue({ x: 0, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < 0 && !this.state.isExpanded) {
          Animated.spring(this.animation.y, {
            toValue:
              bottomHeight == 0 ? -SCREEN_HEIGHT + 100 : -SCREEN_HEIGHT + 150,
            duration: 50,
            tension: 50,
            friction: 10,
          }).start()
          Animated.timing(this.state.buttonWidth, {
            toValue: SCREEN_WIDTH,
            duration: 200,
          }).start()
          Animated.timing(this.state.buttonRightMargin, {
            toValue: 0,
            duration: 200,
          }).start()
          this.setState({ isExpanded: true })
        } else if (gestureState.dy < 0 && this.state.isExpanded) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            duration: 50,
            tension: 50,
            friction: 10,
          }).start()
        } else if (gestureState.dy > 0 && this.state.isExpanded) {
          Animated.spring(this.animation.y, {
            toValue:
              bottomHeight == 0 ? SCREEN_HEIGHT - 100 : SCREEN_HEIGHT - 150,
            duration: 50,
            tension: 50,
            friction: 8,
          }).start()
          Animated.timing(this.state.buttonWidth, {
            toValue: SCREEN_WIDTH - 20,
            duration: 200,
          }).start()
          Animated.timing(this.state.buttonRightMargin, {
            toValue: 10,
            duration: 200,
          }).start()
          this.setState({ isExpanded: false, page: 1 })
        } else if (gestureState.dy > 0 && !this.state.isExpanded) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            duration: 50,
            tension: 50,
            friction: 8,
          }).start()
        }
      },
    })
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    const refreshing =
      prevProps.incidents.length === 0 &&
      prevProps.incidents !== this.props.incidents
    if (refreshing) {
      this.props.incidentsListSelect(0)
    }

    // It handles cases where
    // 1. List refreshes after map initialization (initialCoords cannot handle it)
    // 2. Selection changes as user swipe carousel
    const incident = this.props.incidents[this.props.indexSelected]
    const prevIncident = prevProps.incidents[prevProps.indexSelected]
    if (prevIncident !== incident && incident) {
      this._map.panTo(getCoordsFromIncident(incident), {})
    }
  }

  componentWillUnmount() {
    this.notificationSubscription.remove()
    this.willFocusSubscription.remove()
  }

  handleLocationUpdate = location => {
    this.setState({ currentLocation: location })
  }

  handleRefresh() {
    this.props.incidentsListRefresh()
  }

  handleEndReached() {
    this.props.incidentsListLoadMore()
  }

  handleSnapToItem = slideIndex => {
    this.props.incidentsListSelect(slideIndex)
  }

  // To prevent NaverMap from updating by reusing the old array
  getMarkers = memoize((selectedIncident, currentLocation) => {
    let markers = []

    if (selectedIncident) {
      markers = markers.concat({
        key: 'selected',
        coords: getCoordsFromIncident(selectedIncident),
      })
    }

    if (currentLocation) {
      const { latitude, longitude } = currentLocation.coords
      const myLocation = {
        key: 'myLocation',
        coords: { lat: latitude, lng: longitude },
        icon: Expo.Asset.fromModule(
          require('../assets/images/current_location_pin.png')
        ).uri,
      }
      markers = markers.concat(myLocation)
    }

    return markers
  })

  renderItem({ item: incident }) {
    return (
      <IncidentCard
        data={incident}
        onPress={() => {
          if (incident.id === 0) {
            this.props.navigation.navigate('IncidentDetailSample')
          } else {
            this.props.navigation.navigate('IncidentDetail', {
              incidentDetail: incident,
            })
          }
        }}
      />
    )
  }

  renderCarousel() {
    const SampleIncident = sampleIncident
    const incidentsWithSample = this.props.incidents.length == 0 ? SampleIncident : this.props.incidents.concat(SampleIncident)

    return (
      <View style={styles.carouselContainer}>
        <Pagination
          dotsLength={incidentsWithSample.length}
          activeDotIndex={this.props.indexSelected}
          containerStyle={{
            paddingVertical: 0,
            paddingHorizontal: 0,
            marginBottom: 15,
          }}
          dotStyle={{ width: 15 }}
          inactiveDotStyle={{ width: 8 }}
          inactiveDotScale={0.7}
        />
        <Carousel
          keyExtractor={(item, index) => `${item.id}`}
          data={incidentsWithSample}
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
    )
  }

  nextPage = () => {
    this.setState({
      page: 2,
    })
  }

  render() {
    const selectedIncident = this.props.selectedIncident
    const animatedHeight = {
      transform: this.animation.getTranslateTransform(),
    }

    return (
      <View style={styles.container}>
        <NaverMap
          ref={el => {
            this._map = el
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
        {this.props.isTraining ? (
          <>
            <StatusBar
              backgroundColor={'#d43434'}
              translucent={true}
              barStyle={'light-content'}
            />

            <SafeAreaView style={styles.trainingModeContainer}>
              <Text style={{ paddingVertical: 10, color: 'white' }}>
                훈련 모드
              </Text>
            </SafeAreaView>
          </>
        ) : (
          <StatusBar
            backgroundColor={'transparent'}
            translucent={true}
            barStyle={'dark-content'}
          />
        )}
        {this.renderCarousel()}
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => this.props.navigation.openDrawer()}>
          <Image source={require('../assets/images/menu.png')} />
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.reportButton}
            onPress={() => this.props.navigation.navigate('NewIncident')}>
            <Text style={styles.reportButtonText}>{i18n.t('report')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const bottomUnsafeArea = getBottomSpace()

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  trainingModeContainer: {
    position: 'absolute',
    top: StatusBar.currentHeight,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#d43434',
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
    top: 60,
    left: 20,
    padding: 10,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
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
})

const getCoordsFromIncident = incident => ({
  lat: incident.lat,
  lng: incident.lng,
})

const incidentsSelector = createSelector(
  state => state.incidentsList.byId,
  state => state.incidentsList.idList,
  state => state.user.data.isTraining,
  (byId, idList, isTraining) =>
    idList
      .map(id => byId[id])
      .filter(incident => incident.isTraining === isTraining)
)

const selectedIncidentSelector = createSelector(
  incidentsSelector,
  state => state.incidentsList.indexSelected,
  (incidents, indexSelected) => incidents[indexSelected]
)

export default connect(
  state => {
    const { loading, indexSelected } = state.incidentsList
    const incidents = incidentsSelector(state)
    const { isTraining } = state.user.data

    const incidentsToShow = incidents.filter(incident => {
      if (isTraining) {
        return incident.isTraining
      } else {
        return !incident.isTraining
      }
    })

    return {
      incidents: incidents,
      selectedIncident: selectedIncidentSelector(state),
      loading,
      indexSelected,
      isTraining,
    }
  },
  {
    incidentsListLoadMore,
    incidentsListReset,
    incidentsListRefresh,
    incidentsListSelect,
  }
)(IncidentList)
