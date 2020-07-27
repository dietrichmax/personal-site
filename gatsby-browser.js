import 'lazysizes';
import CustomLayout from './wrapPageElement';
import firebase from 'gatsby-plugin-firebase';

require('prismjs/themes/prism-tomorrow.css');

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Performance Monitoring and get a reference to the service
const perf = firebase.performance();
const perf = firebase.database();





export const wrapPageElement = CustomLayout;
