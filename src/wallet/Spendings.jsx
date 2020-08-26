import React, {useContext} from 'react'
import firebase from 'firebase'
import { Card, Label, Modal, Button, Segment } from 'semantic-ui-react'
import SpendingForm from './SpendingForm'
import CardPlaceholder from '../Placeholders/CardPlaceholder'
import { MyContext } from '../auth/Auth';


export default ({ spendings, loading, error, mainCurrency }) => {

  const database = firebase.database()
  const user = useContext(MyContext)
  const uid = user.state.user.uid

  if (error) return <h2>Error :(</h2>
  if (loading) return <> <CardPlaceholder /><CardPlaceholder /><CardPlaceholder /><CardPlaceholder /> </>
  if (spendings === null) return <>
    <SpendingForm  mainCurrency={mainCurrency} />
    <Segment raised>
    <h3>No spendings yet.</h3>
    <h4>Add some.</h4>
    </Segment>
  </>
  return <>
    <SpendingForm  mainCurrency={mainCurrency} />
    <Card.Group>
    {
      spendings.map(spending => {
        return           <Card fluid color='yellow' key={spending.id}>
            <Card.Content>
              <Card.Header textAlign='right'>
              
                 <Label  color='teal'>
                  {spending.type}
                  </Label>
                  {spending.place && <Label>{spending.place.slice(0, 50)}</Label>}
                  {` ${spending.amount} ${spending.currency}`}
              </Card.Header>
              <Card.Meta>{spending.date} {spending.hour}</Card.Meta>
              <Card.Description style={{ overflowWrap: 'break-word' }}>
                {spending.desc}
                <Button.Group floated='right' basic compact>
                <SpendingForm edit={spending} mainCurrency={mainCurrency} />
                <Button icon='trash' onClick={() => database.ref(`users/${uid}/budget/spendings/${spending.id}`).remove()} />
              </Button.Group>
              </Card.Description>
            </Card.Content>
          </Card>
        
      })
    }
    </Card.Group>
  </>
}