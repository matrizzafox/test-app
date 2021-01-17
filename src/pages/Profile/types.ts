export type UserSocialType = {
    label: string,
    link: string
}

export type UserProfileType = {
    userId: number,
    city: string,
    languages: string[],
    social: UserSocialType[]
}

export type ProfileStateType = {
    status: string,
    data: UserProfileType | null
}