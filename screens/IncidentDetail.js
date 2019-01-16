import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { MapView } from 'expo';

import Layout from '../constants/Layout';
import Colors from '../constants/Colors';

export default class IncidentDetail extends React.Component {
  render() {
    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: 'stretch' }}
      >
        <View>
          <MapView
            style={{ height: Layout.window.width }}
            initialRegion={{
              latitude: 36.374159,
              longitude: 127.365864,
              latitudeDelta: 0.00522,
              longitudeDelta: 0.00221,
            }}
          />
        </View>
        <View style={{ paddingVertical: 18, paddingHorizontal: 20 }}>
          <Text style={{ color: Colors.dateLightGrey }}>Jan 14, 2019</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 28,
                color: Colors.defaultBlack,
              }}
            >
              Conflagration
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 50,
                  backgroundColor: Colors.dangerRed,
                }}
              />
              <View style={{ width: 5 }} />
              <Text style={{ color: Colors.dangerRed }}>Emergency</Text>
            </View>
          </View>
          <Text style={{ color: Colors.defaultBlack }}>
            Yuseong 291, Daejeon
          </Text>
          <View style={{ height: 28 }} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderRadius: 39,
              paddingVertical: 13,
              paddingLeft: 27,
              paddingRight: 6,
              backgroundColor: '#44aa25',
            }}
          >
            <View>
              <Text
                style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}
              >
                가까운 안전한 장소로 이동하세요
              </Text>
              <Text style={{ color: 'white' }}>자세한 행동 강령 보기</Text>
            </View>
            <View
              style={{
                width: 46,
                height: 46,
                backgroundColor: '#339216',
                borderRadius: 46,
              }}
            />
          </View>
          <View style={{ height: 24 }} />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ fontSize: 16, color: Colors.defaultGrey }}>
              Progress
            </Text>
            <Text style={{ fontSize: 16, color: Colors.defaultGrey }}>
              더보기
            </Text>
          </View>
          <View style={{ height: 6 }} />
          <View
            style={{
              borderColor: '#84c571',
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 13,
            }}
          >
            <Text>화재 진압되었습니다. 유성구 소방서와 함께 사고 원인 조사중 입니다.</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
