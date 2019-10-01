import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'
import * as SecureStore from 'expo-secure-store'
import Colors from '../constants/Colors'
import AndroidTopMargin from '../components/AndroidTopMargin'
import Spinner from '../components/Spinner'
import * as apis from '../apis'
import i18n from '../i18n'

class Setting extends React.Component {
  constructor() {
    super()

    this.state = { alertAlarm: false, loading: false }
  }

  goBack() {
    this.props.navigation.goBack()
  }

  goToAboutPage() {
    this.props.navigation.navigate('AboutUs', { parent: i18n.t('setting') })
  }

  handleLogout = async () => {
    this.setState({ loading: true })
    await Promise.all([
      SecureStore.deleteItemAsync('appToken'),
      apis.requestLogout(),
    ])

    this.setState({ loading: false })
    this.props.navigation.navigate('Login')
  }

  onLogoutPress = () => {
    Alert.alert('', i18n.t('logout_alert'), [
      { text: i18n.t('cancel') },
      { text: i18n.t('confirm'), onPress: () => this.handleLogout() },
    ])
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AndroidTopMargin />
        {this.state.loading && <Spinner overlay />}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{i18n.t('setting')}</Text>
          <View style={styles.buttonContainer}>
            <TouchableWithoutFeedback onPress={this.goBack.bind(this)}>
              <View style={{ width: 20, alignItems: 'center' }}>
                <Image source={require('../assets/images/back.png')} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>{i18n.t('account')}</Text>
          <View style={[styles.cardContent, styles.accountContainer]}>
            <Text style={{ fontSize: 15 }}> {this.props.user.ku_kname} </Text>
            <TouchableOpacity onPress={this.onLogoutPress}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: Colors.textRed,
                    fontWeight: '500',
                    marginRight: 5,
                  }}>
                  {i18n.t('logout')}
                </Text>
                <Image
                  style={{ width: 12, height: 10 }}
                  source={require('../assets/images/logout.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}> 알림 설정 </Text>
          <View style={styles.cardContent}>
            <Text style={{ fontSize: 15 }}> '주의' 제보 알림 받기 </Text>
            <SwitchToggle
              containerStyle={styles.switchStyle}
              circleStyle={{ width: 24, height: 24, borderRadius: 27.5 }}
              switchOn={this.state.alertAlarm}
              backgroundColorOn={Colors.switchGreen}
              circleColorOn="white"
              duration={150}
              onPress={() =>
                this.setState({ alertAlarm: !this.state.alertAlarm })
              }
            />
          </View>
        </View> */}

        <View style={styles.cardContainer} />
        <View style={styles.delimiter} />
        <View style={{ paddingHorizontal: 20 }}>
          <TouchableWithoutFeedback
            onPress={() => Linking.openURL('mailto:kairen@kaist.ac.kr')}>
            <Text style={{ fontSize: 15, marginVertical: 17 }}>
              {i18n.t('ask_us')}
            </Text>
          </TouchableWithoutFeedback>
          <Text
            style={{ fontSize: 15, marginVertical: 17 }}
            onPress={() => this.goToAboutPage()}>
            {i18n.t('about_us')}
          </Text>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flex: 6,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
  },
  buttonContainer: {
    position: 'absolute',
    left: 5,
    top: 23,
    width: 40,
    height: 30,
    alignItems: 'center',
  },
  switchStyle: {
    width: 53,
    height: 28,
    borderRadius: 28.5,
    padding: 2,
  },
  cardContainer: { margin: 20 },
  cardTitle: { fontSize: 13, color: Colors.lightGrey, marginBottom: 7.5 },
  cardContent: { flexDirection: 'row', justifyContent: 'space-between' },
  accountContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#eaeaea',
    borderRadius: 5,
    paddingHorizontal: 21,
    paddingVertical: 18.5,
    shadowOffset: { width: 0, height: 8 },
    shadowColor: '#ddd',
    shadowOpacity: 0.5,
    shadowRadius: 15,
    // elevation: 5,
  },
  delimiter: {
    borderTopWidth: 1,
    borderColor: '#d8d8d8',
    marginLeft: 20,
    width: 25,
  },
})

const mapStateToProps = state => {
  return {
    user: state.user.data,
  }
}
export default connect(mapStateToProps)(Setting)
