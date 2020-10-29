import React, { useState } from 'react';
import {
  // SafeAreaView,
  StyleSheet,
  // ScrollView,
  View,
  Text,
  Button,
  // StatusBar,
  // FlatList,
  // Button,
} from 'react-native';
import DragRectangle from '../../Utils/dragRectangle';

const Feed = ({ navigation }) => {
  const [dragRectangle, updateRectangle] = useState();
  // eslint-disable-next-line no-unused-vars
  const [startTime, updateStartTime] = useState(0);
  const [clickTime, updateClickTime] = useState(0);
  const [gameOn, updateGame] = useState(false);

  const locateRelease = ({ nativeEvent }) => {

    updateClickTime(nativeEvent.timestamp);
    updateGame(false);
    dragRectangle.setPoint(nativeEvent.locationX, nativeEvent.locationY);
    dragRectangle.calcOppositeVerts();

    console.log('Rectanble Point 1 ->', dragRectangle.p1);
    console.log('Rectanble Point 2 ->', dragRectangle.p2);
    console.log('Rectanble Point 3 ->', dragRectangle.p3);
    console.log('Rectanble Point 4 ->', dragRectangle.p4);

    console.log('TimeStamp -> ', clickTime);
    const start = Math.floor(startTime / 1000);
    const end = Math.floor(nativeEvent.timestamp / 1000);
    console.log('Reaction Time -> ', end - start);
  };

  const locateClickStart = ({ nativeEvent }) => {
    const rectangle = new DragRectangle();
    rectangle.setPoint(nativeEvent.locationX, nativeEvent.locationY);
    updateRectangle(rectangle);
    console.log('Start Rectangle P1 -> ', rectangle.p1);
  };

  const startGame = () => {
    console.log('START TIME -> ', Date.now());
    updateGame(true);
  };
  return (
    <>
      {gameOn && (
        <View
          style={styles.main}
          onStartShouldSetResponder={() => true}
          onResponderGrant={(event) => locateClickStart(event)}
          onResponderRelease={(event) => locateRelease(event)}>
          <Text>Feed</Text>
        </View>
      )}
      {!gameOn && <Button title="Go!" onPress={startGame} />}
    </>
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
