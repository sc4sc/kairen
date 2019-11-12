import React from 'react'
import { View, Text } from 'react-native'
import {
  ChevronLeft,
  ChevronMiddle,
  ChevronRight,
} from '../components/ArrowPolygons'

const StateMarker = ({ children, selected, position }) => {
  const { circleStyle } = styles

  let arrowColor = 'black'
  const Chevron = (() => {
    switch (position) {
      case 'left':
        return ChevronLeft
      case 'center':
        return ChevronMiddle
      case 'right':
        return ChevronRight
      default:
        arrowColor = styles.defaultMarkerStyle
    }
  })()
  const chevronTextStyle = {
    color: selected ? 'white' : '#cfcfcf',
    fontSize: 13,
  }

  switch (position) {
    case 'left':
      arrowColor = selected ? '#d62c2c' : 'white'
      break
    case 'center':
      arrowColor = selected ? '#f5c234' : '#f5f5f5'
      break
    case 'right':
      arrowColor = selected ? '#7ed321' : 'white'
      break
    default:
      arrowColor = styles.defaultMarkerStyle
  }

  return (
    <Chevron color={arrowColor}>
      <View
        style={[
          circleStyle,
          { backgroundColor: selected ? 'white' : '#cfcfcf' },
        ]}
      />
      <View style={{ width: 5 }} />
      <Text style={chevronTextStyle}> {children} </Text>
    </Chevron>
  )
}

const styles = {
  circleStyle: {
    width: 7,
    height: 7,
    borderRadius: 50,
  },
}

export default StateMarker
