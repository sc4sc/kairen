import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { Icon } from '@shoutem/ui';
import * as actions from '../actions';

class ReportItem extends React.Component {
  renderIcon() {
    const { isSelected, showButton } = this.props;

    return isSelected && showButton ? (
      <Icon name="checkbox-on" style={{ flex: 1 }} />
    ) : (
      <View style={{ flex: 1 }} />
    );
  }

  renderNextButton() {
    const { onPress, isSelected, showNext, children } = this.props;

    return isSelected && showNext ? (
      <Text
        style={{ flex: 1, fontSize: 16, fontWeight: 'bold' }}
        onPress={onPress}
      >
        다음
      </Text>
    ) : (
      <View style={{ flex: 1 }} />
    );
  }

  onButtonPressed() {
    this.props.selectIncident(this.props.type);
  }

  render() {
    const { type, isSelected } = this.props;

    return (
      <TouchableOpacity onPress={this.onButtonPressed.bind(this)}>
        <View
          style={[
            styles.itemContainer,
            { backgroundColor: isSelected ? '#d5d5d5' : '#5f5f5f' },
          ]}
        >
          {this.renderIcon()}
          <Text
            style={[
              styles.itemContent,
              { color: isSelected ? 'black' : 'white' },
            ]}
          >
            {type}
          </Text>
          {this.renderNextButton()}
        </View>
      </TouchableOpacity>
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

const mapStateToProps = (state, ownProps) => {
  return {
    isSelected: state.newIncident.selectedIncident === ownProps.type,
  };
};

export default connect(
  mapStateToProps,
  actions
)(ReportItem);
