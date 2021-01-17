import axios from 'axios'
import { Dispatch } from 'redux'
import getErrorMsg from '../../helpers/errors'
import { AuthResponseTypes, LoginFormStateType } from '../../helpers/types'

export enum UserActions {
    SET_USER_AUTH = 'user/SET_AUTH',
    SET_USER_UNAUTH = 'user/SET_UNAUTH',
    SET_USER_ERROR = 'user/SET_ERROR',
    SET_USER_LOADING = 'user/SET_LOADING',
}

type setAuthUserType = {
    type: UserActions.SET_USER_AUTH,
    payload: number
}

type setUnauthUserType = {
    type: UserActions.SET_USER_UNAUTH
}

type setErrorUserType = {
    type: UserActions.SET_USER_ERROR,
    payload: string
}

type setLoadingUserType = {
    type: UserActions.SET_USER_LOADING
}

export type UserActionTypes = setAuthUserType | setUnauthUserType | setErrorUserType | setLoadingUserType

export const setAuthUser = (payload: number): setAuthUserType => ({
    type: UserActions.SET_USER_AUTH,
    payload
})

const setErrorUser = (payload: string): setErrorUserType => ({
    type: UserActions.SET_USER_ERROR,
    payload
})

export const setUnauthUser = (): setUnauthUserType => ({ type: UserActions.SET_USER_UNAUTH })

export const setLoadingUser = (): setLoadingUserType => ({ type: UserActions.SET_USER_LOADING })

export const fetchAuthUser = (datas: LoginFormStateType) => (dispatch: Dispatch) => {
    dispatch(setLoadingUser())
    axios.post('https://mysterious-reef-29460.herokuapp.com/api/v1/validate', datas)
        .then(({ data }: AuthResponseTypes) => {
            if (data.status === 'err') return dispatch(setErrorUser(getErrorMsg(data.message)))
            dispatch(setAuthUser(data.data.id))
            localStorage.setItem('user', JSON.stringify({id: data.data.id}))
        }).catch((errors: Error) => {
            if (errors.message) dispatch(setErrorUser(getErrorMsg(errors.message)))
        })
}