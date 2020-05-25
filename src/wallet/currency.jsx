import React, { useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios'

export const Currency = ({ handleCurrency }) => {
    const [currencies, setCurrencies] = useState([])
    const [rate, setRate] = useState([])
    const [error, setError] = useState(null)
    const [loading, setloading] = useState(false)

    useEffect(() => {
        getCurrencies()

    }, [])

    const getCurrencies = async () => {
        try {
            setloading(true)
            const { data } = await axios.get('https://api.exchangeratesapi.io/latest?base=PLN')
            const currencies = Object.keys(data.rates).map(rate => {
                return { text: rate, value: rate, key: rate }
            })
            setRate(data)
            setCurrencies(currencies)
            setloading(false)
        }
        catch (error) {
            setloading(false)
            setError(error)
        }
    }
    return <Dropdown
        placeholder='Select'
        fluid
        search
        selection
        loading={loading}
        error={error}
        options={currencies}
        onChange={(e, { value }) => handleCurrency(value, rate.rates[value])}
    />
}