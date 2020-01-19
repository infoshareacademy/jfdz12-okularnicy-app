import React from 'react';
import TableExampleCollapsing from './table';
import StatisticExample from './Statistic';
import TableExamplePadded from'./coments';
import { Grid, Image, Segment } from 'semantic-ui-react'
import ImageExampleLink from './image';
import Chart from './PieChart'



export default function Dashboard (){
    return (
        <div style={{
            backgroundColor: 'ff0007',
        }}>
        <Grid stackable columns={3} divided>
            <Grid.Row stretched>
                <Grid.Column textAlign={'center'}>
                <Segment>
                    <ImageExampleLink /> 
                </Segment>
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
                <Grid.Column textAlign={'left'}>
                <Segment><TableExampleCollapsing /></Segment>
                </Grid.Column>
            </Grid.Row>
            </Grid> 
            <Grid textAlign={'center'} columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Segment  >
                            <StatisticExample/>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid columns={1}>
                <Grid.Row stretched>
                    <Grid.Column textAlign={'center'}>
                        <Segment><TableExamplePadded style={{marginLeft: '50px'}} /></Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </div>
    )
}

