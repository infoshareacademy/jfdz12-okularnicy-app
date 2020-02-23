import React from 'react';
import { Image, List, Segment, Loader, Dimmer, Button } from 'semantic-ui-react';
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
        fetch("https://okularnicy-app.firebaseio.com/items.json")
            .then(response => response.json())
            .then(data => {
                if (data) {
                    const keys = Object.keys(data);
                    const formattedData = keys.map(key => {
                        return {
                            id: key,
                            ...data[key]
                        }
                    });
                    this.setState({
                        items: formattedData,
                    })
                }
            })
            .catch(err => this.setState({ error: err }))
            .finally(() => this.setState({ loading: false }))


    }
    filterItems() {
        const userListObjects = []
        this.state.items.map((item) => {
            if (this.context.state.userList.includes(item.id)) {
                userListObjects.push(item)
                return null
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
            {this.context.state.userList.length < 1
            ? <> <h3>Nothing to pack</h3> <Link to='/' ><Button color="orange" fluid content="See list of items"/></Link></>
            :<List divided>
                {
                    this.context.state.userList.map(item =>
                        <List.Item key={item.id}>
                            < List.Content floated='right'>
                                <AddToList item={item} iconic={true} list desc />
                            </List.Content>
                            <Link to={{
                                pathname: `/items/${item.id}`,
                                state: {
                                    item
                                }
                            }}>

                                <List.Content className={item.done && 'item-done'}>
                                    <List.Header >{item.img} {item.name}</List.Header>
                                    <List.Description>{item.description}</List.Description>
                                </List.Content>
                            </Link>

                        </List.Item>
                    )
                }
            </List>}
        </>
    }
}