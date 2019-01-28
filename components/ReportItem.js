import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import * as actions from '../actions/newIncident';

class ReportItem extends React.Component {
  constructor() {
    super();

    this.view = null;
    this.position = {};
    this.animation = {
      opacity: new Animated.Value(1),
    };
  }

  getComponentInfo() {
    if (this.refs.view) {
      this.refs.view.measure((fx, fy, width, height, px, py) => {
        this.position = { px, py };
        this.props.recordPosition(this.position);
      });
    }
  }

  fadeOut() {
    Animated.timing(this.animation.opacity, {
      toValue: 0,
      duration: 200,
    }).start(this.props.changeStage);
  }

  renderVectorIcon() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Feather name={'check'} size={24} />
      </View>
    );
  }

  render() {
    const { type, title, selected, onPressNext: selectable } = this.props;
    const showSelected = selectable && selected;
    const empty = <View style={{ flex: 1 }} />;

    if (!this.props.visibleOthers && !selected) {
      this.fadeOut();
    }

    return (
      <TouchableOpacity
        ref="view"
        onPress={() => {
          this.props.selectIncident(type);
          this.getComponentInfo();
          this.props.toggleVisibility();
        }}
        disabled={!selectable}
      >
        <Animated.View
          style={[
            styles.itemContainer,
            { backgroundColor: selected ? '#d5d5d5' : '#5f5f5f', opacity: this.animation.opacity },
          ]}
        >
          {showSelected ? this.renderVectorIcon() : empty}
          <Text style={[styles.itemContent, { color: selected ? 'black' : 'white' }]}>{title}</Text>
          {empty}
        </Animated.View>
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
  visibleOthers: state.newIncident.visibleOthers,
});

export default connect(
  mapStateToProps,
  actions
)(ReportItem);
