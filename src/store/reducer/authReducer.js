const initState = {
    authError: null,
    loading: false
}

const reducer = (state=initState, action)=> {
    switch(action.type){
        case 'LOGIN_START':
            return{
                ...state,
                loading: true,
                authError: null,
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authError: null,
                loading: false,
            }
        case 'LOGIN_ERROR':
            return{
                ...state,
                authError: action.err,
                loading: false,
            }
        case 'SIGN_OUT_SUCCESS':
            return{
                ...state,
                authError: null,
                loading: false,
            }
        case 'SIGN_OUT_FAIL':
            return{
                ...state,
                loading: false,
                authError: 'Cannot Sign Out at the moment'
            }
        default:
            return state
    }
}

export default reducer