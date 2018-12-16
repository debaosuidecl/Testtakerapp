
export const submitQuestion = (answers)=> {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        dispatch({type: 'SUBMIT_START'})
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid
    const {Name, Surname, Designation} = getState().firebase.profile
    firestore.collection('answers').doc(uid).set({
        ...answers,
        Name, Surname, Designation    })
    .then((res)=> {
        //dispatch(temporaryGiveCorrectAnswer(answers)); 
        dispatch({type: 'SUBMIT_SUCCESS', answers, redirectPath: `/thank-you-page/${uid}`})
        
    })
    .catch(err=> {
        dispatch({type: 'SUBMIT_FAIL', err})
    })
    }
}

export const updateRedirectPath= ()=> {
    return{
        type: 'UPDATE_REDIRECT_PATH',
        redirectPath: null
    }
}
export const setTimer = ()=> {
    return (dispatch, getState, {getFirebase, getFirestore})=> {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid
        firestore.collection('setusertimer').doc(uid).set({
            endDate: getState().firebase.profile.Designation ==="General Manager"? new Date().getTime()+60000000: new Date().getTime()+60000
        }).then(docs=> {
            console.log('successful timer set')
            dispatch({
                type:'SET_TIMER'
            })
        }).catch(err=> {
            console.log('timer continued')
        })
    }
}


export const verifySubmittedBefore= ()=> {
    return (dispatch, getState, {getFirebase, getFirestore})=> {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        firestore.collection('staff-scores').get()
            .then((snapshot)=> {
                snapshot.docs.forEach(doc=>{                  
                    if (doc.id === uid){
                        dispatch({
                            type: 'ALREADY_SUBMITTED',
                            alreadySubmittedId: `/thank-you-page/${doc.id}`
                        })
                    } else{

                        dispatch({
                            type: 'NOT_YET_SUBMITTED'
                        })
                    }
                })
            }).catch(err=> {
                console.log('did not find staff scores')
            })
    }
}

