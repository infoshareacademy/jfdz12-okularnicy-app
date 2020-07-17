import React, { useEffect, useState, useContext } from 'react'
import { Form, Label, Button, Header, Modal } from 'semantic-ui-react'
import firebase from "firebase";
import { useForm } from "react-hook-form";

import { Currency } from './currency'
import { MyContext } from '../auth/Auth';

now = new Date()

const emptyForm = {
    id: '',
    currency: '',
    amount: '',
    rate: '',
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

export default ({ edit }) => {
    const [rate, setRate] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const { register, setValue, handleSubmit, watch, errors, reset, getValues } = useForm({ defaultValues: edit || emptyForm })
    const watchAmount = watch('amount')
    const user = useContext(MyContext)
    const uid = user.state.user.uid

    useEffect(() => {
        register({ name: "currency" })

    }, [register])

    const onSubmit = (data, e) => {
        e.preventDefault()
        const timestamp = Date.now();
        // const timestampEdit = Date.now();
        edit
            ? console.log('edit', data)
            :
            console.log('new', data)
        const spendingKey = firebase.database().ref().child(`users/${uid}/budget/spendings/`).push().key;
        console.log(spendingKey);
        firebase.database().ref(`users/${uid}/budget/spendings/${spendingKey}/`).set({
            timestamp,
            rate,
            ...data
        })
        //Message
        setModalOpen(false)
    };

    const setCurrency = (currency, rate) => {
        setValue('currency', currency)
        setRate(rate)
    }

    return <>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} size="tiny" trigger={edit ? <Button icon='edit' onClick={() => setModalOpen(true)} /> : <Button onClick={() => setModalOpen(true)} className='spendings__btn--fixed' color='orange' icon='plus' circular size='big' />}>
            <Modal.Content>
                <Modal.Description>
                    <Header>{edit ? "Edit" : "Add"} spending</Header>
                    <Form onSubmit={handleSubmit(onSubmit)} >
                        <Form.Group >
                            <Form.Field width='6' required >
                                <label htmlFor="desc"   >Description</label>
                                <input name="desc" ref={register({ required: true })} />
                                {errors.desc &&
                                    <Label basic color='red' prompt pointing>
                                        This field is required
                    </Label>}
                            </Form.Field>
                            <Form.Group unstackable>
                                <Form.Field width='4' required>
                                    <label htmlFor="amount">Amount</label>
                                    <input name="amount" type="number" min="0.01" step="0.01" ref={register({ required: true })} />
                                    {errors.amount
                                        && <Label basic color='red' prompt pointing>
                                            This field is required
                                        </Label>}
                                </Form.Field>
                                <Form.Field width='5' required>
                                    <label htmlFor="currency">Currency</label>
                                    <Currency handleCurrency={setCurrency} />
                                    {errors.currency
                                        && <Label basic color='red' prompt pointing>
                                            This field is required
                                        </Label>}
                                </Form.Field>
                                {rate && (1 / rate * getValues('amount'))}
                            </Form.Group>
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
                            <Button as='button' onClick={() => setModalOpen(false)} content='close' />
                            <Button as='button' type="submit" content='Save' positive />
                        </Button.Group>
                        <br />
                    </Form >
                </Modal.Description>
            </Modal.Content>
        </Modal>
    </>
}