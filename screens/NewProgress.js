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
      Alert.alert(
        '내용을 입력해주세요.',
        '공백으로 이루어진 메세지는 등록하실 수 없습니다.'
      )
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
            <Text style={styles.header}>{i18n.t('new_progress')}</Text>
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.goBack()
              }}>
              <View style={{ width: 30, alignItems: 'center' }}>
                <Ionicons name="md-close" size={26} />
              </View>
            </TouchableWithoutFeedback>
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
            <View
              style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 25 }}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={this.onButtonPress.bind(this)}>
                <Text style={styles.buttonText}>{i18n.t('enroll')}</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    )
  }
}

export default connect(state => ({}))(NewProgress)

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  header: { fontSize: 20, fontWeight: '800', color: Colors.defaultBlack },
  contentContainer: { flex: 1, paddingHorizontal: 20 },
  textInputStyle: {
    padding: 10,
    height: Dimensions.get('window').height * 0.3,
    maxHeight: Dimensions.get('window').height * 0.3,
    textAlignVertical: 'top',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 13,
    marginVertical: 20,
    backgroundColor: Colors.buttonGrey,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.22,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
  },
})
