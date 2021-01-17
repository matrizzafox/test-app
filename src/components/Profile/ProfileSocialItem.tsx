import React from 'react'
import { List, Image } from 'semantic-ui-react'

type ProfileSocialItemPropsType = {
    label: string,
    link: string
}

const ProfileSocialItem: React.FC<ProfileSocialItemPropsType> = ({label, link}): React.ReactElement => {
    return (
        <List.Item>
            <Image avatar src={`/imgs/${label}.png`} />
            <List.Content>
                <List.Header as='a' href={link} target="__blank">{label}</List.Header>
                <List.Description>Найдите меня в {label}</List.Description>
            </List.Content>
        </List.Item>
    )
}

export default ProfileSocialItem
