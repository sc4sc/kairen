import React from 'react';
import { View, WebView, TouchableOpacity, Text } from 'react-native';

import Layout from '../constants/Layout';
import NaverMap from '../components/NaverMap';

export default class MapTest extends React.Component {
  state = {
    html: '<p>Loading</p>',
    markerCoords: {
      lat: 0,
      lng: 0,
    },
  };

  render() {
    return (
      <NaverMap
        ref={el => {
          this._map = el;
        }}
        style={{ flex: 1, alignItems: 'stretch' }}
        markers={[{ key: 'incidentLocation', coords: this.state.markerCoords }]}
        onPress={coords => {
          this._map.panTo(
            { lat: 36.37334626411133, lng: 127.36397930294454 },
            {}
          );
          this.setState({ markerCoords: coords });
        }}
      />
    );
  }
}
