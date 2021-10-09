import * as actions from './actionTypes'

// this exports the action that will be used to dispatch in
// our web app and reducers will take care of each action
// to manipulate the state
const logout = () => {  
    return {
        type : actions.LOGOUT
    }
}

export default logout
