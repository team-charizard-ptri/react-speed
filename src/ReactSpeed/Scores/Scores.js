import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



const Scores = ({ navigation }) => {

  const [userScore, setUserScore] = useState([])

useEffect(() => {
const getTimesForUser = () => {
  auth().onAuthStateChanged(async userUIFirebase => {
    try {
      if (userUIFirebase) {
        const interactions = await firestore()
          .collection('interactions')
          .where('userID', '==', userUIFirebase.uid)
          .get();
        const reactTimes = interactions._docs.map(
          document => document._data.reactionTime,
        );
        console.log("REACT TIMES=====", reactTimes);
        setUserScore(reactTimes)
      }
    } catch (e) {
      console.log('error', e);
    }
  });
};

getTimesForUser()
},[])

useEffect(() => {

  console.log("useEffect user scores===", userScore)
}, [userScore])



  return (
    <View style={styles.main}>
      <Text style={styles.title}>Scores</Text>


  {userScore.length !== undefined || userScore.length !== 0 ? userScore.map((score) => <Text style={styles.copy} key={score}> {score}</Text>): <Text> No Scores Yet</Text>}

    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Chalkduster',
    fontSize: 45,
  },
  copy: {
    fontFamily: 'ChalkboardSE-Regular',
    fontSize: 20,
    marginTop: 10,
  },
});

export default Scores;
