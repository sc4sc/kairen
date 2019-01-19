import React from 'react';
import { View, Text, StyleSheet, Platform, SafeAreaView } from 'react-native';
import ProgressCard from '../components/ProgressCard';

import Colors from '../constants/Colors';
import { Icon } from '@shoutem/ui';
import AndroidTopMargin from '../components/AndroidTopMargin';

export class ProgressList extends React.Component {
  state = { text: '' };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.headerContainer}>
          <AndroidTopMargin />
          <View style={styles.headerContainer}>
            <Text style={styles.header}> Progress </Text>
            <Icon
              name="close"
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          </View>
        </SafeAreaView>

        <View style={{ padding: 15 }}>
          <ProgressCard author="유성소방서" date="Jan 8, 2019">
            화재 진압되었습니다. 사고원인 조사중입니다.
          </ProgressCard>
          <ProgressCard author="안전팀" date="Jan 1, 2019">
            현재 소방관들이 화재 진압 중입니다. 근처에 계신 분들은 모두
            대피하시기 바랍니다.
          </ProgressCard>
          <ProgressCard author="안전팀" date="Dec 27, 2018">
            화재 신고 접수, 소방서에 연락 중입니다.
          </ProgressCard>
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
