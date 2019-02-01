import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProgressCard from './ProgressCard';
import Colors from '../constants/Colors';
import { formatDate, checkIsInbuilding } from '../utils';
import { typeMap } from '../constants/Incidents';

export default class IncidentCard extends React.Component {
  render() {
    const { onPress, data } = this.props;
    const { type, createdAt, state, Progresses, lat, lng } = data;
    const confirmed = Progresses.length > 0;
    const location = checkIsInbuilding({ lat, lng });
    const doc = typeMap[type];

    let progressStateColor = '';
    switch (state) {
      case '확인중':
        progressStateColor = '#d62c2c';
        break;
      case '진행중':
        progressStateColor = '#f5c234';
        break;
      case '완료':
        progressStateColor = '#7ed321';
        break;
      default:
        progressStateColor = 'black';
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={styles.content}>
              <View>
                <Text style={styles.dateText}>{formatDate(createdAt)}</Text>
                <Text style={styles.title}>{doc.title}</Text>
                <Text style={styles.addressText}>
                  {location ? location.properties.name : 'KAIST'}
                </Text>
              </View>

              <Ionicons style={{ alignSelf: 'center' }} name="md-close" size={26} />
            </View>

            {confirmed ? (
              <ProgressCard author="안전팀" minHeight={0}>
                {JSON.parse(JSON.stringify(Progresses))[0].content}
              </ProgressCard>
            ) : (
              <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderStyle}>진행상황이 없습니다.</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        <View style={[styles.progressState, { backgroundColor: progressStateColor }]}>
          <Text style={styles.progressText}>{state}</Text>
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
    elevation: 10,
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
  progressState: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  progressText: { fontSize: 13, fontWeight: 'bold', color: 'white' },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  placeholderStyle: { color: '#d0d0d0', fontSize: 13, textAlign: 'center' },
});
