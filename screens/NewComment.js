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
  StatusBar,
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import Spinner from '../components/Spinner'
import * as apis from '../apis'
import Colors from '../constants/Colors'
import i18n from '../i18n'

class NewComment extends React.Component {
  constructor() {
    super()
    this.state = { text: '', loading: false }
  }

  onButtonPress() {
    Keyboard.dismiss()
    if (this.state.text.trim() === '') {
      Alert.alert(i18n.t('blank_alert_title'), i18n.t('blank_alert'))
      this.setState({ text: '' })
      return
    }

    Alert.alert(i18n.t('comment_alert_title'), i18n.t('comment_alert'), [
      { text: '취소' },
      { text: '확인', onPress: this.postComment.bind(this) },
    ])
  }

  postComment() {
    this.setState({ loading: true })
    apis
      .postComment(this.props.navigation.getParam('incidentId'), {
        content: this.state.text,
      })
      .then(() => {
        this.setState({ loading: false })
        this.props.navigation.goBack()
        Keyboard.dismiss()
      })
  }

  render() {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.container}>
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
              <Text style={styles.header}>{i18n.t('new_comment')}</Text>
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

export default connect(state => ({}))(NewComment)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
