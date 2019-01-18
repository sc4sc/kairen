import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { MapView } from 'expo';

export default class Incident extends React.Component {
  render() {
    const indicatorColor = {
      backgroundColor:
        Math.random() > 0.5 ? Colors.dangerRed : Colors.cautionYellow,
    };

    const { onPress } = this.props;

    return (
      <View style={styles.container}>
        <View style={[styles.indicator, indicatorColor]} />
        <TouchableOpacity style={styles.content} onPress={onPress}>
          <View>
            <Text style={styles.title}>Conflagration</Text>
            <Text style={styles.addressText}>Yuseong 291, Daejeon</Text>
            <View style={{ flex: 1 }} />
            <Text style={styles.dateText}>Jan 14, 2019</Text>
          </View>
          {/*<View style={styles.mapContainer}>*/}
          {/*<Text>Map ?Here</Text>*/}
          {/*</View>*/}
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <MapView
          style={styles.mapContainer}
          liteMode
          initialRegion={{
            latitude: 36.374159,
            longitude: 127.365864,
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
    borderColor: Colors.borderGrey 
  },
  indicator: { width: 5 },
  content: { flex: 1, flexDirection: 'row', padding: 12 },
  title: { fontWeight: '800', fontSize: 18 },
  addressText: { fontSize: 13 },
  dateText: { fontSize: 13, color: Colors.dateLightGrey },
  mapContainer: { width: 80, height: 120 },
});
