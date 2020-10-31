import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ref = firestore().collection('interactions');

export const createInteraction = ({
  photoID,
  firstClick_Coordinates,
  secondClick_Coordinates,
  reactionTime,
}) => {
  auth().onAuthStateChanged(userFirebase => {
    if (userFirebase) {
      console.log('user id', userFirebase.uid);

      const newInteraction = {
        // userID: userFirebase.uid,
        userID: userFirebase.uid,
        photoID: photoID,
        firstClick_Coordinates: firstClick_Coordinates,
        secondClick_Coordinates: secondClick_Coordinates,
        reactionTime: reactionTime,
      };

      ref
        .add(newInteraction)
        .then(() => {
          // console.log('Success sending this:', newInteraction);
        })
        .catch(err => console.log('error in add test', err));
    }
  });
};

export const getReactionTimesForUser = () => {
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
        // console.log(reactTimes);
      }
    } catch (e) {
      console.log('error', e);
    }
  });
};
