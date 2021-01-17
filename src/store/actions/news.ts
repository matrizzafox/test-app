import axios from 'axios'
import { Dispatch } from 'redux'
import getErrorMsg from '../../helpers/errors'
import { NewsResponseTypes } from '../../helpers/types'

export enum NewsActions {
    SET_NEWS = 'news/SET_NEWS',
    SET_LOADING = 'news/SET_LOADING',
    SET_ERROR = 'news/SET_ERROR'
}

export type NewsType = {
    id: number,
    title: string,
    text: string
}

type SetNewsActionType = {
    type: NewsActions.SET_NEWS,
    payload: NewsType[]
}

type LoadingNewsType = {
    type: NewsActions.SET_LOADING
}

type ErrorNewsType = {
    type: NewsActions.SET_ERROR,
    payload: string
}

const setNews = (payload: NewsType[]): SetNewsActionType => ({
    type: NewsActions.SET_NEWS,
    payload
})

export const setNewsLoading = (): LoadingNewsType => ({
    type: NewsActions.SET_LOADING
})

export const setNewsError = (payload: string): ErrorNewsType => ({
    type: NewsActions.SET_ERROR,
    payload
})

export const fetchNews = () => (dispatch: Dispatch) => {
    axios.get('https://mysterious-reef-29460.herokuapp.com/api/v1/news').then(({ data }: NewsResponseTypes) => {
        if(data.status === 'err') return dispatch(setNewsError(getErrorMsg(data.message)))
        dispatch(setNews(data.data))
    }).catch((err: Error) => {
        if(err.message) dispatch(setNewsError(getErrorMsg(err.message)))
    })
}

export type NewsActionTypes = SetNewsActionType | LoadingNewsType | ErrorNewsType