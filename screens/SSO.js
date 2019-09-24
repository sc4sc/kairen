import React from 'react'
import { WebView } from 'react-native-webview'
import { SafeAreaView } from 'react-navigation'
import * as _ from 'lodash'
import { SSO_APP_KEY } from 'babel-dotenv'

export default class SSO extends React.Component {
  constructor(props) {
    super(props)
    this._tokenExtracted = false
  }

  onNavigation = e => {
    if (!e.loading) {
      if (e.url.includes('requestAppLogin')) {
        console.log('[WebView] Opening SSO...')
      } else if (e.url.includes('IntegratedLoginForApp')) {
        console.log('[WebView] Login')
      } else if (e.url.includes('IntegratedAppAuth')) {
        // console.log('[WebView] Authenticated');
      }
    }

    // TODO: Page Loading Error: NSURLErrorDomain redirection 해결하기
    if (e.url.startsWith('token')) {
      this.handleLogin(e.url.slice(6))
      e.url = 'about:blank'
      return
    }

    if (!this._tokenExtracted) {
      this.extractInnerHTML()
    }
  }

  extractInnerHTML = _.throttle(() => {
    // This handles when user just got back to the login screen
    if (!this._webview) {
      return
    }
    this._webview.injectJavaScript(`
      setTimeout(() => {
        window.ReactNativeWebView.postMessage(document.documentElement.innerHTML);
        true;
      }, 0)
    `)
  }, 66)

  handleMessage = ({ nativeEvent: { data } }) => {
    const tokenMatch = /"token:(.+)"/.exec(data)
    if (tokenMatch) {
      this._tokenExtracted = true
      this.handleLogin(tokenMatch[1])
    }
  }

  handleLogin = token => {
    this.props.navigation.goBack()
    console.log(`SSO Token: ${token}`)
    const onLogin = this.props.navigation.getParam('onLogin')
    if (onLogin) {
      onLogin(token)
    }
  }

  render() {
    return (
      <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1 }}>
        <WebView
          useWebKit={true}
          style={{ flex: 1 }}
          ref={el => {
            this._webview = el
          }}
          source={{
            html: `
            <form method="post" id="theForm" action="https://iam.kaist.ac.kr/iamps/requestAppLogin.do">
              <input type="hidden" name="appKey" value="${SSO_APP_KEY}">
            </form>
          `,
          }}
          injectedJavaScript={`
            setTimeout(() => {
              var form = document.getElementById('theForm')
              return document.getElementById('theForm').submit()
            }, 0)
          `}
          originWhitelist={['*']}
          onNavigationStateChange={this.onNavigation}
          onMessage={this.handleMessage}
        />
      </SafeAreaView>
    )
  }
}
