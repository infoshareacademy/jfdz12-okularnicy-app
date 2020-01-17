import React from 'react';
import { Image, List, Segment, Loader, Dimmer } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AddToList } from '../user-list/AddToList';
import { MyContext } from '../auth/Auth'

export default class UserList extends React.Component {
    static contextType = MyContext
    state = {
        items: [],
        listedItems: [],
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
    filterItems() {
        const userListObjects = []
        this.state.items.map((item) => {
            if (this.context.state.userList.includes(item.id)) {
                userListObjects.push(item)
            }

        })
        return userListObjects
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
            <h1> Things to pack</h1>
            <List divided>
                {
                    this.filterItems().map(item =>
                        <List.Item key={item.id}>
                            <Link to={{
                                pathname: `/items/${item.id}`,
                                state: {
                                    item
                                }
                            }}>
                                <List.Content>
                                    <List.Header>{item.img} {item.name}</List.Header>
                                    <List.Description>{item.description}</List.Description>
                                </List.Content>
                            </Link>
                            <List.Content floated='right'>
                            <AddToList itemId={item.id} />
                            </List.Content>
                        </List.Item>
                    )
                }
            </List>
        </>
    }
}