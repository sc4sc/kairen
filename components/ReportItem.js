import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import * as actions from '../actions/newIncident';

class ReportItem extends React.Component {
  onButtonPressed() {
    this.props.selectIncident(this.props.type);
  }

  renderNextButton() {
    return (
      <Text style={{ flex: 1, fontSize: 16, fontWeight: 'bold' }} onPress={this.props.onPressNext}>
        다음
      </Text>
    );
  }

  renderVectorIcon() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Feather name={'check'} size={24} />
      </View>
    );
  }

  render() {
    const { title, selected, onPressNext: selectable } = this.props;
    const showSelected = selectable && selected;
    const empty = <View style={{ flex: 1 }} />;

    return (
      <TouchableOpacity onPress={this.onButtonPressed.bind(this)} disabled={!selectable}>
        <View style={[styles.itemContainer, { backgroundColor: selected ? '#d5d5d5' : '#ffe2be' }]}>
          {showSelected ? this.renderVectorIcon() : empty}
          <Text style={[styles.itemContent, { color: selected ? 'white' : '#4f4f4f' }]}>
            {title}
          </Text>
          {showSelected ? this.renderNextButton() : empty}
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

const mapStateToProps = (state, ownProps) => ({
  selected: state.newIncident.selectedIncident === ownProps.type,
});

export default connect(
  mapStateToProps,
  actions
)(ReportItem);
