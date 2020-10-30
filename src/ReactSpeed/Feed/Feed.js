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
import FastImage from 'react-native-fast-image';

const screenWidth = Math.round(Dimensions.get('window').width);

const Feed = ({ navigation }) => {
  const [imageURLArray, setImageURLArray] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageHeight, setCurrentImageHeight] = useState();

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => prevIndex + 1);
  }, []);

  const fetchImages = useCallback(async () => {
    const url = 'ENDPOINT GOES HERE';
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
    fetchImages().then((data) => setImageURLArray(data));
  }, [fetchImages]);

  // Once user has gone thru frist set of images, call the next set
  useEffect(() => {
    console.log('currentImageIndex', currentImageIndex);
    if (currentImageIndex === imageURLArray.length - 2) {
      fetchImages().then((data) =>
        setImageURLArray((prevState) => [...prevState, ...data]),
      );
    }
  }, [currentImageIndex, imageURLArray, fetchImages]);

  return (
    <View style={styles.main}>
      <Button title="Press me" color="blue" onPress={handleNextImage} />
      <FastImage
        style={{ width: screenWidth, height: currentImageHeight }}
        source={{
          uri: imageURLArray[currentImageIndex],
        }}
        onLoad={(evt) => {
          // used to fit the picture into the screen
          const imageHeight =
            (evt.nativeEvent.height / evt.nativeEvent.width) * screenWidth;
          setCurrentImageHeight(imageHeight);
          console.log('onLoad');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  button: {
    backgroundColor: 'green',
  },
});

export default Feed;
