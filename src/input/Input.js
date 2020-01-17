import React from 'react'
import { Input } from 'semantic-ui-react'

export function ItemSearchInput(props) {
    return (
        <Input value={props.value} onChange={props.onChange} />

    );
}