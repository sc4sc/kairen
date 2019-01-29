import React from 'react';
import { Text, TouchableOpacity, View, WebView } from 'react-native';

const htmlAsset = Expo.Asset.fromModule(require('../assets/map.html'));

async function loadHtml() {
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
  return response.text();
}

export default class NaverMap extends React.Component {
  state = { html: '<p>Loading</p>', hide: false };

  componentWillMount = async () => {
    loadHtml().then(html => {
      this.setState({ html });
    });
  };

  // onPress = () => {
  //   this.postAction({
  //     type: 'panTo',
  //     payload: { coords: { lat: 36.37334626411133, lng: 127.36397930294454 } },
  //   });
  // };

  onWebViewInit = () => {
    this.postAction({
      type: 'panTo',
      payload: { coords: { lat: 36.37334626411133, lng: 127.36397930294454 } },
    });
  };

  postAction = action => this._webview.postMessage(JSON.stringify(action));

  // https://medium.com/@azharuddin31/react-native-pass-data-to-webview-and-get-data-out-of-webview-792ffbe7eb75
  handleMessage = ({ nativeEvent }) => {
    console.log('handleMessage', nativeEvent.data);
    switch (nativeEvent.data) {
      case 'ping': {
        this.postAction({ type: 'pong' });
        this.onWebViewInit();
        return;
      }
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'stretch' }}>
        {/*<TouchableOpacity style={{ marginTop: 30 }} onPress={this.onPress}>*/}
          {/*<Text>Go To KAIST</Text>*/}
        {/*</TouchableOpacity>*/}
        {/*<TouchableOpacity*/}
          {/*style={{ marginTop: 10 }}*/}
          {/*onPress={() =>*/}
            {/*this.setState(s => ({*/}
              {/*hide: !s.hide,*/}
            {/*}))*/}
          {/*}*/}
        {/*>*/}
          {/*<Text>{this.state.hide ? 'Show' : 'Hide'}</Text>*/}
        {/*</TouchableOpacity>*/}
        {this.state.hide ? null : (
          <WebView
            ref={webview => {
              this._webview = webview;
            }}
            source={{
              html: this.state.html,
              baseUrl: 'http://localhost',
            }}
            style={{ flex: 1 }}
            onMessage={this.handleMessage}
          />
        )}
      </View>
    );
  }
}
