import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ConfirmedText from './ConfirmedText';

import Colors from '../constants/Colors';

export class ProgressCard extends React.Component {
  renderEmptyBox() {
    if (this.props.isComment) {
      return <View style={{ height: 50 }} />;
    }

    return <View />;
  }

  render() {
    const { author, date, children } = this.props;

    return (
      <View
        style={[
          styles.borderedContentBox,
          { marginTop: this.props.isComment ? -55 : 0 },
        ]}
      >
        {this.renderEmptyBox()}
        <View style={{ flexDirection: 'row' }}>
          <ConfirmedText fontWeight="bold">{author}</ConfirmedText>
          <View style={{ width: 5 }} />
          <Text style={styles.dateText}> {date} </Text>
        </View>

        <View style={{ marginTop: 5 }}>
          <Text style={{ color: '#4a4a4a', fontSize: 13 }}>{children}</Text>
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
