import React from 'react';
import { View, WebView, TouchableOpacity, Text } from 'react-native';

import Layout from '../constants/Layout';
import NaverMap from "../components/NaverMap";

export default class MapTest extends React.Component {
  state = { html: '<p>Loading</p>', hide: false };

  render() {
    return <NaverMap style={{ flex: 1, alignItems: 'stretch' }} />;
  }
}
