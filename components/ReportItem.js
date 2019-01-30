import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/newIncident';

class ReportItem extends React.Component {
  render() {
    const { title } = this.props;
    const empty = <View style={{ flex: 1 }} />;

    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.itemContainer}>
          {empty}
          <Text style={styles.itemContent}>{title}</Text>
          {empty}
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
    backgroundColor: '#ffe2be',
    height: 51,
    borderRadius: 5,
    marginBottom: 10,
  },
  itemContent: {
    color: '#4f4f4f',
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
