import React from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-navigation';
import * as _ from 'lodash';
import { SSO_APP_KEY } from 'babel-dotenv';

export default class SSO extends React.Component {
  constructor(props) {
    super(props);
    this._tokenExtracted = false;
  }

  onNavigation = e => {
    if (!e.loading) {
      if (e.url.includes('requestAppLogin')) {
        console.log('[WebView] Opening SSO...');
      } else if (e.url.includes('IntegratedLoginForApp')) {
        console.log('[WebView] Login');
      } else if (e.url.includes('IntegratedAppAuth')) {
        // console.log('[WebView] Authenticated');
      }
    }

    if (!this._tokenExtracted) {
      this.extractInnerHTML();
    }
  };

  extractInnerHTML = _.throttle(() => {
    // This handles when user just got back to the login screen
    if (!this._webview) {
      return;
    }

    setTimeout(
      () =>
        this._webview.injectJavaScript(`
      window.ReactNativeWebView.postMessage(document.documentElement.innerHTML);
      true;
    `),
      300
    );
  }, 66);

  handleMessage = ({ nativeEvent: { data } }) => {
    const tokenMatch = /"token:(.+)"/.exec(data);
    if (tokenMatch) {
      this._tokenExtracted = true;
      console.log('SSO Token', tokenMatch[1]);
      this.handleLogin(tokenMatch[1]);
    }
  };

  handleLogin = token => {
    this.props.navigation.goBack();
    console.log(token);
    const onLogin = this.props.navigation.getParam('onLogin');
    if (onLogin) {
      onLogin(token);
    }
  };

  render() {
    return (
      <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1 }}>
        <WebView
          style={{ flex: 1 }}
          ref={el => {
            this._webview = el;
          }}
          source={{
            uri: 'https://iam.kaist.ac.kr/iamps/requestAppLogin.do',
            method: 'POST',
            body: `appKey=${SSO_APP_KEY}`,
          }}
          onNavigationStateChange={this.onNavigation}
          onMessage={this.handleMessage}
        />
      </SafeAreaView>
    );
  }
}
