import React from 'react';
import { View, Platform, StyleSheet, Text } from 'react-native';
import ReportItem from '../components/ReportItem';

import { SafeAreaView } from 'react-navigation';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Icon, TouchableOpacity } from '@shoutem/ui';
import { MapView } from 'expo';

export class NewIncidentDetail extends React.Component {
  state = { isFirstStage: false, selected: null };

  selectItem(item) {
    this.setState({ selected: item });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* White background for safe area */}
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={styles.notchMargin} />
          <SafeAreaView
            style={{
              flex: 1,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              backgroundColor: Colors.defaultGrey,
            }}
          >
            <View
              style={styles.headerContainer}
              onPress={() => {
                this.props.navigation.pop();
              }}
            >
              <Icon name="close" />
              <Text
                style={styles.headerText}
                onPress={() => {
                  this.props.navigation.navigate('IncidentList');
                }}
              >
                취소
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 20,
              }}
            >
              <View style={[styles.stageBar, { backgroundColor: '#868686' }]} />
              <View style={{ width: 5 }} />
              <View style={[styles.stageBar, { backgroundColor: 'white' }]} />
            </View>

            <View style={{ marginHorizontal: 20 }}>
              <ReportItem
                type="가스유출"
                selectedType={this.state.selected}
                isFirstStage={false}
              />
            </View>

            <Text style={styles.subHeaderText}> 위치 선택 </Text>

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
          </SafeAreaView>
          <View style={styles.gpsButton} />
          <Text style={styles.confirmButton}> 제보 등록 </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  notchMargin: { height: Platform.select({ android: 23.5, ios: 0 }) },
  headerContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'center',
  },
  headerText: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  subHeaderText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 6,
    marginTop: 6,
    marginLeft: 20,
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
    backgroundColor: '#727272',
    marginBottom: 21,
    marginRight: 13,
    alignSelf: 'flex-end',
  },
  confirmButton: {
    backgroundColor: Colors.defaultGrey,
    marginHorizontal: 8,
    marginBottom: 34,
    paddingVertical: 18,
    borderRadius: 8,
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});
