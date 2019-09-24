import React from 'react'
import { View, Text, Image, Linking, TouchableOpacity } from 'react-native'
import { getBottomSpace, getStatusBarHeight } from '../utils/index.js'
import * as contacts from '../constants/Contacts'
import i18n from '../i18n'

const topMargin = getStatusBarHeight()
const bottomMargin = getBottomSpace()

export default class SafetyContact extends React.Component {
  render() {
    const {
      container,
      headerText,
      contentContainer,
      circle,
      notAppliedText,
      contentContainersecond,
      betaVerNotice,
    } = styles

    return (
      <View style={container}>
        <View>
          <Text style={headerText}>KAIREN</Text>
          {/* <View style={contentContainer}>
            <View style={circle} />
            <View style={circle} />
            <View style={circle} />
            <Text style={notAppliedText}> 주의 제보 (준비 중)</Text>
          </View> */}

          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${contacts.campusPolice}`)}>
            <View style={contentContainer}>
              <Image source={require('../assets/images/group-9.png')} />
              <View style={{ width: 5 }} />
              <Text style={{ fontSize: 16 }}>
                {i18n.t('call_to_campus_police')}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${contacts.secureTeam}`)}>
            <View style={contentContainer}>
              <Image source={require('../assets/images/group-9.png')} />
              <View style={{ width: 5 }} />
              <Text style={{ fontSize: 16 }}>
                {i18n.t('call_to_secure_team')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Setting')}>
          <View style={contentContainersecond}>
            <Image source={require('../assets/images/setting_icon.png')} />
            <View style={{ width: 5 }} />
            <Text style={{ fontSize: 16 }}>{i18n.t('setting')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  headerText: {
    marginTop: 20 + topMargin,
    marginBottom: 40,
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: -0.9,
    color: '#4a4a4a',
    paddingLeft: 16,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingLeft: 16,
  },
  contentContainersecond: {
    height: 48 + bottomMargin,
    flexDirection: 'row',
    paddingTop: 16,
    backgroundColor: 'rgb(230,230,230)',
    paddingLeft: 16,
  },
  circle: {
    width: 3,
    height: 3,
    borderRadius: 50,
    backgroundColor: '#bebebe',
    marginRight: 5,
  },
  notAppliedText: { color: '#bebebe', fontSize: 16 },
  betaVerNotice: { color: 'red' },
}
