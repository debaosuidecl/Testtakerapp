import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import rootReducer from './store/reducer/rootReducer'
import {reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import fbConfig from './fbConfig/fbConfig'

const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reduxFirestore(fbConfig),
        reactReduxFirebase(fbConfig, {useFirestoreForProfile: true, userProfile:'users', attachAuthIsReady: true})
            )
    );



    store.firebaseAuthIsReady.then(()=>{
        ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
    
    })
//reduxFirestore and reactReduxFirebase is used to set the firebase config
//redux firestore handles our real time updates and stuff, while react-redux-firebase handles the authentication
//getFirebase and getFirestore is used to get what was set in the project; it calls a function


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
