// increment-views.js
import firebase from 'gatsby-plugin-firebase';

const incrementViews = async (id) => {
  const ref = firebase.database().ref(`/views`).child(id);

  ref.transaction((currentViews) => {
    return currentViews + 1;
  });
};

export default incrementViews;
