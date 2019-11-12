import React from 'react'
import {
  View,
  Text,
  Alert,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

import * as apis from '../apis'
import Spinner from '../components/Spinner'
import Colors from '../constants/Colors'
import AndroidTopMargin from '../components/AndroidTopMargin'
import i18n from '../i18n'

class NewProgress extends React.Component {
  constructor() {
    super()
    this.state = { text: '', loading: false }
  }

  onButtonPress() {
    if (this.state.text.trim() === '') {
      Alert.alert(i18n.t('blank_alert_title'), i18n.t('blank_alert'))
      this.setState({ text: '' })
      return
    }

    Alert.alert(i18n.t('progress_alert_title'), i18n.t('progress_alert'), [
      { text: i18n.t('cancel') },
      { text: i18n.t('confirm'), onPress: this.postProgress.bind(this) },
    ])
  }

  postProgress() {
    this.setState({ loading: true })
    apis
      .postProgress(this.props.navigation.getParam('incidentId'), {
        content: this.state.text,
      })
      .then(() => {
        this.setState({ loading: false })
        this.goBackAndShowList()
        Keyboard.dismiss()
      })
  }

  goBackAndShowList() {
    const incidentId = this.props.navigation.getParam('incidentId')
    this.props.navigation.goBack()
    this.props.navigation.navigate('ProgressList', { incidentId })
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <AndroidTopMargin />
          {this.state.loading && <Spinner overlay />}
          <View style={styles.headerContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.goBack()
              }}>
              <View>
                <Ionicons name="md-close" size={20} />
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.header}>{i18n.t('new_progress')}</Text>
            <View
              style={styles.buttonStyle}>
              <TouchableOpacity
                onPress={this.onButtonPress.bind(this)}>
                <Text style={styles.buttonText}>{i18n.t('enroll')}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <KeyboardAvoidingView
            style={styles.contentContainer}
            behavior="padding">
            <TextInput
              style={styles.textInputStyle}
              placeholder={i18n.t('placeholder')}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              multiline
              autoFocus
            />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    )
  }
}

export default connect(state => ({}))(NewProgress)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  header: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '800',
    color: Colors.defaultBlack,
    marginTop: -20,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  textInputStyle: {
    padding: 10,
    height: Dimensions.get('window').height * 0.3,
    maxHeight: Dimensions.get('window').height * 0.3,
    textAlignVertical: 'top',
  },
  buttonStyle: {
    marginTop: -20,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 18,
  },
})
