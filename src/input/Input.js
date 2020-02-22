import React from 'react'
import { Input } from 'semantic-ui-react'

export function ItemSearchInput(props) {
    return (
        <Input
            icon="search"
            placeholder='Search...'
            value={props.value}
            onChange={props.onChange} />
    );
}