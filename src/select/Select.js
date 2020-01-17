import React from 'react'
import { Select } from 'semantic-ui-react'

const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
]

// const typeOptions = () => {
//     let types;
//     fetch('item-types.json')
//         .then(data => data.json())
//         .then(data => types = data)
//     return types
// }

const SelectExample = () => (
    <>
        <Select placeholder='Select your country' options={countryOptions} />
        {/* <Select placeholder='Type' options={typeOptions()} /> */}
    </>
)

export default SelectExample
