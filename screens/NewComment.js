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
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import Spinner from '../components/Spinner';
import * as apis from '../apis';
import Colors from '../constants/Colors';
import AndroidTopMargin from '../components/AndroidTopMargin';

class NewComment extends React.Component {
  constructor() {
    super();
    this.state = { text: '', loading: false };
  }

  onButtonPress() {
    Keyboard.dismiss();
    if (this.state.text.trim() === '') {
      Alert.alert(
        '내용을 입력해주세요.',
        '공백으로 이루어진 메세지는 등록하실 수 없습니다.'
      );
      this.setState({ text: '' });
      return;
    }

    Alert.alert(
      '댓글을 등록하시겠습니까?',
      '한 번 등록한 댓글은 삭제하실 수 없습니다',
      [{ text: '취소' }, { text: '확인', onPress: this.postComment.bind(this) }]
    );
  }

  postComment() {
    this.setState({ loading: true });
    apis
      .postComment(this.props.navigation.getParam('incidentId'), {
        content: this.state.text,
      })
      .then(() => {
        this.setState({ loading: false });
        this.props.navigation.goBack();
        Keyboard.dismiss();
      });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <AndroidTopMargin />
          {this.state.loading && <Spinner overlay />}
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

          <KeyboardAvoidingView
            style={styles.contentContainer}
            behavior="padding"
          >
            <TextInput
              style={styles.textInputStyle}
              placeholder="여기에 입력하세요..."
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              multiline
              autoFocus
            />
            <View
              style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 25 }}
            >
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={this.onButtonPress.bind(this)}
              >
                <Text style={styles.buttonText}>등록하기</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(state => ({}))(NewComment);

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
});
