import React, {useState, useEffect, useContext } from 'react';
import firebase from "firebase";
import { Form, Button, Modal, Message, Icon, Segment } from 'semantic-ui-react';
import { Currency } from './currency';
import { MyContext } from '../auth/Auth';

export default ({wallet}) => {

    const [modalOpen, setModalOpen] = useState(false)
    const [success, setSuccess] = useState(false)
    const [amount, setAmount] = useState(wallet.budget[0].amount | 0)
    const [currency, setCurrency] = useState(wallet.mainCurrency)
    const [rate, setRate] = useState(0)
    const user = useContext(MyContext)
    const uid = user.state.user.uid

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
        firebase.database().ref(`users/${uid}/budget/wallet/budget/0/`).update({
            ...data
        })
        firebase.database().ref(`users/${uid}/budget/wallet/`).update({
            mainCurrency: data.currency})
        setSuccess(true)
        timeout()
    }

   return <Modal  
            open={modalOpen}    
            onClose={() => setModalOpen(false)} 
            closeOnDimmerClick={false}
            size="tiny" 
            trigger={<Button
                        icon
                        circular 
                        floated='right'
                        onClick={() => setModalOpen(true)}
                   >
                       <Icon 
                        name='setting'
                        color='teal'/>
                       </Button>} >
               <Modal.Content>
                    <Modal.Description>
                        <Message color={success ? 'green': "grey"}>
                            <Message.Header>
                                Budget settings
                            </Message.Header>
                            <Message.Content>
                                {success 
                                ? "Changes saved!"
                                : `Modify your budget or change main currency` }
                            </Message.Content>
                        </Message>

                        <Form onSubmit={handleSubmit}>
                        <Form.Group unstackable>
                           <Form.Field required>
                                    <label htmlFor="amount">Total budget</label>
                                    <input
                                        name="amount" 
                                        type="number" 
                                        min="0.01" 
                                        step="0.01" value={amount} 
                                        onChange={({target}) => setAmount(target.value) }/>
                            </Form.Field>
                            <Form.Field required>
                                <label htmlFor="currency">Main currency</label>
                                <Currency handleCurrency={handleCurrency} mainCurrency={wallet.mainCurrency} />
                            </Form.Field>  
                            </Form.Group>                  

                            <Button.Group floated="right">
                                <Button type="reset" 
                                        onClick={() => {
                                                    setModalOpen(false)
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