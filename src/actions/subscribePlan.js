import * as actions from '../actions/actionTypes'
export const subscribePlan = (paymentInfo = null) => {
    return {
        type : actions.PUSH_PLAN,
        payload : paymentInfo
    }
}

