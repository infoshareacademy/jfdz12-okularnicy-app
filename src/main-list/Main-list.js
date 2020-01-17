import React from 'react';
import { Button, Image, List, Segment, Loader, Dimmer, Form } from 'semantic-ui-react';
import { ItemSearchInput } from '../input/Input'
import "./Main-list.css"
import { Link } from 'react-router-dom';
import SelectExample from '../select/Select';
import RadioExampleRadioGroup from '../radio/Radio';
import { getItems } from '../api/items';

export default class MainList extends React.Component {
    state = {
        typeFilter: 'all',
        search: '',
        sortBy: 'name',
        items: [],
        loading: true,
        error: null
    }

    componentDidMount() {
        this.fetchItems()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const filtersChanged = prevState.typeFilter !== this.state.typeFilter;
        const searchChanged = prevState.search !== this.state.search;
        const sortByChanged = prevState.sortBy !== this.state.sortBy;
        if (
            (
                filtersChanged || searchChanged || sortByChanged
            ) && !this.state.isLoading
        ) {
            this.fetchItems();
        }
    }

    handleSearchChange = (e) => {
        this.setState({
            search: e.target.value.toLowerCase(),
        });
    }

    handleTypeChange = (e) => {
        console.log(this.typeFilter)
        this.setState({
            typeFilter: e.target.value,
        });
    }

    fetchItems() {
        this.setState({
            loading: true,
            error: '',
        }, () => {
            setTimeout(() => {
                getItems({
                    search: this.state.search,
                    filter: this.state.typeFilter,
                    sortBy: this.state.sortBy,
                })
                    .then(data => {
                        this.setState({
                            items: data,
                            loading: false,
                        });
                    })
                    .catch((error) => {
                        this.setState({
                            error: error.toString(),
                        });
                    });
            }, 1200);
        });
    }


    render() {
        if (this.state.loading) {
            return (
                <Segment>
                    <Dimmer active inverted>
                        <Loader size='large'>Loading</Loader>
                    </Dimmer>
                    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                </Segment>)
        }
        if (this.state.error) {
            return <h1>"An error occured"</h1>
        }
        return <>
            <h1> What you need ? ;)</h1>

            <Segment.Group horizontal className="filters">
                <Segment className="filter">
                    <ItemSearchInput
                        value={this.state.search}
                        onChange={this.handleSearchChange} />
                </Segment>
                <Segment className="filter">
                    <RadioExampleRadioGroup
                    />
                </Segment>
                <Segment className="filter">
                    <SelectExample
                        value={this.state.typeFilter}
                        onChange={this.handleTypeChange} />
                </Segment>
            </Segment.Group>

            <List divided>
                {
                    this.state.items.map(item => (
                        <List.Item key={item.id}>
                            <List.Content floated='right'>
                                <Button>Add</Button>
                            </List.Content>
                            <List.Content>
                                <Link to={{
                                    pathname: `/items/${item.id}`,
                                    state: {
                                        item
                                    }
                                }}>
                                    <List.Header>{item.img}      {item.name}</List.Header>
                                    <List.Description>{item.description}{String(item.type)}</List.Description>
                                </Link>
                            </List.Content>
                        </List.Item>
                    ))
                }
                <List.Item>
                    <Link to="/item-add">
                        <Button fluid>Missed?</Button>
                    </Link>
                </List.Item>
            </List>
        </>
    }
}