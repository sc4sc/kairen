import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProgressCard from './ProgressCard';
import Colors from '../constants/Colors';
import { formatDate } from '../utils';
import { typeMap } from '../constants/Incidents';

export default class IncidentCard extends React.Component {
  render() {
    const { onPress, data, confirmed = true } = this.props;
    const { type, createdAt } = data;
    const doc = typeMap[type];

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={styles.content}>
              <View>
                <Text style={styles.dateText}>{formatDate(createdAt)}</Text>
                <Text style={styles.title}>{doc.title}</Text>
                <Text style={styles.addressText}>N1 김병호 김삼열 IT 융합센터</Text>
              </View>

              <Ionicons style={{ alignSelf: 'center' }} name="md-close" size={26} />
            </View>

            {confirmed ? (
              <ProgressCard author="안전팀" minHeight={0} height={80}>
                화재 진압되었습니다.
              </ProgressCard>
            ) : (
              <View style={{ flex: 1 }} />
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>확인 중</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: 'white',
    height: 190,
    borderRadius: 10,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.22,
    shadowRadius: 2,
  },
  content: {
    height: 85,
    flexDirection: 'row',
    paddingHorizontal: 18,
    justifyContent: 'space-between',
  },
  title: { fontWeight: 'bold', fontSize: 18 },
  addressText: { fontSize: 13 },
  dateText: { fontSize: 11, color: Colors.dateLightGrey, marginTop: 11, marginBottom: 5 },
  mapContainer: { width: 80, height: 120 },
  progressContainer: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  progressText: { fontSize: 13, fontWeight: 'bold', color: 'white' },
});
