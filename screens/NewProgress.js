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
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

import axios from 'axios';
import * as apis from '../apis';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';
import AndroidTopMargin from '../components/AndroidTopMargin';
import { Ionicons } from '@expo/vector-icons';

class NewProgress extends React.Component {
  state = { text: '' };

  onButtonPress() {
    Alert.alert('진행 상황을 등록하시겠습니까?', 'Something warning text', [
      { text: '취소' },
      { text: '확인', onPress: this.postProgress.bind(this) },
    ]);
  }

  postProgress() {
    apis
      .postProgress(this.props.navigation.getParam('incidentId'), {
        userId: this.props.userId,
        content: this.state.text,
      })
      .then(this.goBackAndShowList);
  }

  goBackAndShowList = () => {
    this.props.navigation.goBack();
    this.props.navigation.navigate('ProgressList');
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <AndroidTopMargin />
          <View style={styles.headerContainer}>
            <Text style={styles.header}> 진행 상황 등록하기 </Text>
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

          <KeyboardAvoidingView style={styles.contentContainer}>
            <TextInput
              style={{ padding: 10, maxHeight: 200 }}
              placeholder="여기에 입력하세요..."
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              multiline={true}
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

export default connect(state => ({
  userId: state.auth.user.username,
}))(NewProgress);

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
