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

