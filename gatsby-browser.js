import 'lazysizes';
import CustomLayout from './wrapPageElement';
import 'firebase/database';
import "firebase/performance";
import firebase from 'gatsby-plugin-firebase';
require('prismjs/themes/prism-tomorrow.css');


firebase.performance()







export const wrapPageElement = CustomLayout;
