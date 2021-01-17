import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Header, Icon, Label, Loader, Segment } from 'semantic-ui-react'
import NewsCard from '../../components/News/NewsCard'
import { fetchNews } from '../../store/actions/news'
import { NewsStateType } from '../../store/reducers/news'

const News: React.FC = (): React.ReactElement => {

    const dispatch = useDispatch()
    const { data, status, error } = useSelector(({ News }: { News: NewsStateType }) => News)

    React.useEffect(() => {
        if (status === 'NEVER') {
            dispatch(fetchNews())
        }
    }, [dispatch, status])

    switch (status) {
        case 'NEVER':
        case 'LOADING':
            return <Loader active size='massive' />
        case 'ERROR':
            return <Segment placeholder><Header icon><Icon name='dont' />{error}</Header></Segment>
        default:
            break;
    }


    return (
        <>
            <Card.Group> {data?.map((i) =>  <NewsCard key={i.id} {...i} /> )} </Card.Group><br />

            <Label tag > Всего новостей: {data?.length} </Label>
        </>
    )
}

export default News
