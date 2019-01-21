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
import { connect } from 'react-redux';

import Colors from '../constants/Colors';

import AndroidTopMargin from '../components/AndroidTopMargin';
import { Ionicons } from '@expo/vector-icons';

export class NewComment extends React.Component {
  state = { text: '' };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <AndroidTopMargin />
          <View style={styles.headerContainer}>
            <Text style={styles.header}> 새로운 의견 등록하기 </Text>
            <Ionicons
              name="md-close"
              size={26}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
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
            <TouchableOpacity style={styles.enrollButton}>
              <Text style={styles.buttonText}> 등록하기 </Text>
            </TouchableOpacity>
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
  enrollButton: {
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
});
