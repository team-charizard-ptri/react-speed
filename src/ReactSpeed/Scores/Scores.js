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

const Scores = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Scores</Text>
      <Button
        title="Go to Scores... again"
        onPress={() => navigation.push('Feed')}
      />
    </View>
  );
};

export default Scores;
