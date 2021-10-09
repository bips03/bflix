import * as actions from '../actions/actionTypes'

const paymentReducer = (state = null, action) => {
    switch(action.type){
        case actions.PUSH_PLAN : return action.payload
        case actions.REMOVE_PLAN : return null
        default : return state

    }
}

export default paymentReducer