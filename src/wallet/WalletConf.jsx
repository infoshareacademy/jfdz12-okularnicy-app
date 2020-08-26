import React, {useState, useContext } from 'react';
import { Form, Label, Button, Modal, Message, Icon, Segment } from 'semantic-ui-react';
import { Currency } from './currency';



export default ({wallet}) => {
    const [expand, setExpand] = useState(false)
    const [currency, setCurrency] = useState('')


    const handleCurrency = (currency, rate) => {
        setCurrency(currency)
    }

return <Segment compact basic floated='right'>
 
        {!expand
        ?<Button color='teal' circular icon='setting'  onClick={()=> setExpand(true)}/>
        :<Form>
            <Form.Group unstackable inline>
         
            <Button color='green' icon='save' circular  onClick={()=> setExpand(false)}/> 
            <Form.Field inline>
                <Currency handleCurrency={handleCurrency} mainCurrency={wallet.mainCurrency} />
            </Form.Field>
            <Button color='red' icon='cancel'  circular  onClick={()=> setExpand(false)}/> 
            </Form.Group>

        </Form>}
        </Segment>
    }