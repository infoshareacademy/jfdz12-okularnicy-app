import React from 'react'
import ReactMinimalPieChart from 'react-minimal-pie-chart';


class Chart extends React.Component {
    render() {
      return (
        <div className="chart-box">
            <ReactMinimalPieChart
              animate={false}
              animationDuration={500}
              animationEasing="ease-out"
              cx={50}
              cy={50}
              data={[
                {
                  color: '#E38627',
                  value: 82
                }
              ]}
              label
              labelPosition={0}
              labelStyle={{
                fontFamily: 'sans-serif',
                fontSize: '25px'
              }}
              lengthAngle={360}
              lineWidth={20}
              onClick={undefined}
              onMouseOut={undefined}
              onMouseOver={undefined}
              paddingAngle={0}
              radius={50}
              rounded={false}
              startAngle={0}
              totalValue={100}
              style={{
                height: '300px'
              }}
              viewBoxSize={[
                100,
                100
              ]}
            />
        </div>
      );
    }
  }



export default Chart