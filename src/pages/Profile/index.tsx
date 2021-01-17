import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Card, Grid, Header, Icon, Image, List, Loader, Segment } from 'semantic-ui-react'
import {ProfileLangItem, ProfileSocialItem} from '../../components/Profile'
import { UserStateType, UserStatusTypes } from '../../helpers/types'
import { ProfileStateType, UserProfileType, UserSocialType } from './types'



const Profile: React.FC = (): React.ReactElement => {
    const { status, id } = useSelector(({ User }: { User: UserStateType }) => User)
    const [user, setUser] = React.useState<ProfileStateType>({ status: 'NEVER', data: null })

    const getUser = React.useCallback((id: string | number) => {
        setUser(prev => ({ ...prev, status: 'LOADING' }))
        axios.get('https://mysterious-reef-29460.herokuapp.com/api/v1/user-info/' + id).then(({ data }) => {
            if (data.status === 'err') return setUser(prev => ({ ...prev, status: 'ERROR' }))
            const user: UserProfileType = data.data
            user.social = [...user.social.filter((o: UserSocialType) => o.label === 'web'), ...user.social.filter((o: UserSocialType) => o.label !== 'web')]
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
                                        {user.data?.languages.map((lang) => <ProfileLangItem key={lang} lang={lang} />)}
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <List>
                                        {user.data?.social.map((soc) => <ProfileSocialItem key={soc.label} {...soc}/>)}
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
