import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer'

const firebaseConfig = {
  apiKey: "AIzaSyBoZ5qhWv8_dX1zBR98OrRgCPJUf9iO6fE",
  authDomain: "reactclientpanel-b1032.firebaseapp.com",
  databaseURL: "https://reactclientpanel-b1032.firebaseio.com",
  projectId: "reactclientpanel-b1032",
  storageBucket: "reactclientpanel-b1032.appspot.com",
  messagingSenderId: "242727204491",
  appId: "1:242727204491:web:4c01163d99b6227b"
};

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const settings = {};
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);


// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer, // <- needed if using firestore
    notify: notifyReducer,
    settings: settingsReducer
  });

if ( localStorage.getItem('settings') == null ) {
  const defaultSettings = {
    disableBalanceOnAdd: true,
  disableBalanceOnEdit: false,
  allowRegistration: true
  };
  
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

const initialState = { settings: JSON.parse(localStorage.getItem('settings')) };

const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;