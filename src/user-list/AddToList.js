import React, { useContext } from 'react';
import { Button, Icon } from 'semantic-ui-react'
import { MyContext } from '../auth/Auth'

export function AddToList(props) {
    const userList = useContext(MyContext)
    function findItem(itemId) { return (userList.state.userList.indexOf(itemId)) }
    return (
        <>
            {(findItem(props.itemId) > -1) ? (<Button itemId={props.itemId} color='red' floated='right' onClick={(e) => userList.removeFromList(props.itemId)}>
                Remove<Icon name='right minus' />
            </Button>
            )
                : (
                    <Button itemId={props.itemId} color='green' floated='right' onClick={(e) => userList.addToList(props.itemId)}>
                        Add<Icon name='right plus' />
                    </Button>)
            }



        </>
    )
}

