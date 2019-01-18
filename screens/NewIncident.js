import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Colors from '../constants/Colors';

export default class NewIncident extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
          {/* White background for safe area */}
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <TouchableOpacity
            style={{
              flex: 1,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              backgroundColor: Colors.defaultGrey,
            }}
          >
            <Text>헬로 헬로</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
