import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Button,
} from 'react-native';

const Settings = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings</Text>
      <Button
        title="Go to Settings... again"
        onPress={() => navigation.push('Feed')}
      />
    </View>
  );
};

export default Settings;
