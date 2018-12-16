
import authReducer from './authReducer'
import {combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'
import answerReducer from './questionsReducer'
import adminAuthReducer from './adminAuthReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    answers: answerReducer,
    adminAuth: adminAuthReducer

})

export default rootReducer