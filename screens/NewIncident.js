import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  LayoutAnimation,
  UIManager,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';
import ReportItem from '../components/ReportItem';
import AndroidTopMargin from '../components/AndroidTopMargin';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { MapView } from 'expo';

import * as actions from '../actions';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';

class NewIncident extends React.Component {
  componentWillMount() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentWillUnmount() {
    this.props.resetSelection();
  }

  /* TODO : 애니메이션 보강 처리 */

  renderItem = incident => {
    return (
      <ReportItem type={incident.item.type} onPress={this.onChangeScreen} />
    );
  };

  onChangeScreen = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    this.props.changeStage();
  };

  goBackScreen() {
    if (this.props.isFirstStage) {
      this.props.navigation.goBack();
      return;
    }

    this.onChangeScreen();
  }

  renderTypeSelector() {
    return (
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <Text style={styles.subHeaderText}>긴급제보</Text>
        <FlatList data={this.props.incidents} renderItem={this.renderItem} />
      </View>
    );
  }

  renderLocationSelector() {
    return (
      <View>
        <View style={{ marginHorizontal: 20 }}>
          <ReportItem type={this.props.selectedIncident} />
          <Text style={styles.subHeaderText}> 위치 선택 </Text>
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchText}> 한국과학기술원 N1 404 </Text>
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
        />
        <View style={styles.buttonContainer}>
          <View style={styles.gpsButton} />
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.buttonText}>제보 등록</Text>
          </TouchableOpacity>
        </View>
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
  const { incidentList, selectedIncident, isFirstStage } = state.newIncident;
  return {
    incidents: incidentList,
    selectedIncident,
    isFirstStage,
  };
};

export default connect(
  mapStateToProps,
  actions
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
