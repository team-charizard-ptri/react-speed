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

const Feed = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Feed</Text>
      <Button
        title="Go to Feed... again"
        onPress={() => navigation.push('Feed')}
      />
    </View>
  );
};

export default Feed;
