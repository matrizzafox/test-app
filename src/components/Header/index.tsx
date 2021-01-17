import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Menu, Button } from 'semantic-ui-react'
import { UserStateType, UserStatusTypes } from '../../helpers/types'

import './styles.css'
import { setUnauthUser } from '../../store/actions/user'

const Header: React.FC = (): React.ReactElement => {
    const dispatch = useDispatch()
    const { status } = useSelector(({ User }: { User: UserStateType }) => User)

    const handleLogout = (): void => {
        dispatch(setUnauthUser())
        localStorage.removeItem('user')
    }

    return (
            <Menu stackable className="top-header">
                <Menu.Item>
                    <img src='/logo.png' alt="LOGO" />
                </Menu.Item>
                <Menu.Item as={NavLink} to="/" exact>
                    Главная
                </Menu.Item>
                <Menu.Item as={NavLink} to="/news">
                    Новости
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        {status === UserStatusTypes.UNAUTH 
                        ? <Button primary as={Link} to='/login'>Войти</Button>
                        : <Button primary onClick={handleLogout}>Выйти</Button>}
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
    )
}

export default Header
