import React from 'react';
import { WebView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import * as _ from 'lodash';

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

    this._webview.injectJavaScript(`
        window.postMessage(document.documentElement.innerHTML);
    `);
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
            body: 'appKey=A0000763',
          }}
          onNavigationStateChange={this.onNavigation}
          onMessage={this.handleMessage}
        />
      </SafeAreaView>
    );
  }
}
