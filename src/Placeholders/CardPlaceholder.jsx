import React from 'react'
import { Grid, Placeholder, Segment } from 'semantic-ui-react'

const CardPlaceholder = ({ number }) => (
    <Segment raised>
        <Placeholder>
            <Placeholder.Header>
                <Placeholder.Line />
                <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
                <Placeholder.Line length='medium' />
                <Placeholder.Line length='short' />
            </Placeholder.Paragraph>
        </Placeholder>
    </Segment>
)

export default CardPlaceholder