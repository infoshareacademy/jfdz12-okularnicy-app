import React, { useState, useEffect } from 'react'
import { Grid, Responsive } from 'semantic-ui-react'
import axios from 'axios'
import firebase from "firebase";

import WalletOverview from './WalletOverview'
import Spendings from './Spendings'

export const Wallet = () => {
    const [wallet, setWallet] = useState([])
    const [spendings, setSpendings] = useState([])
    const [loading, setloading] = useState(false)
    const [spendingsLoading, setSpendingsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [spendingError, setSpendingError] = useState(null)

    const uid = firebase.auth().currentUser.uid;
    const spendingsRef = firebase.database().ref(`users/${uid}/budget/spendings/`)
    useEffect(() => {
        getWallet()
        getSpending()
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

    const getSpending = () => {
        setSpendingsLoading(true)
        spendingsRef.on('value', (snapshot) => {
            let list = snapshot.val()
            if (list) {
                const keys = Object.keys(list);
                const formattedData = keys.map(key => {
                    return {
                        id: key,
                        ...list[key]
                    }
                })
                // .sort((a, b) => a.timestamp - b.timestamp)
                setSpendings(formattedData)
            }
            setSpendingsLoading(false)
        })
    }

    return <>
        <Responsive maxWidth={650}>
            <WalletOverview wallet={wallet} loading={loading} />
            <Spendings spendings={spendings} error={spendingError} />
        </Responsive>
        <Responsive minWidth={651} >

            <Grid columns={2} >
                <Grid.Column>
                    <WalletOverview wallet={wallet} loading={loading} />
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