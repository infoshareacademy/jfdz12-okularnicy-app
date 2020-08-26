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
             <Placeholder.Line length='very short' />
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
        <Header content='Summary' />
        <Card fluid>
            <Card.Content>
                <Card.Header >Avaible budget: ~{ wallet.budget && rates ? calculateAvaible(): placeholder()}  {wallet.mainCurrency} </Card.Header>
                <Card.Description >Total budget: ~{ wallet.budget && rates ? calculateBudget(wallet) : placeholder()} {wallet.mainCurrency} </Card.Description>

                <Table basic='very' celled unstackable compact>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Currency</Table.HeaderCell>
                            <Table.HeaderCell>Budget</Table.HeaderCell>
                            <Table.HeaderCell>Spent</Table.HeaderCell>
                            <Table.HeaderCell>Left</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {loading &&  <Table.Row>
                        <Table.Cell>
                            <Placeholder>
                             <Placeholder.Line length='short' />
                            </Placeholder>
                         </Table.Cell>
                         </Table.Row>}
                        {wallet.budget && wallet.budget.map(element => {
                            return  <Table.Row key={element.currency}>
                                        <Table.Cell>
                                            {element.currency}
                                       </Table.Cell>
                                       <Table.Cell>
                                            {element.amount}
                                       </Table.Cell>
                                       <Table.Cell>
                                           {spent && spent.spent[element.currency]
                                                ? `${spent.spent[element.currency]} ${element.currency === wallet.mainCurrency ? '' : `(~${parseFloat(spent.spentCalculated[element.currency]).toFixed(2)}${wallet.mainCurrency})`} ` 
                                                : 'n/a' 
                                                }
                                       </Table.Cell>
                                       <Table.Cell>
                                           {spent && spent.spent[element.currency]
                                                ? `${element.amount - spent.spent[element.currency]} ` 
                                                : element.amount
                                                }
                                       </Table.Cell>
                                     
                                  </Table.Row>
                        })}
                       </Table.Body>
                </Table>  
                <AddMoney wallet={wallet}/>
            </Card.Content>
        </Card>
  </>
}