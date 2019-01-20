import React from 'react';
import { View, Platform, StyleSheet, Text } from 'react-native';
import ReportItem from '../components/ReportItem';
import AndroidTopMargin from '../components/AndroidTopMargin';
import { SafeAreaView } from 'react-navigation';

import Colors from '../constants/Colors';
import { Icon, TouchableOpacity } from '@shoutem/ui';
import { getStatusBarHeight } from '../utils';

export class NewIncident extends React.Component {
  state = { isFirstStage: true, selected: null };

  selectItem(item) {
    this.setState({ selected: item });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* White background for safe area */}
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <AndroidTopMargin />
          <View
            style={{
              flex: 1,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              backgroundColor: Colors.buttonGrey,
            }}
          >
            <View style={styles.headerContainer}>
              <Icon
                name="close"
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              />
              <Text
                style={styles.headerText}
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              >
                {' '}
                취소{' '}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <View style={[styles.stageBar, { backgroundColor: 'white' }]} />
              <View style={{ width: 5 }} />
              <View style={[styles.stageBar, { backgroundColor: '#868686' }]} />
            </View>

            <View style={{ paddingHorizontal: 20 }}>
              <Text style={styles.subHeaderText}>긴급제보</Text>
              <TouchableOpacity
                onPress={() => {
                  this.selectItem('가스유출');
                }}
              >
                <ReportItem
                  type="가스유출"
                  selectedType={this.state.selected}
                  onPress={() => {
                    this.props.navigation.navigate('NewIncidentDetail', {
                      type: this.state.selected,
                    });
                  }}
                  isFirstStage
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.selectItem('화재');
                }}
              >
                <ReportItem
                  type="화재"
                  selectedType={this.state.selected}
                  onPress={() => {
                    this.props.navigation.navigate('NewIncidentDetail', {
                      type: this.state.selected,
                    });
                  }}
                  isFirstStage
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.selectItem('독극물');
                }}
              >
                <ReportItem
                  type="독극물"
                  selectedType={this.state.selected}
                  onPress={() => {
                    this.props.navigation.navigate('NewIncidentDetail', {
                      type: this.state.selected,
                    });
                  }}
                  isFirstStage
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.selectItem('폭발');
                }}
              >
                <ReportItem
                  type="폭발"
                  selectedType={this.state.selected}
                  onPress={() => {
                    this.props.navigation.navigate('NewIncidentDetail', {
                      type: this.state.selected,
                    });
                  }}
                  isFirstStage
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  notchMargin: {
    height: Platform.select({ android: getStatusBarHeight(), ios: 0 }),
  },
  headerContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'center',
  },
  headerText: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  subHeaderText: { fontSize: 16, color: 'white', marginBottom: 10 },
  stageBar: { width: 30, height: 3, borderRadius: 25.5 },
});
