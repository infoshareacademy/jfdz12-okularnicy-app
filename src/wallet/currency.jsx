import React, { useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios'

export const Currency = ({ handleCurrency, mainCurrency, compact, edit }) => {
    const [currencies, setCurrencies] = useState([])
    const [rate, setRate] = useState([])
    const [error, setError] = useState(null)
    const [loading, setloading] = useState(false)
    const [currentCurr, setCurrentCurr] = useState(edit? edit.currency : mainCurrency)

    useEffect(() => {
        getCurrencies()
    }, [])

    const getCurrencies = async () => {
        try {
            setloading(true)
            const { data } = await axios.get(`https://api.exchangeratesapi.io/latest?base=${mainCurrency}`)
            const currencies = Object.keys(data.rates).map(rate => {
                return { text: rate, value: rate, key: rate }
            })
            setRate(data)
            setCurrencies(currencies)
            handleCurrency (currentCurr, edit? edit.rate : 1)
            setloading(false)
        }
        catch (error) {
            setloading(false)
            setError(error)
        }
    }
    return <Dropdown
        placeholder='Select'
        compact={compact? true : false}
        fluid
        search
        selection
        loading={loading}
        error={error}
        options={currencies}
        value={currentCurr}
        onChange={(e, { value }) => {
            setCurrentCurr(value)
            handleCurrency(value, rate.rates[value])
        }}
    />
}