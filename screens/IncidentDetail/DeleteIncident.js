import React from 'react'
import { StyleSheet } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native'

const DeleteIncident = ({ onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>
        제보 삭제
      </Text>
    </TouchableOpacity>
    <Text style={styles.description}>
      본 제보는 훈련 모드에서 제보되었습니다. 실제 상황을 반영하지 않는 경우, 이
      제보를 삭제할 수 있습니다.
      <Text style={styles.descriptionBold}>
        삭제된 제보는 복구할 수 없습니다.
      </Text>
    </Text>
  </View>
);

export default DeleteIncident;

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#f2f2f2', marginTop: -30 },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#b32828',
        padding: 16,
    },
    buttonText: { fontSize: 21, fontWeight: 'bold', color: 'white' },
    description: { paddingTop: 10, fontSize: 13, color: '#898989' },
    descriptionBold: { fontWeight: 'bold', color: '#898989' }
});
