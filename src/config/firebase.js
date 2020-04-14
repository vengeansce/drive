import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDtgqve4nPzv25HbBnQ-Q7r8Kxxj2muw1M',
  authDomain: 'drive-66aed.firebaseapp.com',
  databaseURL: 'https://drive-66aed.firebaseio.com',
  projectId: 'drive-66aed',
  storageBucket: 'drive-66aed.appspot.com',
  messagingSenderId: '137639506003',
  appId: '1:137639506003:web:6ca95400d3cc7b3e3e96a6',
  measurementId: 'G-X6SZGP1H4H',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

export { firebase };
export default db;
