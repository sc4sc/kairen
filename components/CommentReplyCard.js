import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ConfirmedText from './ConfirmedText';

import Colors from '../constants/Colors';

export class CommentReplyCard extends React.Component {
  render() {
    return (
      <View style={[styles.borderedContentBox, { marginTop: -55 }]}>
        <View style={{ height: 50 }} />
        <View style={{ flex: 1, backgroundColor: 'white' }} />
        <View style={{ flexDirction: 'row', height: 42 }}>
          <Text> 취소> </Text>
          <Text> 등록 </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subheaderContainer: { marginBottom: 6 },
  subheaderText: { fontSize: 16, color: Colors.defaultGrey },
  dateText: { fontSize: 11, color: Colors.dateLightGrey, alignSelf: 'center' },
  borderedContentBox: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 13,
    paddingBottom: 10,
    minHeight: 100,
    marginBottom: 10,
    backgroundColor: '#eaf8e5',
  },
});

export default ProgressCard;
