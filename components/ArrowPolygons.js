import React from 'react'
import { View } from 'react-native'
import Layout from '../constants/Layout'

const ChevronLeft = ({ children, color }) => (
  <View style={styles.chevronLeft}>
    <View style={[styles.chevronMainLeft, { backgroundColor: color }]}>
      {children}
    </View>
    <View
      style={[
        styles.chevronTriangle,
        styles.chevronTopRight,
        { borderLeftColor: color },
      ]}
    />
    <View
      style={[
        styles.chevronTriangle,
        styles.chevronBottomRight,
        { borderLeftColor: color },
      ]}
    />
  </View>
)

const ChevronMiddle = ({ children, color }) => (
  <View style={styles.chevronMiddle}>
    <View style={[styles.chevronMain, { backgroundColor: color }]}>
      {children}
    </View>
    <View
      style={[
        styles.chevronTriangle,
        styles.chevronTopLeft,
        { borderLeftColor: color },
      ]}
    />
    <View
      style={[
        styles.chevronTriangle,
        styles.chevronTopRight,
        { borderLeftColor: color },
      ]}
    />
    <View
      style={[
        styles.chevronTriangle,
        styles.chevronBottomLeft,
        { borderLeftColor: color },
      ]}
    />
    <View
      style={[
        styles.chevronTriangle,
        styles.chevronBottomRight,
        { borderLeftColor: color },
      ]}
    />
  </View>
)

const ChevronRight = ({ children, color }) => (
  <View style={styles.chevronRight}>
    <View style={[styles.chevronMain, { backgroundColor: color }]}>
      {children}
    </View>
    <View
      style={[
        styles.chevronTriangle,
        styles.chevronTopLeft,
        { borderLeftColor: color },
      ]}
    />
    <View
      style={[
        styles.chevronTriangle,
        styles.chevronBottomLeft,
        { borderLeftColor: color },
      ]}
    />
  </View>
)

const arrowSize = 8

const styles = {
  chevronLeft: {
    width: (Layout.window.width / 3) + 5,
    height: 45,
    marginBottom: 0,
  },
  chevronMiddle: {
    width: Layout.window.width / 3,
    height: 45,
    marginBottom: 0,
  },
  chevronRight: {
    width: (Layout.window.width / 3) - 5,
    height: 45,
    marginBottom: 0,
  },
  chevronMain: {
    width: Layout.window.width / 3,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronMainLeft: {
    width: (Layout.window.width / 3) + 5,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronTriangle: {
    backgroundColor: 'transparent',
    borderTopWidth: 20,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: arrowSize,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
  },
  chevronTopLeft: {
    position: 'absolute',
    left: -arrowSize,
    transform: [{ scale: -1 }],
  },
  chevronTopRight: {
    position: 'absolute',
    right: -arrowSize,
  },
  chevronBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: -arrowSize,
    transform: [{ scaleX: -1 }],
  },
  chevronBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: -arrowSize,
    transform: [{ scaleY: -1 }],
  },
}

export { ChevronLeft, ChevronMiddle, ChevronRight }
