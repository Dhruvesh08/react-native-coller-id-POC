import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  AppState,
  DeviceEventEmitter,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';

const Home = props => {
  useEffect(() => {
    console.log(AppState.currentState);
    requestPhoneReadPermission();
    requestPhoneReadCallLogPermission();

    DeviceEventEmitter.addListener('appInvoked', data => {
      const {number} = data;
      ToastAndroid.show(`Ringing ${number}`, ToastAndroid.SHORT);
      props.navigation.navigate('Modal', {number: number});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestPhoneReadPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        {
          title: 'Cool Photo App Phone Read Permission',
          message: ' your Phone Read ' + 'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Phone Read');
      } else {
        console.log('Phone Read permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestPhoneReadCallLogPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Cool Photo App Read Call Log Permission',
          message:
            ' your Phone Read Call Log ' + 'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Phone Read Call Log');
      } else {
        console.log('Phone Read Call Log permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <View>
      <Text>Home working</Text>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('Modal', {number: '1231231233'})
        }>
        <Text>Open Modal</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
