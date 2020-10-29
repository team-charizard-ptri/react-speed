import React, { useState, useCallback } from 'react';
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
  const [
    imageURLArray,
    // setImageURLArray
  ] = useState([
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRFOljBq8BTj5GxrXVDM1jCP_Ug-6d-hLNPpg&usqp=CAU',
    'https://unsplash.it/400/400?image=1',
    'https://media.npr.org/assets/img/2019/01/02/gettyimages-1058306908-0b38ff8a90d7bf88fea3133d8b72498665f63e12.jpg',
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageHeight, setCurrentImageHeight] = useState();

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => prevIndex + 1);
  }, []);

  /* const fetchImages = useCallback(async () => {
    const url =
      'https://us-central1-react-speed-7d09f.cloudfunctions.net/helloWorldrs';
    // Get result to firebase function
    const result = await fetch(url);

    if (result.ok) {
      const images = await result.json();
      setImageURLArray(images);
    }
  }, []); */

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
