import React, { useEffect, useState } from 'react'
import { Card, Label, Divider, Button } from 'semantic-ui-react'
import axios from 'axios'


export default () => {
  const [spendings, setSpendings] = useState([])
  const [loading, setloading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    getSpendings()
  }, [])

  const getSpendings = async () => {
    try {
      setloading(true)
      const { data } = await axios.get('/wallet.json')
      setSpendings(data.spendings)
      setloading(false)
    }
    catch (error) {
      setError(error);
      setloading(false)
    }


  }


  if (loading) return <h2>Loading...</h2>
  else if (error) return <h2> error :( </h2>
  return <div>
    <Button className='spendings__btn--fixed' color='orange' icon='plus' circular size='big' />
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
              <Card.Description>
                {spending.desc}
              </Card.Description>
              <Label attached='bottom left'>{spending.place}</Label>
              <Button.Group floated='right' basic compact>
                <Button icon='edit' />
                <Button icon='trash' />
              </Button.Group>
            </Card.Content>
          </Card>
        </Card.Group>
      })
    }

  </div >
}