import React, {useContext} from 'react'
import firebase from 'firebase'
import { Card, Label, Modal, Button } from 'semantic-ui-react'
import SpendingForm from './SpendingForm'
import CardPlaceholder from '../Placeholders/CardPlaceholder'
import { MyContext } from '../auth/Auth';



export default ({ spendings, error }) => {

  const database = firebase.database()
  const user = useContext(MyContext)
  const uid = user.state.user.uid

  if (error) return <h2>Error :(</h2>
  if (!spendings) return <> <CardPlaceholder /><CardPlaceholder /><CardPlaceholder /><CardPlaceholder /> </>
  if (spendings.length === 0) return <>
    <SpendingForm />
    <h4>No spendings yet. Add one or two.</h4>
  </>
  return <>
    <SpendingForm />
    <Card.Group>
    {
      spendings.map(spending => {
        return           <Card fluid color='yellow' key={spending.id}>
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
              {spending.place && <Label attached='bottom left'>{spending.place.slice(0, 50)}</Label>}
              <Button.Group floated='right' basic compact>
                <SpendingForm edit={spending} />
                <Button icon='trash' onClick={() => database.ref(`users/${uid}/budget/spendings/${spending.id}`).remove()}  />
              </Button.Group>
            </Card.Content>
          </Card>
        
      })
    }
    </Card.Group>
  </>
}