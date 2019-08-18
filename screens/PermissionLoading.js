import React from 'react'
import { View } from 'react-native'
import * as Permissions from 'expo-permissions'

export default class PermissionLoading extends React.Component {
  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION)

    if (status === 'granted') {
      this.props.navigation.navigate('AuthLoading')
    } else {
      this.props.navigation.navigate('Permission')
    }
  }

  render() {
    return <View />
  }
}
