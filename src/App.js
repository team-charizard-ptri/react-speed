import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useReducer, useMemo, useEffect } from 'react';

import { StyleSheet, View, Text } from 'react-native';

// Navagation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

// import Ionicons from 'react-native-vector-icons/Ionicons';

//Components
import ReactSpeed from './ReactSpeed/ReactSpeed';
import SignInScreen from './AuthScreens/SignInScreen';
import SignUpScreen from './AuthScreens/SignUpScreen';
import ResetPasswordScreen from './AuthScreens/ResetPasswordScreen';
import AuthIntro from './AuthScreens/AuthIntro';
import authReducer from './Utils/AuthReducer';
import AuthContextWrapper from './Utils/Context';

const Stack = createStackNavigator();

const App = () => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true, // should be ture
    isSignout: false,
    user: null,
  });

  useEffect(() => {
    const userFirebase = auth().currentUser;

    const dispatched = dispatch({
      type: 'IS_USER_SIGNED_IN',
      userFirebase: userFirebase,
    });

    //clean up function
    return dispatched;
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        try {
          await auth().signInWithEmailAndPassword(data.username, data.password);
          console.log('User successfully signed in');
          const userFirebase = auth().currentUser;
          dispatch({ type: 'SIGN_IN', userFirebase: userFirebase });
        } catch (error) {
          console.error(error);
        }
      },
      signOut: async () => {
        await dispatch({ type: 'SIGN_OUT' });
        auth().signOut();
        console.log('User signed out!');
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        auth()
          .createUserWithEmailAndPassword(data.username, data.password)
          .then(() => {
            console.log('User account created & signed in!');
          })
          .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }

            if (error.code === 'auth/weak-password') {
              console.log('That password is not secure');
            }

            console.error(error);
          });

        const userFirebase = auth().currentUser;
        dispatch({ type: 'SIGN_IN', userFirebase: userFirebase });
      },
    }),
    [],
  );

  if (state.isLoading) {
    // When we haven't finished checking for the token yet
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <AuthContextWrapper.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.user == null ? (
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
            // User is signed in
            <Stack.Screen
              name="App"
              component={ReactSpeed}
              options={{
                // When logging out, a pop animation feels intuitive
                // You can remove this if you want the default 'push' animation
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextWrapper.Provider>
  );
};

const styles = StyleSheet.create({
  loading: {
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    flex: 1, // make the component take up the whole height of the screen
    backgroundColor: 'pink',
  },
});

export default App;
