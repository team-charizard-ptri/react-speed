import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

//Components

function AuthIntro({ navigation }) {
  // const { signIn } = React.useContext(AuthContext);
  const signIn = () => console.log('Sigining In');

  return (
    <View>
      <Button title="Sign In" onPress={() => navigation.navigate('SignIn')} />
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
}

export default AuthIntro;
