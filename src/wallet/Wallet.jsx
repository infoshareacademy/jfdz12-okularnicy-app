import React, { useState, useEffect } from 'react'
import { Grid, Responsive } from 'semantic-ui-react'
import firebase from "firebase";

import WalletOverview from './WalletOverview'
import Spendings from './Spendings'
import Charts from './Charts';

export const Wallet = () => {
    const [wallet, setWallet] = useState([])
    const [rates, setRates] = useState()
    const [spent, setSpent] = useState(0)
    const [spendings, setSpendings] = useState([])
    const [loading, setloading] = useState(false)
    const [spendingsLoading, setSpendingsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [spendingError, setSpendingError] = useState(null)

    const uid = firebase.auth().currentUser.uid;
    const spendingsRef = firebase.database().ref(`users/${uid}/budget/spendings/`)
    const walletRef = firebase.database().ref(`users/${uid}/budget/wallet/`)
    useEffect(() => {
        getWallet()
        getSpending() 
    }, [])

    const getWallet = () => {
        setloading(true)
        walletRef.on('value', (snapshot) => {
            let list = snapshot.val()
            if (list) {
               setWallet(list)
               setloading(false)
               console.log(wallet)
               
            }else {
                setWallet(null)
                setloading(false)
            }
        })
        
            }
   

    const getSpending = () => {
        setSpendingsLoading(true)
        spendingsRef.on('value', (snapshot) => {
            let list = snapshot.val()
            if (list) {
                console.log("List not empty");
                const keys = Object.keys(list);
                const formattedData = keys.map(key => {
                    return {
                        id: key,
                        ...list[key]
                    }
                })
                .reverse()
                setSpent(calculateSpent(formattedData))
                setSpendings(formattedData)
            } else {
                setSpendings(null)
            }
            setSpendingsLoading(false)
        })
    }

    const calculateSpent = (list) => {
       let spent = {}
       let spentCalculated = {}

       list.reduce((acc, val)=> {
            const o = acc.filter((obj)=>{
                return obj.currency==val.currency;
            }).pop() || {currency:val.currency, amount:0, amountInBaseCurr: 0};
            o.amountInBaseCurr += val.amountInBaseCurr
            o.amount += val.amount;
            !acc.includes(o) && acc.push(o);
            spent[o.currency] = o.amount
            spentCalculated[o.currency] = o.amountInBaseCurr
            return acc;
        },[]);
        return {spent, spentCalculated}
    }

    return <>
        <Responsive maxWidth={650}>
            <WalletOverview wallet={wallet} loading={loading} spent={spent}/>
            <Spendings spendings={spendings} error={spendingError} loading={spendingsLoading} mainCurrency={wallet.mainCurrency} />
        </Responsive>
        <Responsive minWidth={651} >
            <Grid columns={2} >
                <Grid.Column >
                    <WalletOverview wallet={wallet} loading={loading} spent={spent} />
                    <Spendings spendings={spendings} error={spendingError} loading={spendingsLoading} mainCurrency={wallet.mainCurrency}/>
                </Grid.Column>
                <Grid.Column>
                    {wallet.budget && spent && <Charts wallet={wallet} spent={spent}/>}
                        </Grid.Column>
            </Grid>
        </Responsive>
    </>
}