import React, {useState, useEffect} from 'react'
import { Header, Card, Button, Table, Icon, Placeholder } from 'semantic-ui-react'
import AddMoney from './AddMoney'
import WalletConf from './WalletConf'
import {getRates, exchange} from './currencies'



export default ({ wallet, loading, spent }) => {
    const [rates, setRates] = useState()
    const [sum, setSum] = useState()
    
    useEffect(() => {
        getRate(wallet.mainCurrency || 'PLN')
    }, [wallet]) 

    const placeholder = () => {
      return  <Placeholder >
             <Placeholder.Line length='short' />
        </Placeholder>
    }
    const calculateBudget  = (wallet) => {
        // console.log( wallet);
        let sum = wallet.budget.reduce( (acc, curr) => {
            // console.log('acc', acc);
            // console.log('exchange', exchange (curr.amount, curr.currency, wallet.mainCurrency, rates));
            return acc += exchange (curr.amount, curr.currency, wallet.mainCurrency, rates)
            
        }, 0)
        return parseFloat(sum).toFixed(2)
    }

    const objPpertySum = (obj) => {
        return Object.keys(obj).reduce((sum,key)=>sum+parseFloat(obj[key]||0),0);
      }

    const calculateSpent = () => {
        if(spent.spentCalculated === undefined){
            return "-"
        }
        const sum = objPpertySum(spent.spentCalculated)   
        return parseFloat(sum).toFixed(2)
    }

    const calculateAvaible = () => {
        const remaining = calculateBudget(wallet) - calculateSpent()   
        return parseFloat(remaining).toFixed(2)
    }

    const getRate =  async (currency) => {
        const ratess =  await getRates(currency)
        // console.log("RATES", ratess);
        setRates(ratess)
     }

    return <>
        <Header>Wallet summary {wallet.budget && <WalletConf wallet={wallet}/>}</Header>
        <Card fluid>
            <Card.Content>
               <Table basic='very' celled unstackable compact>
                    <Table.Body>
                        <Table.Row>
                                <Table.Cell>
                                    Total budget
                                </Table.Cell>
                                <Table.Cell width={6}>
                                { wallet.budget && rates ? wallet.budget[0].amount : placeholder()} {wallet.mainCurrency}
                                </Table.Cell>
                        </Table.Row>
                        
                        <Table.Row>
                                <Table.Cell>
                                    Avaible budget
                                </Table.Cell>
                                <Table.Cell >
                                    { wallet.budget && rates ? `~${calculateAvaible()}`: placeholder()}  {wallet.mainCurrency}
                                </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                                <Table.Cell>
                                    Total spent
                                </Table.Cell>
                                <Table.Cell>
                                { wallet.budget && rates ? `~${calculateSpent()}` : placeholder()} {wallet.mainCurrency}
                                </Table.Cell>
                        </Table.Row>
                       </Table.Body>
                </Table>                  
            </Card.Content>
        </Card>
  </>
}