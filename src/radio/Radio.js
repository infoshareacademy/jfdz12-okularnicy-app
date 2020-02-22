import React from 'react'
import { Form, Radio } from 'semantic-ui-react'
import './Radio.css'

export function RadioSelect(props) {

    const onChangeRadio = (e, { value }) => {
        props.onChangeRadio(value)
    }

    return (
        <Form.Field className="radio">
            <Radio className="radioItem"
                label='All'
                name='radioGroup'
                value={"all"}
                checked={props.value === "all"}
                onChange={onChangeRadio}
            />
            <Radio className="radioItem"
                label='Sunny'
                name='radioGroup'
                value={1}
                checked={props.value === 1}
                onChange={onChangeRadio}
            />
            <Radio className="radioItem"
                label='Cold'
                name='radioGroup'
                value={2}
                checked={props.value === 2}
                onChange={onChangeRadio}
            />
            <Radio className="radioItem"
                label='Windy'
                name='radioGroup'
                value={3}
                checked={props.value === 3}
                onChange={onChangeRadio}
            />
            <Radio className="radioItem"
                label='Stormy'
                name='radioGroup'
                value={4}
                checked={props.value === 4}
                onChange={onChangeRadio}
            />

        </Form.Field>
    )
}
