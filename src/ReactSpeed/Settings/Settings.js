import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, View, Text, Button } from 'react-native';
//Components
import AuthContextWrapper from '../../Utils/Context';

const Settings = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const { signOut } = React.useContext(AuthContextWrapper);

  useEffect(() => {
    auth().onAuthStateChanged((userFirebase) => {
      if (userFirebase) {
        setUserEmail(userFirebase.email);
      }
    });
  }, []);

  return (
    <View style={styles.main}>
      <Text>Settings</Text>
      <Text>User Email: {userEmail}</Text>

      <Button title="Logout" onPress={() => signOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Settings;
