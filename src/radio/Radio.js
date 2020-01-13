import React, { Component } from 'react'
import { Form, Radio } from 'semantic-ui-react'

export default class RadioExampleRadioGroup extends Component {
    state = {}
    handleChange = (e, { value }) => this.setState({ value })

    render() {
        return (
            <>
                <Form.Field>
                    <Radio
                        label='Choose this'
                        name='radioGroup'
                        value='this'
                        checked={this.state.value === 'this'}
                        onChange={this.handleChange}
                    />
                    <Radio
                        label='Or that'
                        name='radioGroup'
                        value='that'
                        checked={this.state.value === 'that'}
                        onChange={this.handleChange}
                    />
                    <br />
                    <Radio
                        label='Choose thisyui'
                        name='radioGroup'
                        value='this'
                        checked={this.state.value === 'this'}
                        onChange={this.handleChange}
                    />
                    <Radio
                        label='Or that ytuy'
                        name='radioGroup'
                        value='that'
                        checked={this.state.value === 'that'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
            </>
        )
    }
}