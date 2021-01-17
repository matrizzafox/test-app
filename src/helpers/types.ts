export type LoginFormStateType = {
    email: string,
    password: string
}

type ResponseErrType = {
    data: {
        status: 'err',
        message: string
    }
}

type ResponseSuccessType = {
    data: {
        status: 'ok'
    }
}

type AuthSuccessType = ResponseSuccessType & {
    data: {
        data: {
            id: number
        }
    }
}

export type AuthResponseTypes = ResponseErrType | AuthSuccessType

type SocialUserType = {
    label: string,
    link: string
}

export type UserType = {
    userId: number,
    city: string,
    languages: string[],
    social: SocialUserType[]
}

type UserSuccessType = ResponseSuccessType & {
    data: {
        data: UserType
    }
}

export type UserResponseType = ResponseErrType | UserSuccessType

export enum UserStatusTypes {
    AUTH='AUTH',
    UNAUTH='UNAUTH',
    LOADING='LOADING',
    NEVER='NEVER',
}

export type UserStateType = {
    status: UserStatusTypes,
    id: number | null,
    error: string | null
}