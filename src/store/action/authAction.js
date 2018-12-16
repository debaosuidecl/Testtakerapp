export const signin = (credentials)=> {
    return (dispatch, getState, {getFirebase}) => {
        dispatch({type: "LOGIN_START"})
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then((dets)=> {
            console.log('success',dets.user.uid)
            dispatch({
                type: "LOGIN_SUCCESS",
            })
        })
            .catch(err=> {
                dispatch({
                    type: "LOGIN_ERROR", err
                })
            })

    }
}


export const signOut = ()=> {
    return (dispatch, getState, {getFirebase})=> {
        const firebase = getFirebase()

        firebase.auth().signOut().then(()=> {
            dispatch({
                type: 'SIGN_OUT_SUCCESS'
            })
            
        })
            .catch(err=> {
                dispatch({
                    type: 'SIGN_OUT_FAIL',
                    err
                })
            })
    }
}

export const signup = (newUser)=> {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
            const firebase = getFirebase()
            const firestore= getFirestore()
            
            firebase.auth().createUserWithEmailAndPassword(
                newUser.email, newUser.password
            ).then((res)=> {
                console.log(res.user.uid);
                return firestore.collection('users').doc(res.user.uid).set({
                    Name: newUser.firstName,
                    Surname: newUser.lastName,
                    Initials: newUser.firstName[0]+ newUser.lastName[0],
                    Designation: newUser.designation
                }).then(()=> {
                    dispatch({
                        type: "SIGNUP_SUCCESS"
                    })
                })
            }).catch(err=> {
                dispatch({
                    type: "SIGNUP_ERROR",
                    err: err
                })
            })
    }
}

