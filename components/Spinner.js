import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size, overlay }) => {
  const { boxStretchStyle, overlayStyle } = styles;
  const containerStyle = overlay ? overlayStyle : boxStretchStyle;
  return (
    <View style={containerStyle}>
      <ActivityIndicator size={size || 'large'} color={'white'} />
    </View>
  );
};

const styles = {
  boxStretchStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayStyle: {
    position: 'absolute',
    backgroundColor: '#aaaa',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
};

export default Spinner;
