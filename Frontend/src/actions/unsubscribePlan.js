import * as actions from '../actions/actionTypes'
export const unsubscribePlan = () => {
    return {
        type : actions.REMOVE_PLAN,
        payload : null
    }
}