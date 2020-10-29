import React, {useState} from 'react';
import {
  // SafeAreaView,
  StyleSheet,
  // ScrollView,
  View,
  Text,
  TouchableWithoutFeedback,
  Button,
  // StatusBar,
  // FlatList,
  // Button,
} from 'react-native';


const Feed = ({ navigation }) => {
  const [loc, updateLoc] = useState({x: 0, y:0});
  const [startTime, updateStartTime] = useState(0);
  const [clickTime, updateClickTime] = useState(0);
  const [gameOn, updateGame] = useState(false);
  

  const locateTouch = ({nativeEvent}) => {
    // console.log('TouchEvent -> ', nativeEvent);
    console.log('LocX -> ', nativeEvent.locationX);
    console.log('LocY -> ', nativeEvent.locationY);
    const newLoc = { x:nativeEvent.locationX, y:nativeEvent.locationY };
    updateLoc(newLoc);
    updateClickTime(nativeEvent.timestamp);
    updateGame(false);

    console.log('Loc ->', loc);
    console.log('TimeStamp -> ', clickTime);
    const start = Math.floor(startTime / 1000);
    const end = Math.floor(nativeEvent.timestamp / 1000);
    console.log('Reaction Time -> ', end - start);
  }

  const startGame = () => {
    console.log('START TIME -> ', Date.now());
    updateGame(true);
  }
  return (
    <>
      {gameOn && <TouchableWithoutFeedback onPress={(pressEvent) => locateTouch(pressEvent)}>
        <View style={styles.main}>
        
          <Text>Feed</Text>
        
        </View>
      </TouchableWithoutFeedback>}
      {!gameOn && <Button title= "Go!" onPress={startGame}/>}
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