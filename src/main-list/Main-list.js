import React from 'react';
import { Button, Image, List, Segment, Loader, Dimmer, Form } from 'semantic-ui-react';
import InputExampleInput from '../input/Input'
import "./Main-list.css"
import { Link } from 'react-router-dom';
import SelectExample from '../select/Select';
import RadioExampleRadioGroup from '../radio/Radio';

export default class MainList extends React.Component {
    state = {
        items: [],
        loading: true,
        error: null
    }

    componentDidMount() {
        fetch("items.json")
            .then(response => response.json())
            .then(data => this.setState({ items: data }))
            .catch(err => this.setState({ error: err }))
            .finally(() => this.setState({ loading: false }))
    }

    render() {
        if (this.state.loading) {
            return (
                <Segment>
                    <Dimmer active inverted>
                        <Loader size='large'>Loading</Loader>
                    </Dimmer>
                    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                </Segment>)
        }
        if (this.state.error) {
            return <h1>"An error occured"</h1>
        }
        return <>
            <h1> What you need ? ;)</h1>

            <Segment.Group horizontal>
                <Segment>
                    <InputExampleInput />
                </Segment>
                <Segment>
                    <RadioExampleRadioGroup />
                </Segment>
                <Segment>
                    <SelectExample />
                </Segment>
            </Segment.Group>

            <List divided>
                {
                    this.state.items.map(item => (
                        <List.Item key={item.id}>
                            <List.Content floated='right'>
                                <Button>Add</Button>
                            </List.Content>
                            <List.Content>
                                <Link to={{
                                    pathname: `/items/${item.id}`,
                                    state: {
                                        item
                                    }
                                }}>
                                    <List.Header>{item.img}      {item.name}</List.Header>
                                    <List.Description>{item.description}</List.Description>
                                </Link>
                            </List.Content>
                        </List.Item>
                    ))
                }
                <List.Item>
                    <Link to="/item-add">
                        <Button fluid>Missed?</Button>
                    </Link>
                </List.Item>
            </List>
        </>
    }
}