import React from 'react';
import {
  // SafeAreaView,
  StyleSheet,
  // ScrollView,
  View,
  Text,
  // StatusBar,
  // FlatList,
  // Button,
} from 'react-native';

const Feed = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <Text>Feed</Text>
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

export default Feed;
