import React from 'react';
import { View } from 'react-native';
import { Permissions } from 'expo';
import { Spinner } from '../components/Spinner';

export default class PermissionLoading extends React.Component {
  async componentDidMount() {
    const { status: locationPermission } = await Permissions.getAsync(
      Permissions.LOCATION
    );

    const { status: phoneCallPermission } = await Permissions.getAsync(
      Permissions.CONTACTS
    );

    if (locationPermission === 'granted' && phoneCallPermission === 'granted') {
      this.props.navigation.navigate('Auth');
    } else {
      this.props.navigation.navigate('Permission');
    }
  }

  render() {
    return <View />;
    // return (
    //   <View style={{ flex: 1, backgroundColor: '#eaeaea' }}>
    //     <Spinner />
    //   </View>
    // );
  }
}
