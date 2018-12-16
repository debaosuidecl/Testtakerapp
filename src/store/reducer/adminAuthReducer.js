const initState = {
    authError: null,
    loading: false,
    userAdminLink: null
}

const reducer = (state=initState, action)=> {
    switch(action.type){
        case 'LOGIN_ADMIN_START':
            return{
                ...state,
                loading: true,
                authError: null,
                userAdminLink: null
            }
        case 'LOGIN_ADMIN_SUCCESS':
            return {
                ...state,
                authError: null,
                loading: false,
                userAdminLink: action.userAdminLink
            }
        case 'LOGIN_ADMIN_ERROR':
            return{
                ...state,
                authError: action.err,
                loading: false,
                userAdminLink: null
            }
        case 'SIGN_OUT_ADMIN_SUCCESS':
            return{
                ...state,
                authError: null,
                loading: false,
                userAdminLink: null
            }
        case 'SIGN_OUT_ADMIN_FAIL':
            return{
                ...state,
                loading: false,
                authError: 'Cannot Sign Out at the moment',
                userAdminLink: null
            }
        default:
            return state
    }
}

export default reducer