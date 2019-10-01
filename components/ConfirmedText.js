import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const ConfirmedText = ({ children, fontWeight }) => {
  const { container, textStyle } = styles
  return (
    <View style={container}>
      <Ionicons
        name={'ios-checkmark-circle'}
        size={13}
        style={{ color: '#84c571' }}
      />
      <View style={{ width: 4 }} />
      <Text style={[textStyle, { fontWeight }]}>{children}</Text>
    </View>
  )
}

const styles = {
  container: { flexDirection: 'row', alignItems: 'center' },
  textStyle: { fontSize: 13, color: '#84c571' },
}

export default ConfirmedText
