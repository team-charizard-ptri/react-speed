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
    <View style={[styles.main]}>
      <Text style={[styles.title]}>React Speed</Text>
      <Text style={[styles.copy]}>How fast can you find the object?</Text>
      <TouchableOpacity
        style={[styles.button, { marginTop: 20 }]}
        onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { marginTop: 20 }]}
        onPress={() => navigation.navigate('SignUp')}>
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
});

export default AuthIntro;
