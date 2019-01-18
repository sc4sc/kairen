import React from 'react';
import { View, Text } from 'react-native';

import { Icon } from '@shoutem/ui';

export default class ReportItem extends React.Component {
  renderIcon() {
    const { type, selectedType, isFirstStage } = this.props;

    return type == selectedType && isFirstStage ? (
      <Icon name="checkbox-on" style={{ flex: 1 }} />
    ) : (
      <View style={{ flex: 1 }} />
    );
  }

  renderNextButton() {
    const { type, selectedType, onPress, isFirstStage } = this.props;

    return type == selectedType && isFirstStage ? (
      <Text style={[styles.itemContent, { flex: 1 }]} onPress={onPress}>
        다음
      </Text>
    ) : (
      <View style={{ flex: 1 }} />
    );
  }

  render() {
    const { type, selectedType } = this.props;
    return (
      <View
        style={[
          styles.itemContainer,
          { backgroundColor: type == selectedType ? '#d5d5d5' : '#5f5f5f' },
        ]}
      >
        {this.renderIcon()}
        <Text
          style={[
            styles.itemContent,
            { color: type == selectedType ? 'black' : 'white' },
          ]}
        >
          {type}
        </Text>
        {this.renderNextButton()}
      </View>
    );
  }
}

const styles = {
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 51,
    borderRadius: 9,
    marginBottom: 10,
  },
  itemContent: {
    flex: 4,
    fontWeight: 'bold',
    fontSize: 16,
  },
};
