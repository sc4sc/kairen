import React from 'react';
import { View } from 'react-native';
import { MapView } from 'expo';

export default class IncidentDetail extends React.Component {
    render() {
        return <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 36.374159,
                    longitude: 127.365864,
                    latitudeDelta: 0.00522,
                    longitudeDelta: 0.00221,
                }}
            />
        </View>
    }
}