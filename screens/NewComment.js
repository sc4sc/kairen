import React from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import * as apis from '../apis';
import Colors from '../constants/Colors';
import AndroidTopMargin from '../components/AndroidTopMargin';

class NewComment extends React.Component {
  constructor() {
    super();
    this.state = { text: '' };
  }

  onButtonPress() {
    Alert.alert('댓글을 등록하시겠습니까?', 'Something warning text', [
      { text: '취소' },
      { text: '확인', onPress: this.postComment.bind(this) },
    ]);
  }

  postComment() {
    apis
      .postComment(this.props.navigation.getParam('incidentId'), {
        userId: this.props.userId,
        content: this.state.text,
      })
      .then(() => this.props.navigation.goBack());
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <AndroidTopMargin />
          <View style={styles.headerContainer}>
            <Text style={styles.header}> 새로운 의견 등록하기 </Text>
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <View style={{ width: 30, alignItems: 'center' }}>
                <Ionicons name="md-close" size={26} />
              </View>
            </TouchableWithoutFeedback>
          </View>

          <KeyboardAvoidingView style={styles.contentContainer} behavior="padding">
            <TextInput
              style={{ padding: 10, maxHeight: 200 }}
              placeholder="여기에 입력하세요..."
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              multiline
            />
            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 25 }}>
              <TouchableOpacity style={styles.buttonStyle} onPress={this.onButtonPress.bind(this)}>
                <Text style={styles.buttonText}>등록하기</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(state => ({
  userId: state.auth.user.username,
}))(NewComment);

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
});
