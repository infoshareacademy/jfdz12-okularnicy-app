import React from 'react';
import TableExampleCollapsing from './table';
import StatisticExample from './Statistic';
import TableExamplePadded from'./coments';
import { Grid, Segment } from 'semantic-ui-react'
import ImageExampleLink from './image';
import Chart from './PieChart'



export default function Dashboard (){
    return (
        <div>
        
            <Grid columns={3} divided>
            <Grid.Row stretched>
                <Grid.Column>
                <Segment style={{
                            margin: 'auto',
                            
                        }}><ImageExampleLink /> </Segment>
                </Grid.Column>
                <Grid.Column>
                <Segment>
                    <Chart/>
                    <h3 style={{
                        textAlign: 'center',
                        fontFamily: 'sans-serif',
                        color: '#E38627',
                        fontSize: '25px'}}>
                        Spakowane rzeczy
                    </h3>
                </Segment>
                </Grid.Column>
                <Grid.Column>
                <Segment><TableExampleCollapsing /></Segment>
                </Grid.Column>
            </Grid.Row>
            </Grid> 
            <Grid columns={1}>
                <Grid.Row stretched>
                    <Grid.Column>
                        <Segment ><StatisticExample 
                        style={{
                            display: 'flex',
                            justifyContent: 'end',
                        }}
                        />
                    </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid columns={1}>
                <Grid.Row stretched>
                    <Grid.Column>
                        <Segment><TableExamplePadded/></Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </div>
    )
}

