import { UserStateType, UserStatusTypes } from "../../helpers/types";
import { UserActions, UserActionTypes } from "../actions/user";

const initialState = {
    status: UserStatusTypes.NEVER,
    id: null,
    error: null
}

const user = (state: UserStateType = initialState, action: UserActionTypes): UserStateType => {
    switch (action.type) {
        case UserActions.SET_USER_AUTH:
            return {...state, status: UserStatusTypes.AUTH, id: action.payload}
        case UserActions.SET_USER_LOADING:
            return {...initialState, status: UserStatusTypes.LOADING}
        case UserActions.SET_USER_ERROR:
            return {...state, status: UserStatusTypes.UNAUTH, error: action.payload}
        case UserActions.SET_USER_UNAUTH:
            return {...initialState, status: UserStatusTypes.UNAUTH}
        default:
            return state
    }
}

export default user