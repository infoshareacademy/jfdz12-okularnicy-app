import React, { useEffect, useState, useContext } from 'react'
import { Form, Label, Button, Modal, Message } from 'semantic-ui-react'
import firebase from "firebase";
import { useForm } from "react-hook-form";

import { Currency } from './currency'
import { MyContext } from '../auth/Auth';

const now = new Date()



export default ({ edit, mainCurrency }) => {
    const emptyForm = {
        id: '',
        currency: "",
        amount: 0,
        rate: '',
        baseCurr: '',
        amountInBaseCurr: 0,
        date: now.toISOString().slice(0, 10),
        hour: now.toLocaleTimeString('en-GB', {
            hour: "numeric",
            minute: "numeric"
        }),
        place: '',
        type: '',
        name: '',
        desc: '',
        location: {
            lat: '',
            lon: ''
        }
    }

    const [rate, setRate] = useState(edit? edit.rate : null)
    const [success, setSuccess] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const { register, setValue, handleSubmit, watch, errors, reset, getValues } = useForm({ defaultValues: edit || emptyForm })
    const watchAmount = watch('amount')
    const user = useContext(MyContext)
    const uid = user.state.user.uid

    useEffect(() => {
        register({ name: "currency" })

        return () => clearTimeout (timeout)
    }, [register])

    const timeout = () => setTimeout(() => {
        setSuccess(false)
        setModalOpen(false)}, 2000)

    const onSubmit = (data, e) => {
        e.preventDefault()
        const timestamp = Date.now();
        const timestampEdit = Date.now();
        const amount = parseInt(data.amount)
        const amountInBaseCurr = (data.amount/rate)

        const form = {
            timestamp : Date.now(),
            timestampEdit : Date.now(),
            amount : parseInt(data.amount),
            amountInBaseCurr : (data.amount/rate)
        }
        
        console.log(form);
       if (edit){
            console.log('edit', data)
            firebase.database().ref(`users/${uid}/budget/spendings/${edit.id}`).update({
                timestampEdit,
                rate,
                baseCurr: mainCurrency,
                amountInBaseCurr,
                ...data,
                amount
                

            })
        }else {
     console.log('new', data)
        const spendingKey = firebase.database().ref().child(`users/${uid}/budget/spendings/`).push().key;
        console.log(spendingKey);
        firebase.database().ref(`users/${uid}/budget/spendings/${spendingKey}/`).set({
            timestamp,
            rate,
            baseCurr: mainCurrency,
            amountInBaseCurr,
            ...data,
            amount
        })
    }
        setSuccess(true)
        timeout()
    };

    const setCurrency = (currency, rate) => {
        setValue('currency', currency)
        setRate(rate)
    }

    return <>
        <Modal  open={modalOpen}    
            onClose={() => setModalOpen(false)} 
            closeOnDimmerClick={false}
            size="tiny" 
            trigger={edit 
                        ? <Button icon='edit' onClick={() => setModalOpen(true)} /> 
                        : <Button onClick={() => setModalOpen(true)} className='spendings__btn--fixed' color='orange' icon='plus' circular size='big' />}>
            <Modal.Content>
                <Modal.Description>
                    <Message color={success ? 'green' : 'gray'}>
                        <Message.Header>
                            {edit 
                                ? "Edit spending" 
                                : "Add spending"}
                        </Message.Header>
                        <Message.Content>
                            {success 
                            ? "Changes saved!"
                            : `Fill out the form below to ${edit ? 'edit':'add'} spending` }
                        </Message.Content>
                    </Message>
                     <Form 
                    onSubmit={handleSubmit(onSubmit)} 
                    >
                            <Form.Field required >
                                <label htmlFor="desc"   >Description</label>
                                <input name="desc" ref={register({ required: true })} />
                                {errors.desc &&
                                    <Label basic color='red' prompt pointing>
                                        This field is required
                                    </Label>}
                    
                            </Form.Field>
                           
                            <Form.Group unstackable>
                                <Form.Field required>
                                    <label htmlFor="amount">Amount</label>
                                    <input name="amount" type="number" min="0.01" step="0.01" ref={register({ required: true })} />
                                    {errors.amount
                                        && <Label basic color='red' prompt pointing>
                                            This field is required
                                        </Label>}
                                </Form.Field>
                                <Form.Field required>
                                    <label htmlFor="currency">Currency</label>
                                    <Currency handleCurrency={setCurrency} mainCurrency={mainCurrency} edit={edit ? edit : false} />
                                    {errors.currency
                                        && <Label basic color='red' prompt pointing>
                                            This field is required
                                        </Label>}
                                </Form.Field>
                            </Form.Group>
    
                        <Form.Group>
                            <Form.Field required>
                                <label htmlFor="type">Type</label>
                                <input name="type" ref={register({ required: true })} />
                                {errors.type &&
                                    <Label basic color='red' prompt pointing>
                                        This field is required
                                    </Label>}
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="Place">Place</label>
                                <input name="place" ref={register()} />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group>
                            <Form.Field required>
                                <label htmlFor="date">Date</label>
                                <input name="date" type="date" ref={register({ required: true })} />
                                {errors.date &&
                                    <Label basic color='red' prompt pointing>
                                        This field is required
                    </Label>}
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="hour">Time</label>
                                <input name="hour" type="time" ref={register()} />
                            </Form.Field>
                        </Form.Group>
                         <Button.Group floated="right">
                            <Button type="reset" onClick={() => setModalOpen(false)} content='Close' />
                            <Button as='button' type="submit" content='Save' positive />
                        </Button.Group>
                        <br />
                    </Form > 
                </Modal.Description>
            </Modal.Content>
        </Modal>
    </>
}