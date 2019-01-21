import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { connect } from 'react-redux';

import ReportItem from '../components/ReportItem';
import AndroidTopMargin from '../components/AndroidTopMargin';
import { SafeAreaView } from 'react-navigation';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Icon, TouchableOpacity } from '@shoutem/ui';
import { getStatusBarHeight } from '../utils';
import { MapView } from 'expo';

import * as actions from '../actions';

class NewIncident extends React.Component {
  componentWillMount() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  /* TODO : 애니메이션 보강 및 뒤로가기 버튼 눌렀을 때의 처리 */

  renderItem(incident) {
    return (
      <ReportItem
        type={incident.item.type}
        showButton
        showNext
        onPress={this.changeWithAnimation}
      />
    );
  }

  goBackScreen() {
    if (this.props.isFirstStage) {
      return () => {
        this.props.resetSelection();
        this.props.navigation.goBack();
      };
    }
    return this.changeWithAnimation;
  }

  changeWithAnimation = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    this.props.changeStage();
  };

  renderComponent() {
    if (this.props.isFirstStage) {
      return (
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.subHeaderText}>긴급제보</Text>
          <FlatList
            data={this.props.incidents}
            renderItem={this.renderItem.bind(this)}
          />
        </View>
      );
    }

    return (
      <View>
        <View style={{ marginHorizontal: 20 }}>
          <ReportItem type={this.props.selectedIncident} />
        </View>

        <View style={{ marginLeft: 20 }}>
          <Text style={styles.subHeaderText}> 위치 선택 </Text>
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchText}> 한국과학기술원 N1 404 </Text>
          <Icon name="search" />
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
      </View>
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
      <SafeAreaView style={{ flex: 1 }}>
        {/* White background for safe area */}
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <AndroidTopMargin />
          <View style={container}>
            <View style={headerContainer}>
              <Icon name="close" onPress={this.goBackScreen()} />
              <Text style={headerText} onPress={this.goBackScreen()}>
                취소
              </Text>
            </View>

            <View style={barContainer}>
              <View
                style={[
                  stageBar,
                  { backgroundColor: isFirstStage ? 'white' : '#868686' },
                ]}
              />
              <View style={{ width: 5 }} />
              <View
                style={[
                  stageBar,
                  { backgroundColor: isFirstStage ? '#868686' : 'white' },
                ]}
              />
            </View>
            {this.renderComponent()}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    incidents: state.newIncident.incidentList,
    selectedIncident: state.newIncident.selectedIncident,
    isFirstStage: state.newIncident.isFirstStage,
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
    marginBottom: 34,
    paddingVertical: 18,
    borderRadius: 8,
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.22,
    shadowRadius: 2,
    elevation: 5,
  },
});
