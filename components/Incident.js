import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { MapView } from 'expo';
import { formatDate } from '../utils';

const typeMap = {
  chem: {
    title: '화학물질사고',
    danger: true,
  },
  fire: {
    title: '불이야',
    danger: true,
  },
  conflagration: {
    title: '화재',
    danger: true,
  },
};

export default class Incident extends React.Component {
  render() {
    const { onPress, data } = this.props;

    const { type, lat, lng, createdAt } = data;

    const doc = typeMap[type];

    const indicatorColor = {
      backgroundColor: doc.danger ? Colors.dangerRed : Colors.cautionYellow,
    };

    return (
      <View style={styles.container}>
        <View style={[styles.indicator, indicatorColor]} />
        <TouchableOpacity style={styles.content} onPress={onPress}>
          <View>
            <Text style={styles.title}>{doc.title}</Text>
            <Text style={styles.addressText}>N1 김병호 김삼열 IT 융합센터</Text>
            <View style={{ flex: 1 }} />
            <Text style={styles.dateText}>{formatDate(createdAt)}</Text>
          </View>
          {/*<View style={styles.mapContainer}>*/}
          {/*<Text>Map ?Here</Text>*/}
          {/*</View>*/}
        </TouchableOpacity>
        <MapView
          style={styles.mapContainer}
          liteMode
          initialRegion={{
            latitude: Number(lat),
            longitude: Number(lng),
            latitudeDelta: 0.002522,
            longitudeDelta: 0.00121,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderBottomWidth: 1,
    borderColor: Colors.borderGrey,
  },
  indicator: { width: 5 },
  content: { flex: 1, flexDirection: 'row', padding: 12 },
  title: { fontWeight: '800', fontSize: 18 },
  addressText: { fontSize: 13 },
  dateText: { fontSize: 13, color: Colors.dateLightGrey },
  mapContainer: { width: 80, height: 120 },
});
