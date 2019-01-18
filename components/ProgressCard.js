import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ConfirmedText from './ConfirmedText';

import Colors from '../constants/Colors';

const ProgressCard = ({ author, date, children }) => {
  return (
    <View
      style={[
        styles.borderedContentBox,
        { borderColor: '#84c571' }
      ]}
    >
      <View style={{ flexDirection: 'row' }}>
        <ConfirmedText>{author}</ConfirmedText>
        <View style={{ width: 5 }} />
        <Text style={styles.dateText}> {date} </Text>
      </View>

      <View style={{ marginTop: 5 }}>
        <Text style={{ color: Colors.defaultBlack }}> {children} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subheaderContainer: { marginBottom: 6 },
  subheaderText: { fontSize: 16, color: Colors.defaultGrey },
  dateText: { fontSize: 11, color: Colors.dateLightGrey, alignSelf:'center' },
  borderedContentBox: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 13,
    paddingBottom: 10,
    minHeight: 100,
    marginBottom: 10
  }
});

export default ProgressCard;