import React from 'react'
import { Header, Icon, Segment } from 'semantic-ui-react'

const NotFound: React.FC = (): React.ReactElement => {
    return (
        <Segment placeholder>
            <Header icon><Icon name='search' />
                Ошибка 404!<br />
                Запрашиваемая страница не найдена
            </Header>
        </Segment>
    )
}

export default NotFound
