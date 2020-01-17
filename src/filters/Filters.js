import React from 'react'

export function ItemSearchInput(props) {
    return (
        <label>
            Szukaj:
        <input value={props.value} onChange={props.onChange} />
        </label>
    );
}