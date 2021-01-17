import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

import ProfileSide from './ProfileSide'

import './styles.css'

const Header: React.FC = (): React.ReactElement => {

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
                <ProfileSide />
            </Menu>
    )
}

export default Header
