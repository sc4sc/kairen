import React from 'react';
import { View, WebView, TouchableOpacity, Text } from 'react-native';

import Layout from '../constants/Layout';

const htmlAsset = Expo.Asset.fromModule(require('../assets/map.html'));

export default class MapTest extends React.Component {
  state = { html: '<p>Loading</p>' };

  componentWillMount = async () => {
    let uri = '';
    if (__DEV__) {
      uri = htmlAsset.uri;
    } else {
      if (!htmlAsset.localUri) {
        await htmlAsset.downloadAsync();
        console.log('Downloading map.html...');
      }
      uri = htmlAsset.localUri;
    }
    console.log('Map URI: ' + uri);

    const response = await fetch(uri);
    console.log('Downloaded map.html');
    this.setState({ html: await response.text() });
  };

  onPress = () => {
    this.postAction({
      type: 'panTo',
      payload: { coords: { lat: 36.37334626411133, lng: 127.36397930294454 }},
    });
  };

  postAction = action => this._webview.postMessage(JSON.stringify(action));

  // https://medium.com/@azharuddin31/react-native-pass-data-to-webview-and-get-data-out-of-webview-792ffbe7eb75
  handleMessage = ({ nativeEvent }) => {
    console.log('handleMessage', nativeEvent.data);
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'stretch' }}>
        <TouchableOpacity style={{ marginTop: 100 }} onPress={this.onPress}>
          <Text>Touch me</Text>
        </TouchableOpacity>
        <WebView
          ref={webview => {
            this._webview = webview;
          }}
          source={{
            html: this.state.html,
            baseUrl: 'http://localhost',
          }}
          style={{ flex: 1 }}
          onError={err => console.log('onError', err)}
          onMessage={this.handleMessage}
        />
      </View>
    );
  }
}
