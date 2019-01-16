import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export default class Incident extends React.Component {
  render() {
    const indicatorColor = {
      backgroundColor:
        Math.random() > 0.5 ? Colors.dangerRed : Colors.cautionYellow,
    };

    return (
      <View style={styles.container}>
        <View style={[styles.indicator, indicatorColor]} />
        <TouchableOpacity
          style={styles.content}
        >
          <View>
            <Text style={}>
              Conflagration
            </Text>
            <Text style={styles.addressText}>Yuseong 291, Daejeon</Text>
            <View style={{ flex: 1 }} />
            <Text style={styles.dateText}>Jan 14, 2019</Text>
          </View>
          <View style={{ flex: 1 }} />
          <View style={styles.mapContainer}>
            <Text>Map ?Here</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'stretch' },
  indicator: { width: 5 },
  content: { flex: 1, flexDirection: 'row', padding: 12 },
  title: { fontWeight: '800', fontSize: 20 },
  addressText: { fontSize: 16 },
  dateText: { fontSize: 14 },
  mapContainer: { height: 120 }
});
