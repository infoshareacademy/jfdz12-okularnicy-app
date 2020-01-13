import React from 'react'
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'

export default function ItemDetails(props) {
    const { item } = props.location.state
    return (
        <Item.Group relaxed>
            <Item>
                <Item.Image src={item.image ? item.image : null} />
                <Item.Content>
                    <Item.Header as='a'>{item.img ? item.img : null} {item.name}</Item.Header>
                    <Item.Meta>
                        <span>{item.description}</span>
                    </Item.Meta>
                    <Item.Description>Tip: {item.proTip}</Item.Description>
                    <Item.Extra>
                        <Button color='green' floated='right'>
                            Add to list
            <Icon name='right plus' />
                        </Button>
                    </Item.Extra>
                </Item.Content>
            </Item>

        </Item.Group>
    )
}