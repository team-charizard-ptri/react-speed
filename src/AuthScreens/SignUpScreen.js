import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
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
    <View style={styles.main}>
      <Text style={styles.title}>Join the party!</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={[styles.input, { marginTop: 20 }]}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input, { marginTop: 5 }]}
      />
      <TouchableOpacity
        style={[styles.button, { marginTop: 20 }]}
        onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    overflow: 'visible',
    zIndex: 1,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#1DB954',
    borderWidth: 2,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingLeft: 20,
    // paddingRight: 20,
    // paddingTop: 10,
    // paddingBottom: 10,
    width: 200,
    height: 50,
    color: 'white',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'ChalkboardSE-Regular',
    fontSize: 20,
    paddingBottom: 5,
  },
  title: {
    fontFamily: 'Chalkduster',
    fontSize: 45,
  },
  copy: {
    fontFamily: 'ChalkboardSE-Regular',
    fontSize: 20,
    marginTop: 10,
  },
  forgot: {
    fontFamily: 'ChalkboardSE-Regular',
    fontSize: 12,
    color: 'blue',
  },
  input: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#DFDFDF',
    width: 200,
    height: 25,
    paddingLeft: 5,
  },
});

export default SignUpScreen;
