import React, { useContext } from 'react';
import { Button, Icon } from 'semantic-ui-react'
import { MyContext } from '../auth/Auth'

export function AddToList(props) {
    const userList = useContext(MyContext)
    function findItem(item) { return (userList.state.userList.map(item => item.id).indexOf(item.id)) }

    return <> {(findItem(props.item) > -1)
        ? <Button size="large" color='red' icon floated='right' onClick={() => userList.removeFromList(props.item.id)}>
            <Icon name='minus' />
        </Button>
        : <Button color='green' floated='right' size={"large"} icon onClick={() => userList.addToList(props.item)}>
            <Icon name='plus' />
        </Button>
    }
    </>


}

