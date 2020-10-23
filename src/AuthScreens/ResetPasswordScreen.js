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

function ResetPasswordScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSendEmail = () => {
    console.log('Email Sent!');
    // navigate back to homepage
  };

  return (
    <View>
      <Text>ResetPasswordScreen</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title="Send Email" onPress={handleSendEmail} />
    </View>
  );
}

export default ResetPasswordScreen;
