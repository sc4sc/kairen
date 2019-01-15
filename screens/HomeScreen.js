import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
} from 'react-native';
import { Icon, Heading, Title, Subtitle, Caption } from '@shoutem/ui';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

const Incident = () => <View style={{ flexDirection: 'row', alignItems: 'stretch' }}>
  <View style={{ backgroundColor: 'red', width: 5 }}></View>
  <View style={{ flex: 1, flexDirection: 'row', padding: 12 }}>
    <View>
      <Title>Conflagration</Title>
      <Subtitle>Yuseong 291, Daejeon</Subtitle>
      <View style={{ flex: 1}} />
      <Caption>Jan 14, 2019</Caption>
    </View>
    <View style={{flex:1}} />
    <View style={{ height: 120 }}>
      <Text>Map ?Here</Text>
    </View>
  </View>
</View>

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[ Platform.OS === 'android' && { height: 40 } ]} />

        <SafeAreaView>
          <View style={{ margin: 8, marginLeft: 16, flexDirection: 'row' }}>
            <Heading>Recent</Heading>
            <View style={{ flex: 1 }} />
            {/* 설정 버튼임!!!! */}
            <Icon name="search" />
          </View>
          <ScrollView>
            <Incident/>
            <Incident/>
            <Incident/>
            <Incident/>
            <Incident/>
            <Incident/>
            <Incident/>
            <Incident/>
          </ScrollView>
        </SafeAreaView>
        <View style={{flex:1}}/>
        <View style={{ backgroundColor: 'grey', borderTopLeftRadius: 10, borderTopRightRadius: 10, alignItems: 'center', padding: 8}}>
          <Text style={{ color: '#FEFEFE', fontWeight: '600', fontSize: 24 }}>Send Report</Text>
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
