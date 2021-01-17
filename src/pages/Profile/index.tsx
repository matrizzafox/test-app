import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Card, Dimmer, Grid, Header, Icon, Image, List, Loader, Segment } from 'semantic-ui-react'
import { UserStateType, UserStatusTypes } from '../../helpers/types'

type UserSocialType = {
    label: string,
    link: string
}

type UserType = {
    userId: number,
    city: string,
    languages: string[],
    social: UserSocialType[]
}

type ProfileStateType = {
    status: string,
    data: UserType | null
}

const Profile: React.FC = (): React.ReactElement => {
    const { status, id } = useSelector(({ User }: { User: UserStateType }) => User)
    const [user, setUser] = React.useState<ProfileStateType>({ status: 'NEVER', data: null })

    const getUser = React.useCallback((id: string | number) => {
        setUser(prev => ({ ...prev, status: 'LOADING' }))
        axios.get('https://mysterious-reef-29460.herokuapp.com/api/v1/user-info/' + id).then(({ data }) => {
            if (data.status === 'err') return setUser(prev => ({ ...prev, status: 'ERROR' }))
            const user: UserType = data.data
            setUser({ status: 'LOADED', data: user })
        }).catch((error: Error) => {
            setUser(prev => ({ ...prev, status: 'NET_ERROR' }))
        })
    }, [])

    React.useEffect(() => {
        if (user.status === 'NEVER') {
            if (status === UserStatusTypes.AUTH && id) getUser(id)
        }
    }, [getUser, status, id, user.status])

    if (status === UserStatusTypes.UNAUTH) return <Redirect to='/login' />
    switch (user.status) {
        case 'LOADING':
        case 'NEVER':
            return <Loader active size='massive' />
        case 'ERROR':
            return <Segment placeholder><Header icon><Icon name='dont' />Пользователь не найден...</Header></Segment>
        case 'NET_ERROR':
            return <Segment placeholder><Header icon><Icon name='server' />Сервер недоступен...</Header></Segment>
        default:
            break;
    }


    return (
        <Grid divided='vertically'>
            <Grid.Row>
                <Grid.Column width={5}>
                    <Card>
                        <Image src='/imgs/img.png' wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>USER #{user.data?.userId}</Card.Header>
                            <Card.Meta>
                                г. {user.data?.city}
                            </Card.Meta>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column width={11}>
                    <Segment>
                        <Header as='h1' textAlign='center' dividing>
                            <Header.Content>
                                User #{user.data?.userId}
                                <Header.Subheader>г. {user.data?.city}</Header.Subheader>
                            </Header.Content>
                        </Header>
                        <Grid divided='vertically'>
                            <Grid.Row>
                                <Grid.Column width={6} >
                                    <p>Знание языков</p>
                                    <List relaxed>
                                        {user.data && user.data.languages.map((lang) => (
                                            <List.Item key={lang}>
                                                <List.Icon name='language' size='large' verticalAlign='middle' />
                                                <List.Content>
                                                    <List.Header>{lang}</List.Header>
                                                </List.Content>
                                            </List.Item>
                                        ))}
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <List>
                                        {user.data && user.data.social.map((soc) => (
                                            <List.Item key={soc.label}>
                                                <Image avatar src={`/imgs/${soc.label}.png`} />
                                                <List.Content>
                                                    <List.Header as='a' href={soc.link} target="__blank">{soc.label}</List.Header>
                                                    <List.Description>Найдите меня в {soc.label}</List.Description>
                                                </List.Content>
                                            </List.Item>
                                        ))}
                                    </List>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Profile
