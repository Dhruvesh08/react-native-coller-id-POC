/**
 * @format
 */
import React, {useState} from 'react';
import {AppRegistry, ToastAndroid} from 'react-native';
import invokeApp from 'react-native-invoke-app';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import App from './App';
import PushNotification from 'react-native-push-notification';
import {name as appName} from './app.json';
import BackgroundTimer from 'react-native-background-timer';

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

const Call = async data => {
  console.log('data checking ==> ', data);
  PushNotification.createChannel(
    {
      channelId: 'call_info',
      channelName: 'Call Information',
      channelDescription: 'Call',
    },
    () => {},
  );
  if (data.state === 'extra_state_ringing') {
    ToastAndroid.show('Ringing', ToastAndroid.SHORT);
    PushNotification.localNotification({
      channelId: 'call_info',
      title: 'Incoming call',
      message: `${data.number}`,
    });
    // invokeApp({data: {number: data.number}});
    console.log('Call Ringing');
  } else if (data.state === 'extra_state_offhook') {
    ToastAndroid.show('Call Started', ToastAndroid.SHORT);
    console.log('Call started');
  } else if (data.state === 'extra_state_idle') {
    ToastAndroid.show('Call Ended', ToastAndroid.SHORT);
    console.log('Call Ended');
  }
};

BackgroundTimer.runBackgroundTimer(() => {
  //AppRegistry.registerHeadlessTask('Call', () => Call);
}, 1000);
AppRegistry.registerHeadlessTask('Call', () => Call);
// ReactNativeForegroundService.register();
AppRegistry.registerComponent(appName, () => App);
