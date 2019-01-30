import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { Notifications } from 'expo';
import Carousel from 'react-native-snap-carousel';

import IncidentCard from '../components/IncidentCard';
import { getBottomSpace } from '../utils';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import AndroidTopMargin from '../components/AndroidTopMargin';

import {
  incidentsListLoadMore,
  incidentsListRefresh,
  incidentsListReset,
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
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always'}}>
          {/* ---- Map을 담은 WebView로 바꾸기 ---- */}
          <NaverMap style={{ flex: 1 }}>

          </NaverMap>
          <View style={styles.carouselContainer}>
            <Carousel
                data={this.props.incidents}
                renderItem={this.renderItem.bind(this)}
                sliderWidth={Layout.window.width}
                itemWidth={Layout.window.width - 60}
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
        </SafeAreaView>
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
    alignItems: 'center',
    padding: 16,
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

export default connect(
  state => {
    const { byId, idList, loading } = state.incidentsList;
    return {
      incidents: idList.map(id => byId[id]),
      loading,
    };
  },
  {
    incidentsListLoadMore,
    incidentsListReset,
    incidentsListRefresh,
  }
)(IncidentList);
