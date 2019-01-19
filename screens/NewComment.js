import React from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  SafeAreaView,
} from 'react-native';

import Colors from '../constants/Colors';
import { Icon, TouchableOpacity } from '@shoutem/ui';

import AndroidTopMargin from '../components/AndroidTopMargin';

export class NewComment extends React.Component {
  state = { text: '' };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.headerContainer}>
          <AndroidTopMargin />
          <Text style={styles.header}> 새로운 의견 등록하기 </Text>
          <Icon
            name="close"
            onPress={() => {
              this.props.navigation.pop();
            }}
          />
        </SafeAreaView>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  header: { fontSize: 20, fontWeight: '800', color: Colors.defaultBlack },
  enrollButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 13,
    marginTop: 20,
    backgroundColor: Colors.buttonGrey,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
  },
});
