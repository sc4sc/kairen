import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const StateCheckButton = ({ selected, color, children, onPress, disabled }) => {
  let { circleStyle, buttonContainer, buttonText } = styles;

  buttonContainer = { ...buttonContainer, backgroundColor: selected ? color : 'white' };
  circleStyle = { ...circleStyle, backgroundColor: selected ? 'white' : color };
  buttonText = { ...buttonText, color: selected ? 'white' : color };

  return (
    <TouchableOpacity style={buttonContainer} onPress={onPress} disabled={disabled}>
      <View style={circleStyle} />
      <View style={{ width: 5 }} />
      <Text style={buttonText}> {children} </Text>
    </TouchableOpacity>
  );
};

const styles = {
  circleStyle: {
    width: 11,
    height: 11,
    borderRadius: 50,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24.5,
    paddingVertical: 12,
    margin: 4,
  },
  buttonText: { fontSize: 13, fontWeight: 'bold' },
};

export default StateCheckButton;
