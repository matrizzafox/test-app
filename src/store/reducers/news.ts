import { NewsActions, NewsActionTypes, NewsType } from "../actions/news"

enum NewsStatusTypes  {
    NEVER = 'NEVER',
    LOADING = 'LOADING',
    LOADED = 'LOADED',
    ERROR = 'ERROR'
}

export type NewsStateType = {
    status: NewsStatusTypes,
    data: NewsType[] | null,
    error: string | null
}

const initialState = {
    status: NewsStatusTypes.NEVER,
    data: null,
    error: null
}

const user = (state: NewsStateType = initialState, action: NewsActionTypes): NewsStateType => {
    switch (action.type) {
        case NewsActions.SET_NEWS:
            return {...state, status: NewsStatusTypes.LOADED, data: action.payload}
        case NewsActions.SET_LOADING:
            return {...state, status: NewsStatusTypes.LOADING}
        case NewsActions.SET_ERROR:
            return {...state, status: NewsStatusTypes.ERROR, error: action.payload}
        default:
            return state
    }
}

export default user