import React from 'react'
import { List } from 'semantic-ui-react'

type ProfileLangItemPropsType = {
    lang: string
}

const ProfileLangItem: React.FC<ProfileLangItemPropsType> = ({ lang }): React.ReactElement => {
    return (
        <List.Item>
            <List.Icon name='language' size='large' verticalAlign='middle' />
            <List.Content>
                <List.Header>{lang}</List.Header>
            </List.Content>
        </List.Item>
    )
}

export default ProfileLangItem
