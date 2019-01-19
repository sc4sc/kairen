import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from '../utils';

export default props => (
  <View {...props} style={[styles.notchMargin, props.style]}>
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  notchMargin: {
    paddingTop: Platform.select({ android: getStatusBarHeight(), ios: 0 }),
  },
});
