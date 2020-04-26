import React, { useState } from 'react'
import { Grid, Responsive } from 'semantic-ui-react'

import WalletOverview from './WalletOverview'
import Spendings from './Spendings'


//country - currency https://restcountries.eu/rest/v2/all?fields=name;currencies
//REVOLUT exchange https://revolut-engineering.github.io/api-docs/business-api/#exchanges-get-exchange-rates
// ^^ https://b2b.revolut.com/api/1.0/rate?from=<currency>&to=<currency>&amount=<amount>


const wallet = {
    mainCurrency: 'PLN',
    budget: {
        PLN: 2566,
        EUR: 156,
        USD: 153.26

    },
    spendings: [
        {
            id: 'ajh8d93',
            currency: 'PLN',
            amount: 23,

        },
        {
            id: 'dw343',
            currency: 'EUR',
            amount: 13,
        },

    ]
}

export const Wallet = () => {

    return <>

        <Responsive maxWidth={550}>
            <WalletOverview wallet={wallet} />
            <Spendings />
        </Responsive>
        <Responsive minWidth={551} >

            <Grid columns={2} >
                <Grid.Column>
                    <WalletOverview wallet={wallet} />
                    <Spendings />
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