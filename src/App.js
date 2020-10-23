import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
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
// import Ionicons from 'react-native-vector-icons/Ionicons';

//Components
import ReactSpeed from './ReactSpeed/ReactSpeed';
import SignInScreen from './AuthScreens/SiginInScreen';
import SignUpScreen from './AuthScreens/SignUpScreen';
import ResetPasswordScreen from './AuthScreens/ResetPasswordScreen';
import AuthIntro from './AuthScreens/AuthIntro';

const Stack = createStackNavigator();

const App = () => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignout, setSignout] = useState(false);

  if (isLoading) {
    // When we haven't finished checking for the token yet
    return <View />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken == null ? (
          // No token found, user isn't signed in
          // <Stack.Screen
          //   name="AuthApp"
          //   component={AuthApp}
          //   options={{
          //     title: 'Who Are You?',
          //     // When logging out, a pop animation feels intuitive
          //     // You can remove this if you want the default 'push' animation
          //     // animationTypeForReplace: state.isSignout ? 'pop' : 'push',
          //   }}
          // />
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
          // User is signed in
          <Stack.Screen name="App" component={ReactSpeed} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
