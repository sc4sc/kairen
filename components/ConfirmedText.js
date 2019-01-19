import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ConfirmedText = ({ children, fontWeight }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Ionicons
      name={'ios-checkmark-circle'}
      size={13}
      style={{ color: '#84c571' }}
    />
    <View style={{ width: 4 }} />
    <Text style={{ fontSize: 13, color: '#84c571', fontWeight: fontWeight }}>
      {children}
    </Text>
  </View>
);

export default ConfirmedText;
