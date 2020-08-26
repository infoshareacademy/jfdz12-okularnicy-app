import axios from 'axios'

export const getRates = async (mainCurrency) => {
    try {
        const { data } = await axios.get(`https://api.exchangeratesapi.io/latest?base=${mainCurrency}`)
        // const currencies = Object.keys(data.rates).map(rate => {
        //     return { text: rate, value: rate, key: rate }
        // })
        return data
    }
    catch (error) {
        return error
    }
}

export const exchange = (amount, fromCurr, toCurr, rates) => {
    // // if (rates) {
    //     console.log("exchange()", {
    //         amount, fromCurr, toCurr, rates
    //     });
        return (amount/rates.rates[fromCurr])
    // }
    // else {
    //     const rates = await getRates(toCurr)
    //     return (amount/rates.rate[fromCurr])
    // }
}

