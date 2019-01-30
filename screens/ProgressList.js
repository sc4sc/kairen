import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-navigation';

import * as apis from '../apis';
import { formatDate } from '../utils';
import ProgressCard from '../components/ProgressCard';
import Colors from '../constants/Colors';
import AndroidTopMargin from '../components/AndroidTopMargin';

export class ProgressList extends React.Component {
  constructor() {
    super();
    this.state = { progressList: [] };
  }

  componentWillMount() {
    apis
      .getProgressList(this.props.navigation.getParam('incidentId'))
      .then(response => this.setState({ progressList: response.data }));
  }

  renderProgress(data) {
    const { content, createdAt } = data.item;

    return (
      <ProgressCard author="안전팀" date={formatDate(createdAt)} propStyle={styles.progressBox}>
        {content}
      </ProgressCard>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AndroidTopMargin />
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.header}> Progress </Text>
            <Ionicons
              name="md-close"
              size={26}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          </View>
        </View>

        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <FlatList data={this.state.progressList} renderItem={this.renderProgress} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
  progressBox: {
    borderRadius: 5,
    minHeight: 100,
    marginBottom: 10,
  },
});
