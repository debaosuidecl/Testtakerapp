export const signin = (credentials)=> {
    return (dispatch, getState, {getFirebase}) => {
        dispatch({type: "LOGIN_ADMIN_START"})
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then((dets)=> {
            console.log('success')
            console.log(dets.user.uid)
            dispatch({
                type: "LOGIN_ADMIN_SUCCESS",
                userAdminLink: `/admin/${dets.user.uid}`
            })
        })
            .catch(err=> {
                dispatch({
                    type: "LOGIN_ADMIN_ERROR", err
                })
            })

    }
}


export const signOut = ()=> {
    return (dispatch, getState, {getFirebase})=> {
        const firebase = getFirebase()

        firebase.auth().signOut().then(()=> {
            console.log('signed out')
            dispatch({
                type: 'SIGN_OUT_ADMIN_SUCCESS'
            })
        })
            .catch(err=> {
                dispatch({
                    type: 'SIGN_OUT_ADMIN_FAIL',
                    err
                })
            })
    }
}

