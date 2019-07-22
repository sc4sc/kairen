import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Layout from '../constants/Layout';
import { getStatusBarHeight } from '../utils';
import i18n from '../i18n';

const statusBarHeight = getStatusBarHeight();

export default function AboutThisApp(props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
          <View style={styles.header}>
            <Image source={require('../assets/images/back.png')} />
            <Text style={styles.headerBackward}>
              {props.navigation.state.params
                ? props.navigation.state.params.parent
                : null}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.contentBody}>
        <Image
          source={require('../assets/images/fronticon.png')}
          style={styles.icon}
        />
        <Text style={styles.appTitle}>KAIREN</Text>
        <Text style={styles.appVersion}>version 1.0.6</Text>
        <Text style={styles.makers}>{i18n.t('created_by')}</Text>
        <Text style={styles.people}>류석영</Text>
        <Text style={styles.people}>최민성</Text>
        <Text style={styles.people}>김예준</Text>
        <Text style={styles.people}>서혜인</Text>
        <Text style={styles.leo}>정진우</Text>
        <Text style={styles.makers}>Special thanks to</Text>
        <Text style={styles.people}>윤현석</Text>
        <Text>Eric</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerContainer: {
    width: Layout.window.width,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: Platform.OS === 'android' ? 25 + statusBarHeight : 25,
    marginLeft: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBackward: {
    fontSize: 18,
    marginLeft: 5,
    marginTop: -1,
  },
  contentBody: {
    width: Layout.window.width,
    height: Layout.window.height - (statusBarHeight + 100),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginLeft: -10,
    marginBottom: 15,
  },
  appTitle: {
    fontSize: 21,
    fontWeight: '800',
  },
  appVersion: {
    fontSize: 15,
    color: '#c5c5c5',
    marginBottom: 33,
  },
  makers: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 13,
  },
  people: {
    marginBottom: 5,
  },
  leo: {
    marginBottom: 45,
  },
};
