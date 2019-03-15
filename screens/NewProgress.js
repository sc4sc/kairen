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
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import * as apis from '../apis';
import Colors from '../constants/Colors';
import AndroidTopMargin from '../components/AndroidTopMargin';

class NewProgress extends React.Component {
  constructor() {
    super();
    this.state = { text: '' };
  }

  onButtonPress() {
    Alert.alert(
      '진행 상황을 등록하시겠습니까?',
      '가장 최근 진행 상황이 사건 사고 목록에 표시됩니다.',
      [
        { text: '취소' },
        { text: '확인', onPress: this.postProgress.bind(this) },
      ]
    );
  }

  postProgress() {
    apis
      .postProgress(this.props.navigation.getParam('incidentId'), {
        content: this.state.text,
      })
      .then(this.goBackAndShowList.bind(this));
  }

  goBackAndShowList() {
    const incidentId = this.props.navigation.getParam('incidentId');
    this.props.navigation.goBack();
    this.props.navigation.navigate('ProgressList', { incidentId });
  }

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

export default connect(state => ({}))(NewProgress);

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
