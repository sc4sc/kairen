import React from 'react'
import { View, Text } from 'react-native'
import {
  ChevronLeft,
  ChevronMiddle,
  ChevronRight,
} from '../components/ArrowPolygons'

const StateMarker = ({ children, selected, position }) => {
  const { markerTextStyle, circleStyle } = styles

  let arrowColor = 'black'
  let Chevron = ChevronMiddle
  const chevronTextStyle = {
    color: selected ? 'white' : '#eaeaea',
    fontSize: 13,
  }

  switch (position) {
    case 'left':
      arrowColor = selected ? '#d62c2c' : 'white'
      break
    case 'center':
      arrowColor = selected ? '#f5c234' : 'white'
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
          { backgroundColor: selected ? 'white' : '#eaeaea' },
        ]}
      />
      <View style={{ width: 5 }} />
      <Text style={chevronTextStyle}> {children} </Text>
    </Chevron>
  )
}

const styles = {
  circleStyle: {
    marginLeft: 5,
    width: 7,
    height: 7,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  markerTextStyle: {},
}

export default StateMarker
