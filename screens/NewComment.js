import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';

import axios from 'axios';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';
import AndroidTopMargin from '../components/AndroidTopMargin';
import { Ionicons } from '@expo/vector-icons';

export class NewComment extends React.Component {
  state = { text: '', statusMsg: '' };

  onButtonPress() {
    this.setState({ statusMsg: '' });
    axios
      .post(
        'https://4348005f-4254-4628-883a-40baa7dfdbea.mock.pstmn.io/incidents/1/comments',
        {
          userId: '최민성',
          content: this.state.text,
        }
      )
      .then(response => this.setState({ statusMsg: response }))
      .catch(error => this.setState({ statusMsg: error.message }));
  }

  render() {
    console.log(this.state.statusMsg);
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

          <View style={{ padding: 20 }}>
            <TextInput
              style={{
                padding: 10,
                borderColor: Colors.lightGrey,
                borderWidth: 1,
              }}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              multiline={true}
            />
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={this.onButtonPress.bind(this)}
            >
              <Text style={styles.buttonText}>등록하기</Text>
            </TouchableOpacity>

            <Text style={styles.statusText}> {this.state.statusMsg} </Text>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  header: { fontSize: 20, fontWeight: '800', color: Colors.defaultBlack },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 13,
    marginTop: 20,
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
  statusText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
  },
});
