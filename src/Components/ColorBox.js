import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ColorBox = ({ colorName, hexCode }) => {
  const boxColor = {
    backgroundColor: hexCode,
  };
  return (
    <View style={[styles.container, boxColor]}>
      <Text style={styles.containerText}>
        {colorName}: {hexCode}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 30,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    // flex: 1, // make the component take up the whole height of the screen
    borderColor: 'black',
    borderWidth: 1,
  },
  containerText: {
    color: 'white',
  },
});

export default ColorBox;
