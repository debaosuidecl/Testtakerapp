const initState = {
    answers: [],
    loading: false,
    err: null,
    redirectPath: null,
    percentage: ''
}

const reducer = (state=initState, action)=> {
    switch(action.type){
        case 'SET_TIMER':
            return {
                ...state,
                loading: false,
                err: null,
                redirectPath: null,
                percentage: null
            }
        case 'SUBMIT_START':
            return {
                ...state,
                loading: true,
                err: null,
                redirectPath: null,
                percentage: null
            }
        case 'SUBMIT_SUCCESS':
            return{
                ...state,
                answers: state.answers.concat(action.answers),
                loading: false,
                err: null,
                redirectPath: action.redirectPath,
                percentage: null
            }
        case 'SUBMIT_FAIL':
            return {
                ...state,
                loading: false,
                err: action.err,
                redirectPath: null,
                percentage: null
            }
        case 'UPDATE_REDIRECT_PATH':
            return {
                ...state,
                loading: false,
                err: null,
                redirectPath: null,
                percentage: null
            }
        case 'ALREADY_SUBMITTED':
            return{
                ...state,
                loading: false,
                err: null,
                redirectPath: action.alreadySubmittedId,
                percentage: null
                
            }
        case 'NOT_YET_SUBMITTED':
            return{
                ...state,
                loading: false,
                err: null,
                redirectPath: null,
                percentage: null
            }
        case 'SHOW_RESULT':
            return{
                ...state,
                loading: false,
                err: null,
                redirectPath: action.alreadySubmittedId,
                percentage: action.percentage
            }
        default: return state
    }
}

export default reducer