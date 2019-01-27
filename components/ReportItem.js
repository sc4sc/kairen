import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import * as actions from '../actions/newIncident';

class ReportItem extends React.Component {
  constructor() {
    super();

    this.position = {};
    this.animation = {
      opacity: new Animated.Value(1),
    };
  }

  componentDidMount() {
    // Print component dimensions to console
    this.myComponent.measure((fx, fy, width, height, px, py) => {
      console.log(`Component width is: ${width}`);
      console.log(`Component height is: ${height}`);
      console.log(`X offset to frame: ${fx}`);
      console.log(`Y offset to frame: ${fy}`);
      console.log(`X offset to page: ${px}`);
      console.log(`Y offset to page: ${py}`);
    });
  }

  fadeOut() {
    Animated.timing(this.animation.opacity, {
      toValue: 0,
      duration: 500,
    }).start();
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
    const { type, title, selected, onPressNext: selectable } = this.props;
    const showSelected = selectable && selected;
    const empty = <View style={{ flex: 1 }} />;

    if (!this.props.visibleOthers && !selected) {
      this.fadeOut();
    }

    return (
      <TouchableOpacity
        onPress={() => {
          this.props.selectIncident(type);
          // this.props.recordPosition();
          this.props.toggleVisibility();
        }}
        disabled={!selectable}
      >
        <Animated.View
          ref={view => {
            this.myComponent = view;
          }}
          style={[
            styles.itemContainer,
            { backgroundColor: selected ? '#d5d5d5' : '#5f5f5f', opacity: this.animation.opacity },
          ]}
        >
          {showSelected ? this.renderVectorIcon() : empty}
          <Text style={[styles.itemContent, { color: selected ? 'black' : 'white' }]}>{title}</Text>
          {showSelected ? this.renderNextButton() : empty}
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
