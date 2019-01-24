import React from 'react';
import {
  Alert,
  FlatList,
  LayoutAnimation,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import ReportItem from '../../components/ReportItem';
import AndroidTopMargin from '../../components/AndroidTopMargin';

import Colors from '../../constants/Colors';
import * as actions from '../../actions/newIncident';
import { types as incidentTypes } from '../../constants/Incidents';
import { incidentsListRefresh } from '../../actions/incidentsList';
import Locator from './Locator';


class NewIncident extends React.Component {
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
      <SafeAreaView style={{ flex: 1 }}>
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
          {isFirstStage ? (
            this.renderTypeSelector()
          ) : (
            <Locator
              selectedIncident={this.props.selectedIncident}
              onConfirm={this.handlePressReport}
            />
          )}
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
});
