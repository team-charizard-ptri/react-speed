import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useReducer, useMemo, useEffect } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// Navagation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';

// import Ionicons from 'react-native-vector-icons/Ionicons';

//Components
import ReactSpeed from './ReactSpeed/ReactSpeed';
import SignInScreen from './AuthScreens/SiginInScreen';
import SignUpScreen from './AuthScreens/SignUpScreen';
import ResetPasswordScreen from './AuthScreens/ResetPasswordScreen';
import AuthIntro from './AuthScreens/AuthIntro';
import authReducer from './Utils/AuthReducer';
import AuthContextWrapper from './Utils/Context';

const Stack = createStackNavigator();

const App = () => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: false, // should be ture
    isSignout: false,
    userToken: 'null',
  });

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    [],
  );

  if (state.isLoading) {
    // When we haven't finished checking for the token yet
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <AuthContextWrapper.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken == null ? (
            // No token found, user isn't signed in
            <React.Fragment>
              <Stack.Screen name="Welcome" component={AuthIntro} />
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  title: 'Sign In',
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                  title: 'Sign Up',
                }}
              />
              <Stack.Screen
                name="ResetPassword"
                component={ResetPasswordScreen}
              />
            </React.Fragment>
          ) : (
            // Something to consider for logout
            // When logging out, a pop animation feels intuitive
            // You can remove this if you want the default 'push' animation
            // animationTypeForReplace: state.isSignout ? 'pop' : 'push',
            // User is signed in
            <Stack.Screen name="App" component={ReactSpeed} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextWrapper.Provider>
  );
};

export default App;
