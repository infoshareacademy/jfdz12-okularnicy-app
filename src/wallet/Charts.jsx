import React from 'react'
import PieChart from "react-minimal-pie-chart"

const Charts = ({wallet, spent}) => {

    const objPpertySum = (obj) => {
        return Object.keys(obj).reduce((sum,key)=>sum+parseFloat(obj[key]||0),0);
    }
    
    const calculateSpent = () => {
        const sum = objPpertySum(spent.spentCalculated)   
        return parseFloat(sum).toFixed(2)
    }
    const chartData = [{
        
        color: "#E38627",
        title: "Spent",
        value: parseInt( calculateSpent())
        },
        {
        color: "#C13C37",
        title: "Remaining",
        value: wallet.budget[0].amount - spent.spentCalculated[wallet.mainCurrency]
        }
    ]   

    return <PieChart
    animate
    center={[50, 50]}
    data={chartData}
    label={(data) => `${parseFloat(data.data[data.dataIndex].percentage).toFixed(1)}% ${data.data[data.dataIndex].title}`}
    labelPosition={70}
    // lengthAngle={360}
    lineWidth={15}
    paddingAngle={0}
    radius={50}
    rounded
    startAngle={0}
    viewBoxSize={[130, 130]}
    labelStyle={{
        fontSize: "6px"      
      }}
       />
}

export default Charts