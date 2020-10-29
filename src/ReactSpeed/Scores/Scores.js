import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  // Button,
} from 'react-native';

const Scores = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <Text>Scores</Text>
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

export default Scores;
