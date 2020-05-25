import React from 'react'
import { Card, Label, Modal, Button } from 'semantic-ui-react'
import SpendingForm from './SpendingForm'


export default ({ spendings, error }) => {


  if (error) return <h2>Error :(</h2>
  if (!spendings) return <h2>Loading...</h2>
  return <div>
    <Modal size="tiny" trigger={<Button className='spendings__btn--fixed' color='orange' icon='plus' circular size='big' />}>
      <Modal.Content>
        <Modal.Description>
          <SpendingForm />
        </Modal.Description>
      </Modal.Content>
    </Modal>
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
                <Modal trigger={<Button icon='edit' />}>
                  <Modal.Content >
                    <SpendingForm edit={spending} />
                  </Modal.Content>
                </Modal>
                <Button icon='trash' />
              </Button.Group>
            </Card.Content>
          </Card>
        </Card.Group>
      })
    }

  </div >
}