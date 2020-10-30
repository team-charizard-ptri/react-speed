import React, { useState, useCallback, useEffect } from 'react';
import {
  // SafeAreaView,
  StyleSheet,
  // ScrollView,
  View,
  // Text,
  // StatusBar,
  // FlatList,
  Button,
  // Image,
  // ImageBackground,
  Dimensions,
} from 'react-native';
import Svg, { Line } from 'react-native-svg';
import DragRectangle from '../../Utils/dragRectangle';
import FastImage from 'react-native-fast-image';
import { FIREBASE_IMAGES } from '@env';

const screenWidth = Math.round(Dimensions.get('window').width);

const Feed = ({ navigation }) => {
  const [dragRectangle, updateRectangle] = useState();
  // eslint-disable-next-line no-unused-vars
  const [startTime, updateStartTime] = useState(0);
  const [clickTime, updateClickTime] = useState(0);
  const [gameOn, updateGame] = useState(false);
  const [madeGuess, updateGuess] = useState(false);
  const [imageURLArray, setImageURLArray] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageHeight, setCurrentImageHeight] = useState();

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex(prevIndex => prevIndex + 1);
  }, []);

  const locateRelease = ({ nativeEvent }) => {
    updateClickTime(nativeEvent.timestamp);
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
    updateGuess(true);
  };

  const locateClickStart = ({ nativeEvent }) => {
    const rectangle = new DragRectangle();
    rectangle.setPoint(nativeEvent.locationX, nativeEvent.locationY);
    updateRectangle(rectangle);
    console.log('Start Rectangle P1 -> ', rectangle.p1);
  };

  const startGame = () => {
    console.log('START TIME -> ', Date.now());
    const rectangle = new DragRectangle();
    updateRectangle(rectangle);
    updateGame(true);
    handleNextImage();
  };

  const endGame = () => {
    updateGame(false);
    updateGuess(false);
  };

  const drawRectangle = () => {
    if (!dragRectangle.isFull) {
      return;
    }
    const { p1, p2, p3, p4 } = dragRectangle;
    return (
      <Svg height={currentImageHeight} width={screenWidth}>
        <Line
          x1={p1.xCoord}
          y1={p1.yCoord}
          x2={p3.xCoord}
          y2={p3.yCoord}
          stroke="red"
          strokeWidth="2"
        />
        <Line
          x1={p1.xCoord}
          y1={p1.yCoord}
          x2={p4.xCoord}
          y2={p4.yCoord}
          stroke="red"
          strokeWidth="2"
        />
        <Line
          x1={p2.xCoord}
          y1={p2.yCoord}
          x2={p3.xCoord}
          y2={p3.yCoord}
          stroke="red"
          strokeWidth="2"
        />
        <Line
          x1={p2.xCoord}
          y1={p2.yCoord}
          x2={p4.xCoord}
          y2={p4.yCoord}
          stroke="red"
          strokeWidth="2"
        />
      </Svg>
    );
  };

  const fetchImages = useCallback(async () => {
    const url = FIREBASE_IMAGES;
    // Get result to firebase function
    const result = await fetch(url);

    if (result.ok) {
      const images = await result.json();
      console.log('images', images);
      return images;
    }
  }, []);

  // On Feed mount, call the first set of images
  useEffect(() => {
    fetchImages().then(data => setImageURLArray(data));
  }, [fetchImages]);

  // Once user has gone thru frist set of images, call the next set
  useEffect(() => {
    console.log('currentImageIndex', currentImageIndex);
    if (currentImageIndex === imageURLArray.length - 2) {
      fetchImages().then(data =>
        setImageURLArray(prevState => [...prevState, ...data]),
      );
    }
  }, [currentImageIndex, imageURLArray, fetchImages]);

  return (
    <>
      {madeGuess && (
        <View>
          <Button title="Next!" color="blue" onPress={startGame} />
          <Button title="Finish!" color="blue" onPress={endGame} />
        </View>
      )}
      {gameOn && (
        <View
          style={styles.main}
          onStartShouldSetResponder={() => true}
          onResponderGrant={event => locateClickStart(event)}
          onResponderRelease={event => locateRelease(event)}>
          <FastImage
            style={{ width: screenWidth, height: currentImageHeight }}
            source={{
              uri: imageURLArray[currentImageIndex],
            }}
            onLoad={evt => {
              // used to fit the picture into the screen
              const imageHeight =
                (evt.nativeEvent.height / evt.nativeEvent.width) * screenWidth;
              setCurrentImageHeight(imageHeight);
              console.log('onLoad');
            }}>
            {madeGuess && (
              <View style={styles.rectangle}>{drawRectangle()}</View>
            )}
          </FastImage>
        </View>
      )}
      {!gameOn && <Button title="Go!" color="blue" onPress={startGame} />}
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    overflow: 'visible',
    zIndex: 1,
  },
  button: {
    backgroundColor: 'green',
  },

  buttonView: {
    zIndex: 0,
  },

  rectangle: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    overflow: 'visible',
    zIndex: 4,
  },
});

export default Feed;
