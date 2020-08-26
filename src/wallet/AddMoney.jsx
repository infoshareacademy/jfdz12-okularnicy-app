import React, {useState, useContext, useEffect  } from 'react';
import { Form, Label, Button, Modal, Message, Icon } from 'semantic-ui-react';
import firebase from "firebase";

import { Currency } from './currency';


const AddMoney = ({wallet}) => {

    const [modalOpen, setModalOpen] = useState(false)
    const [success, setSuccess] = useState(false)
    const [amount, setAmount] = useState(0)
    const [currency, setCurrency] = useState('')
    const [rate, setRate] = useState(0)
    // const [errors, setErrors] = useState({currency: false})

    useEffect(() => {
        return () => clearTimeout (timeout)
    }, [])

    const timeout = () => setTimeout(() => {
        setSuccess(false)
        setModalOpen(false)}, 2000)

    const handleCurrency = (currency, rate) => {
        setCurrency(currency)
        setRate(rate)
    }

    const handleSubmit = () => {
            let data = {
            amount,
            currency
        }
        console.log("add", data);
        setSuccess(true)
        timeout()
        reset()
    }

    const reset = () => {
        setAmount(0)
        setCurrency('')
    }

   return <Modal  
            open={modalOpen}    
            onClose={() => setModalOpen(false)} 
            closeOnDimmerClick={false}
            size="tiny" 
            trigger={<Button
                        floated='right'
                        icon
                        labelPosition='left'
                        primary
                        size='small'
                        onClick={() => setModalOpen(true)}
                    >
                            <Icon name='plus' /> Add money
                   </Button>}>
               <Modal.Content>
                    <Modal.Description>
                        <Message color={success ? 'green': "grey"}>
                            <Message.Header>
                                Add money
                            </Message.Header>
                            <Message.Content>
                                {success 
                                ? "Changes saved!"
                                : `Fill out the form below to add money` }
                            </Message.Content>
                        </Message>

                        <Form onSubmit={handleSubmit}>
                        <Form.Group unstackable>
                           <Form.Field required>
                                    <label htmlFor="amount">Amount</label>
                                    <input name="amount" type="number" min="0.01" step="0.01" value={amount} onChange={({target}) => setAmount(target.value) }/>
                                                               </Form.Field>
                            <Form.Field required>
                                <label htmlFor="currency">Currency</label>
                                <Currency handleCurrency={handleCurrency} mainCurrency={wallet.mainCurrency} />
                            </Form.Field>  
                            {currency ? `~${parseFloat(amount/rate).toFixed(2)} ${wallet.mainCurrency}` :  <br /> }
                            </Form.Group>                  

                            <Button.Group floated="right">
                                <Button type="reset" 
                                        onClick={() => {
                                                    setModalOpen(false)
                                                    reset()
                                                }} 
                                        content='Close'  />
                                <Button as='button' type="submit" content='Save' positive disabled={(amount < 0.01 || currency === '') ? true : false}/>
                            </Button.Group> 
                        </Form> 
                    </Modal.Description>
                    <br />
                </Modal.Content>
            </Modal>
}

export default AddMoney