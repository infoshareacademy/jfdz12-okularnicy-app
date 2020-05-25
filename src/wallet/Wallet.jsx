import React, { useState, useEffect } from 'react'
import { Grid, Responsive } from 'semantic-ui-react'
import axios from 'axios'

import WalletOverview from './WalletOverview'
import Spendings from './Spendings'


//country - currency https://restcountries.eu/rest/v2/all?fields=name;currencies
//REVOLUT exchange https://revolut-engineering.github.io/api-docs/business-api/#exchanges-get-exchange-rates
// ^^ https://b2b.revolut.com/api/1.0/rate?from=<currency>&to=<currency>&amount=<amount>


export const Wallet = () => {
    const [wallet, setWallet] = useState([])
    const [spendings, setSpendings] = useState([])
    const [loading, setloading] = useState(false)
    const [spendingsLoading, setSpendingsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [spendingError, setSpendingError] = useState(null)

    useEffect(() => {
        getWallet()
        getSpendings()
    }, [])

    const getWallet = async () => {
        try {
            setloading(true)
            const { data } = await axios.get('/wallet.json')
            setWallet(data)
            setloading(false)
        }
        catch (error) {
            setError(error);
            setloading(false)
        }
    }
    const getSpendings = async () => {
        try {
            setloading(true)
            const { data } = await axios.get('/spendings.json')
            setSpendings(data.spendings)
            setSpendingsLoading(false)
        }
        catch (error) {
            setSpendingError(error);
            setSpendingsLoading(false)
        }
    }

    if (loading) return <h2>Loading...</h2>
    else if (error) return <h2> error :( </h2>
    return <>
        <Responsive maxWidth={650}>
            <WalletOverview wallet={wallet} />
            <Spendings spendings={spendings} error={spendingError} />
        </Responsive>
        <Responsive minWidth={651} >

            <Grid columns={2} >
                <Grid.Column>
                    <WalletOverview wallet={wallet} />
                    <Spendings spendings={spendings} error={spendingError} />
                </Grid.Column>
                <Grid.Column>

                    <h1>Wallet graphs</h1>
        main currency | set main currency | change
        amount in your currency
         !! GAPH !!

                        </Grid.Column>

            </Grid>

        </Responsive>

    </>
}