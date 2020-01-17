import React, { Component } from 'react'
import { Form, Radio } from 'semantic-ui-react'
import './Radio.css'

export default class RadioExampleRadioGroup extends Component {
    state = {}
    handleChange = (e, { value }) => this.setState({ value })

    render() {
        return (
            <Form.Field className="radio">
                <Radio className="radioItem"
                    label='Sunny'
                    name='radioGroup'
                    value='sunny'
                    checked={this.state.value === 'sunny'}
                    onChange={this.handleChange}
                />
                <Radio className="radioItem"
                    label='Cold'
                    name='radioGroup'
                    value='cold'
                    checked={this.state.value === 'cold'}
                    onChange={this.handleChange}
                />
                <Radio className="radioItem"
                    label='Windy'
                    name='radioGroup'
                    value='windy'
                    checked={this.state.value === 'windy'}
                    onChange={this.handleChange}
                />
                <Radio className="radioItem"
                    label='Stormy'
                    name='radioGroup'
                    value='stormy'
                    checked={this.state.value === 'stormy'}
                    onChange={this.handleChange}
                />
            </Form.Field>
        )
    }
}