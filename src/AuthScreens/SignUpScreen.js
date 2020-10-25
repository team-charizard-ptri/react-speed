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
import AuthContext from '../Utils/Context';

//Components

function SignUpScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { signUp } = React.useContext(AuthContext);

  const handleSignUp = () => {
    console.log('Signing user up');
    console.log('username:', username);
    console.log('pwd:', password);
    signUp({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <View>
      <Text>Sign Up!!!</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}

export default SignUpScreen;
