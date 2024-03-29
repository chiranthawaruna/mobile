import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Colors} from '../Colors';

import {NavigatorScreenParams} from '@react-navigation/native';
import {
  AuthenticationNavigator,
  AuthenticationStackParamList,
} from './Authentication';
import {useAuthentication} from '../context/Auth';
import {HomeNavigator, HomeStackParamList} from './Home';

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthenticationStackParamList>;
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
};

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const {isAuthenticated, loading} = useAuthentication();

  if (loading) {
    return <></>;
  }

  return (
    <RootStack.Navigator
      screenOptions={{
        presentation: 'card',
        headerShown: false,
        cardStyle: {backgroundColor: Colors.Primary.White},
        gestureEnabled: false,
      }}>
      {isAuthenticated ? (
        <RootStack.Screen name="HomeStack" component={HomeNavigator} />
      ) : (
        <RootStack.Screen
          name="AuthStack"
          component={AuthenticationNavigator}
        />
      )}
    </RootStack.Navigator>
  );
};
