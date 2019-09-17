import React from 'react'
import { View, Text, Image, Linking, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userChangeMode } from '../actions/user'
import { getBottomSpace, getStatusBarHeight } from '../utils/index.js'
import * as contacts from '../constants/Contacts'
import i18n from '../i18n'

const topMargin = getStatusBarHeight()
const bottomMargin = getBottomSpace()

class SafetyContact extends React.Component {
  render() {
    const {
      container,
      headerText,
      contentContainer,
      contentContainersecond,
      betaVerNotice,
      cautionContainer,
    } = styles

    return (
      <View style={container}>
        <View>
          <Text style={headerText}>KAIREN</Text>
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

          {this.props.user.isTraining ? (
            <TouchableOpacity onPress={() => this.props.changeMode()}>
              <View style={[contentContainer, { backgroundColor: '#50d434' }]}>
                <Image source={require('../assets/images/unlock.png')} />
                <View style={{ width: 10 }} />
                <Text style={{ fontSize: 16, color: 'white' }}>
                  훈련 모드 해제
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => this.props.changeMode()}>
              <View style={[contentContainer, { backgroundColor: '#d43434' }]}>
                <Image source={require('../assets/images/lock.png')} />
                <View style={{ width: 10 }} />
                <Text style={{ fontSize: 16, color: 'white' }}>
                  훈련 모드 시작
                </Text>
              </View>
            </TouchableOpacity>
          )}

          <View style={cautionContainer}>
            <Image
              style={{ marginTop: 4 }}
              source={require('../assets/images/caution.png')}
            />
            <View style={{ width: 5 }} />
            <Text style={{ fontSize: 12, color: '#979797' }}>
              훈련 모드 시 등록된 제보는 실제 사고를 반영하지 않는 것으로
              간주하며, 추후 예고 없이 삭제될 수 있습니다.
            </Text>
          </View>
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
    paddingHorizontal: 16,
  },
  contentContainersecond: {
    height: 48 + bottomMargin,
    flexDirection: 'row',
    paddingTop: 16,
    backgroundColor: 'rgb(230,230,230)',
    paddingHorizontal: 16,
  },
  cautionContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingLeft: 16,
    paddingRight: 30,
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

export default connect(
  state => ({ user: state.user.data }),
  dispatch => ({ changeMode: bindActionCreators(userChangeMode, dispatch) })
)(SafetyContact)
