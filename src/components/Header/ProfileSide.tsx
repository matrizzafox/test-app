import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Menu } from 'semantic-ui-react'

import { UserStateType, UserStatusTypes } from '../../helpers/types'
import { setUnauthUser } from '../../store/actions/user'

const ProfileSide: React.FC = (): React.ReactElement => {

    const dispatch = useDispatch()
    const { status } = useSelector(({ User }: { User: UserStateType }) => User)

    const handleLogout = (): void => {
        dispatch(setUnauthUser())
        localStorage.removeItem('user')
    }

    return (
        <Menu.Menu position='right'>
                {status === UserStatusTypes.UNAUTH
                    ? <Menu.Item><Button primary as={Link} to='/login'>Войти</Button></Menu.Item>
                    : <>
                    <Menu.Item as={NavLink} to='/profile' exact>Профиль</Menu.Item>
                    <Menu.Item><Button primary onClick={handleLogout}>Выйти</Button></Menu.Item></>}
        </Menu.Menu>
    )
}

export default ProfileSide
