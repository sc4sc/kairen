import React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { FileSystem } from 'expo'
import { Sentry, SentrySeverity } from 'react-native-sentry'
import { Asset } from 'expo-asset'

const htmlAsset = Asset.fromModule(require('../assets/map.html'))

let downloaded = false

async function loadHtml() {
  downloaded = false
  setTimeout(() => {
    if (downloaded) {
      return
    }
    Sentry.captureMessage('Map is not downloading even after 3 seconds', {
      level: SentrySeverity.Error,
    }) // Default SentrySeverity.Error
  }, 3000)

  let uri = ''
  if (__DEV__) {
    uri = htmlAsset.uri
  } else {
    await htmlAsset.downloadAsync()
    uri = htmlAsset.uri
  }
  console.log('Map URI: ' + uri)

  if (uri.startsWith('http')) {
    console.log('Downloading from the remote server')
    const response = await fetch(uri)
    console.log('Downloaded map.html')
    downloaded = true
    return response.text()
  }

  if (uri.startsWith('asset')) {
    uri = `file://android_asset/${uri.split('://')[1]}`
  }

  console.log('Loading from the filesystem')
  const content = FileSystem.readAsStringAsync(uri, {})
  downloaded = true
  return content
}

export default class NaverMap extends React.Component {
  state = { html: '<p>Loading</p>' }

  componentWillMount = async () => {
    loadHtml().then(html => {
      this.setState({ html })
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.markers !== this.props.markers) {
      this.updateMarkers()
    }
    if (prevProps.draggable !== this.props.draggable) {
      this.updateOptions()
    }
  }

  onWebViewInit = () => {
    this.renderKAIST()
    this.updateMarkers()
    this.updateOptions()
    if (this.props.initialCoords) {
      this.panTo(this.props.initialCoords)
    }

    if (this.props.onInit) {
      this.props.onInit()
    }
  }

  onPress = coords => {
    if (this.props.onPress) {
      this.props.onPress(coords)
    }
  }

  updateMarkers = () => {
    this.postAction('updateMarkers', this.props.markers)
  }

  updateOptions = () => {
    let draggable = this.props.draggable
    if (draggable === undefined) {
      draggable = true
    }
    const options = {
      draggable,
    }
    this.setOptions(options)
  }

  /* supporting methods */

  setOptions = options => {
    this.postAction('setOptions', options)
  }

  setCenter = coords => {
    this.postAction('setCenter', coords)
  }

  panTo = (coords, transitionOptions) => {
    this.postAction('panTo', { coords, transitionOptions })
  }

  renderKAIST = () => {
    const coords = require('../assets/geojson/KAIST.json').features[0].geometry
      .coordinates[0]
    this.postAction('renderKAIST', { coords })
  }

  postAction = (type, payload) => {
    const action = { type, payload }
    // this._webview.postMessage(JSON.stringify(action));

    this._webview.injectJavaScript(
      `setTimeout(() => {window.receiveMessage(${JSON.stringify(
        action
      )});}, 0);`
    )
  }

  // https://medium.com/@azharuddin31/react-native-pass-data-to-webview-and-get-data-out-of-webview-792ffbe7eb75
  handleMessage = ({ nativeEvent }) => {
    const action = JSON.parse(nativeEvent.data)

    switch (action.type) {
      case 'log': {
        // console.log('Log', action.payload);
        return
      }
      case 'ping': {
        this.postAction('pong')
        this.onWebViewInit()
        return
      }
      case 'click': {
        this.onPress(action.payload)
        return
      }
      case 'renderKAIST': {
        this.renderKAIST()
        return
      }
    }
  }

  render() {
    return (
      <View style={[this.props.style]}>
        {this.state.hide ? null : (
          <WebView
            ref={webview => {
              this._webview = webview
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
    )
  }
}
