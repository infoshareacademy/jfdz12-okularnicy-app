import React from 'react'
import { Select, Dropdown } from 'semantic-ui-react'

const typeOptions =
    [

        {
            "key": "1",
            "value": 1,
            "text": "food"
        },
        {
            "key": "2",
            "value": 2,
            "text": "clothes"
        },
        {
            "key": "3",
            "value": 3,
            "text": "cosmetics"
        },
        {
            "key": "4",
            "value": 4,
            "text": "health"
        },
        {
            "key": "5",
            "value": 5,
            "text": "documents"
        },
        {
            "key": "6",
            "value": 6,
            "text": "underwear"
        },
        {
            "key": "7",
            "value": 7,
            "text": "sports equipment"
        },
        {
            "key": "8",
            "value": 8,
            "text": "jewellery"
        },
        {
            "key": "9",
            "value": 9,
            "text": "my favourite"
        },
        {
            "key": "10",
            "value": 10,
            "text": "other"
        }
    ]

function SelectType(props) {
    const handleChange = (e, { value }) => {
        props.handleChangeType(value)
    }

    return <Dropdown fluid selection placeholder='Type' clearable value={props.value} onChange={handleChange} options={typeOptions} selection />
}

export default SelectType
