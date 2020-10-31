import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ref = firestore().collection('interactions');

export const createInteraction = () => {
  auth().onAuthStateChanged(userFirebase => {
    if (userFirebase) {
      console.log('user id', userFirebase.uid);

      const newInteraction = {
        // userID: userFirebase.uid,
        userID: userFirebase.uid,
        photoID:
          'https://www.coats.com/-/media/Coats/End-Use/Household-and-Recreation/Kites/Household-and-recreation---sporting-goods--kite-01.jpg?rev=0ba06cc34a384b8aa9bf5afcb85472f7&width=600&height=338&op=crop',
        firstClick_Coordinates: {
          x: 234,
          y: 435,
        },
        secondClick_Coordinates: {
          x: 123,
          y: 543,
        },
        reactionTime: 5.5,
      };

      ref
        .add(newInteraction)
        .then(() => {
          console.log('Test successful!');
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
          // .doc('LsnQkIw9pzY4JpUuYb7K')
          .where('userID', '==', userUIFirebase.uid)
          .get();
        const reactTimes = interactions._docs.map(
          document => document._data.reactionTime,
        );
        console.log(reactTimes);
      }
    } catch (e) {
      console.log('error', e);
    }
  });
};
