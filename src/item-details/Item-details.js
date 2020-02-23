import React, { useState, useEffect } from 'react'
import { Item, Loader, Dimmer } from 'semantic-ui-react'
import { AddToList } from '../user-list/AddToList'

export default function ItemDetails(props) {
    const [item, setItem] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetch(`https://okularnicy-app.firebaseio.com/items/${props.match.params.id}.json`)
            .then(response => response.json())
            .then(data => {
                const currentitem = data
                currentitem.id = props.match.params.id
                setItem(currentitem)
                setLoading(false)
            })
            .catch(err => setError(err))
    }, [])

    return loading
        ? <Dimmer active inverted>
            <Loader size='large'>Loading</Loader>
        </Dimmer>
        : <Item.Group relaxed>
            <Item>
                <Item.Image src={item.image ? item.image : null} />
                <Item.Content>
                    <Item.Header>{item.img ? item.img : null} {item.name}</Item.Header>
                    <Item.Meta>
                        <span>{item.description}</span>
                    </Item.Meta>
                    <Item.Description>Tip: {item.proTip}</Item.Description>
                    <Item.Extra>
                        <AddToList item={item} />
                    </Item.Extra>
                </Item.Content>
            </Item>

        </Item.Group>


}