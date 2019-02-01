import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ConfirmedText from './ConfirmedText';

import Colors from '../constants/Colors';

export default class ProgressCard extends React.Component {
  renderEmptyBox() {
    if (this.props.isComment) {
      return <View style={{ height: 50 }} />;
    }

    return <View />;
  }

  /*
    propStyle로 상위 컴포넌트에서 Box의 세부적인 스타일 지정할 수 있도록 변경.
    ProgressCard를 쓰는 곳은 전부 수정 필요. ex) ProgressList , IncidentDetail..
 */
  render() {
    const { author, date, children, propStyle } = this.props;

    return (
      <View
        style={[
          styles.borderedContentBox,
          { marginTop: this.props.isComment ? -55 : 0 },
          propStyle,
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
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 13,
    backgroundColor: '#eaf8e5',
  },
});
