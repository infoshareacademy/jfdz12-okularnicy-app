import React from 'react'
import { Card, Label, Modal, Button } from 'semantic-ui-react'
import SpendingForm from './SpendingForm'
import CardPlaceholder from '../Placeholders/CardPlaceholder'

export default ({ spendings, error }) => {

  if (error) return <h2>Error :(</h2>
  if (!spendings) return <> <CardPlaceholder /><CardPlaceholder /><CardPlaceholder /><CardPlaceholder /> </>
  if (spendings.length === 0) return <>
    <SpendingForm />
    <h4>No spendings yet. Add one or two.</h4>
  </>
  return <>
    <SpendingForm />
    {
      spendings.map(spending => {
        return <Card.Group>
          <Card fluid color='yellow'>
            <Card.Content>
              <Card.Header>
                <Label color='orange'>
                  {`${spending.amount} ${spending.currency}`}
                </Label>
                <Label color='teal'>
                  {spending.type}
                  <Label.Detail>{spending.name}</Label.Detail></Label>

              </Card.Header>
              <Card.Meta>{spending.date} {spending.hour}</Card.Meta>
              <Card.Description style={{ overflowWrap: 'break-word' }}>
                {spending.desc}
              </Card.Description>
              <Label attached='bottom left'>{spending.place.slice(0, 50)}</Label>
              <Button.Group floated='right' basic compact>
                <SpendingForm edit={spending} />
                <Button icon='trash' />
              </Button.Group>
            </Card.Content>
          </Card>
        </Card.Group>
      })
    }
  </>
}