import React from 'react'
import { Card } from 'semantic-ui-react'
import { NewsType } from '../../store/actions/news'

const NewsCard: React.FC<NewsType> = ({ title, text }): React.ReactElement => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Card.Description>
                    {text}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default NewsCard
