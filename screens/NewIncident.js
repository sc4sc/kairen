import React from 'react';
import {
  Alert,
  FlatList,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import ReportItem from '../components/ReportItem';
import AndroidTopMargin from '../components/AndroidTopMargin';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { MapView } from 'expo';
import * as actions from '../actions/newIncident';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  typeMap as incidentTypeMap,
  types as incidentTypes,
} from '../constants/Incidents';
import { incidentsListRefresh } from '../actions/incidentsList';

const { Marker } = MapView;

class NewIncident extends React.Component {
  state = {
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    },
  };

  componentWillMount() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentWillUnmount() {
    this.props.resetSelection();
  }

  /* TODO : 애니메이션 보강 처리 */

  renderItem = ({ item: incident }) => {
    return (
      <ReportItem
        type={incident.type}
        title={incident.title}
        onPressNext={this.handleChangeScreen}
      />
    );
  };

  handleChangeScreen = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    this.props.changeStage();
  };

  goBackScreen() {
    if (this.props.isFirstStage) {
      this.props.navigation.goBack();
      return;
    }

    this.handleChangeScreen();
  }

  handlePressReport = () => {
    Alert.alert(
      '제보하시겠습니까?',
      '자세한 현장 상황 확인을 위해 카이스트 안전팀이 곧 연락합니다',
      [{ text: '취소' }, { text: '확인', onPress: this.report }]
    );
  };

  report = () => {
    const { latitude, longitude } = this.state.region;
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
  };

  renderTypeSelector() {
    return (
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <Text style={styles.subHeaderText}>긴급제보</Text>
        <FlatList data={incidentTypes} renderItem={this.renderItem} />
      </View>
    );
  }

  renderLocationSelector() {
    const {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    } = this.state.region;
    return (
      <View>
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
          style={styles.map}
          initialRegion={{
            latitude: 36.374159,
            longitude: 127.365864,
            latitudeDelta: 0.00522,
            longitudeDelta: 0.00221,
          }}
          onRegionChange={region => this.setState({ region })}
        >
          <Marker coordinate={this.state.region} />
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
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={this.handlePressReport}
          >
            <Text style={styles.buttonText}>제보 등록</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gpsButton} />
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
          <Text>lng-d {longitudeDelta}</Text>
          <Text>lng-d {longitudeDelta}</Text>
        </View>
        {/*<View style={styles.buttonContainer}>*/}
        {/*<View style={styles.gpsButton} />*/}
        {/*<TouchableOpacity style={styles.confirmButton}>*/}
        {/*<Text style={styles.buttonText}>제보 등록</Text>*/}
        {/*</TouchableOpacity>*/}
        {/*</View>*/}
      </View>
    );
  }

  renderStageIndicator(on) {
    return (
      <View
        style={[styles.stageBar, { backgroundColor: on ? 'white' : '#868686' }]}
      />
    );
  }

  render() {
    const { isFirstStage } = this.props;
    const {
      container,
      headerContainer,
      headerText,
      barContainer,
      stageBar,
    } = styles;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <AndroidTopMargin />
        <View style={container}>
          <View style={headerContainer}>
            <Ionicons
              name="ios-close"
              size={26}
              style={{ color: 'white' }}
              onPress={() => this.goBackScreen()}
            />
            <View style={{ width: 5 }} />
            <Text style={headerText} onPress={() => this.goBackScreen()}>
              취소
            </Text>
          </View>

          <View style={barContainer}>
            {this.renderStageIndicator(isFirstStage)}
            <View style={{ width: 5 }} />
            {this.renderStageIndicator(!isFirstStage)}
          </View>
          {isFirstStage
            ? this.renderTypeSelector()
            : this.renderLocationSelector()}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  const { selectedIncident, isFirstStage } = state.newIncident;
  return {
    selectedIncident,
    isFirstStage,
  };
};

export default connect(
  mapStateToProps,
  { ...actions, incidentsListRefresh }
)(NewIncident);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.buttonGrey,
  },
  headerContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'center',
  },
  headerText: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  subHeaderText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  stageBar: { width: 30, height: 3, borderRadius: 25.5 },
  map: { height: Layout.window.height },
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
    marginBottom: 150,
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
