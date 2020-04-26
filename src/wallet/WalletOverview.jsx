import React from 'react'
import { Header, Card, Button, Table, Icon } from 'semantic-ui-react'



export default ({ wallet }) => {

    return <>
        <Header content='Summary' />

        <Card fluid>
            <Card.Content>

                <Card.Header >Avaible budget: 983PLN <Button color='teal' circular icon='setting' size='mini' floated='right' /></Card.Header>
                <Card.Description content={`Total budget 3280PLN`} />

                <Table basic='very' celled fluid unstackable compact>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Currency</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>PLN</Table.Cell>
                            <Table.Cell>3286</Table.Cell>

                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>EUR</Table.Cell>
                            <Table.Cell>317</Table.Cell>

                        </Table.Row>
                    </Table.Body>
                </Table>
                <Button
                    floated='right'
                    icon
                    labelPosition='left'
                    primary
                    size='small'
                >
                    <Icon name='plus' /> Add money
                               </Button>

            </Card.Content>
        </Card>
    </>
}