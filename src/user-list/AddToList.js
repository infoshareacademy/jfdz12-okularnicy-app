import React, { useContext } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react'
import { MyContext } from '../auth/Auth'

export function AddToList(props) {
    const userList = useContext(MyContext)
    function findItem(item) { return (userList.state.userList.map(item => item.id).indexOf(item.id)) }
    const isPacked = () => userList.state.userList[findItem(props.item)].done

    return <> {(findItem(props.item) > -1)
        ? <>
            <Button size="large" color='red' icon floated='right' onClick={() => userList.removeFromList(props.item.id)}>
                <Icon name='minus' />
            </Button>

            {props.desc &&
                (isPacked()
                    ? <Label color='green' horizontal>
                        Packed
              </Label>
                    
                    : <Label color='gray' horizontal>
                    To pack
          </Label>
                )
            }
            {props.list &&
                <Button size="large" color={isPacked() && "orange"} icon floated='right' onClick={() => userList.markAsDone(props.item.id)}>
                    <Icon color={isPacked() && "green"} name='check' />
                </Button>}
        </>
        : <Button color='green' floated='right' size={"large"} icon onClick={() => userList.addToList(props.item)}>
            <Icon name='plus' />
        </Button>
    }
    </>


}

