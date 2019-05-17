import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ConfirmedText from './ConfirmedText';

import Colors from '../constants/Colors';

export class CommentReplyCard extends React.Component {
  state = { text: '' };

  render() {
    return (
      <View style={[styles.borderedContentBox, { marginTop: -57 }]}>
        <View style={{ height: 50 }} />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={'여기에 입력하세요...'}
            style={{ fontSize: 13, paddingHorizontal: 5 }}
            multiline
            onChangeText={text => this.setState({ text: text })}
            value={this.state.text}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.cancelText} onPress={this.props.onCancelPress}>
            취소
          </Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.props.onConfirmPress(this.state.text)}
          >
            <Text style={styles.confirmText}> 등록 </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subheaderContainer: { marginBottom: 6 },
  subheaderText: { fontSize: 16, color: Colors.defaultGrey },
  dateText: { fontSize: 11, color: Colors.dateLightGrey, alignSelf: 'center' },
  borderedContentBox: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 13,
    paddingBottom: 7,
    minHeight: 150,
    marginBottom: 10,
    backgroundColor: '#eaf8e5',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    minHeight: 60,
    marginBottom: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#d2eac9',
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    flex: 1,
    fontSize: 13,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  confirmText: {
    fontSize: 13,
    letterSpacing: -0.5,
    fontWeight: 'bold',
  },
});

export default CommentReplyCard;
