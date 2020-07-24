// ViewCounter.js
import React, { useEffect, useState } from 'react';
import firebase from 'gatsby-plugin-firebase';
import incrementViews from '../../../lib/increment-views.js';
import useTranslations from '../../useTranslations';

const ViewCounter = ({ id, increment }) => {
  const [viewCount, setViewCount] = useState('');

  
  const { views } = useTranslations();

  useEffect(() => {
    // 1 is displayed for a split second and then the correct count
    // This is a workaround
    const onViews = (newViews) => {
      setViewCount(newViews.val() === 1 ? 0 : newViews.val());
    };

    increment ? incrementViews(id) : null;
    

    firebase.database().ref(`/views`).child(id).on(`value`, onViews);

    return () => {
      if (firebase.database()) {
        firebase.database().ref(`/views`).child(id).off(`value`, onViews);
      }
    };
  }, [id]);

  return (
    <>
      {viewCount ? viewCount : `---`} {views}
    </>
  );
};

export default ViewCounter;
