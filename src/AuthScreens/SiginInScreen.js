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
import AuthContextWrapper from '../Utils/Context';

function SignInScreen({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { signIn } = React.useContext(AuthContextWrapper);

  const handleSignIn = () => {
    console.log('Sigining user In');
    console.log('username:', username);
    console.log('pwd:', password);
    signIn();
    setUsername('');
    setPassword('');
  };

  return (
    <View>
      <Text>Sign In!!!</Text>
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
      <Button title="Sign in" onPress={handleSignIn} />
      <Button
        title="Forgot Password?"
        onPress={() => navigation.push('ResetPassword')}
      />
    </View>
  );
}

export default SignInScreen;
