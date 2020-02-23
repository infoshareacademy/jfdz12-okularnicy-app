import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Image, List, Segment, Loader, Dimmer } from 'semantic-ui-react';
import SelectType from '../select/Select';
import { ItemSearchInput } from '../input/Input'
import { RadioSelect } from '../radio/Radio';
import { AddToList } from '../user-list/AddToList';
import "./Main-list.css"


function MainList() {
    const [items, setItems] = useState([]);
    const [type, setType] = useState("");
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [weather, setWeather] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    const handleChange = ({ target }) => {
        setSearch(target.value);
    };
    const handleTypeChange = (type) => {
        setType(type);
    };
    const handleRadioChange = (weather) => {
        setWeather(weather)
    }

    useEffect(() => {
        fetch('https://okularnicy-app.firebaseio.com/items.json')
            .then(response => response.json())
            .then(data => {
                if (data) {
                    const keys = Object.keys(data);
                    const formattedData = keys.map(key => {
                        return {
                            id: key,
                            ...data[key]
                        }
                    });
                    setItems(formattedData)
                    setLoading(false)

                }
            })

            .catch(err => setError(err))
    }, [])

    const list = (
        items
            .filter(item => {
                return weather==='all' ? item : item.weather.includes(weather)
            })
            .filter(function (item) {
                // return type.length > 0 ? type.includes(item.typeId) : item //for multiselect
                return type ? item.typeId === type : item //for single select 
            })
            .filter(item => {
                const itemName = item.name.toLowerCase();
                return (
                    itemName.includes(search)
                );
            })
            .map(item => (
                <List.Item key={item.id}>
                    <List.Content floated='right'>
                        <AddToList item={item} iconic={true} desc/>
                    </List.Content>
                    <List.Content>
                        <Link to={{
                            pathname: `/items/${item.id}`,
                            state: {
                                item
                            }
                        }}>
                            <List.Header>{item.img}{item.name}</List.Header>
                            <List.Description>{item.description}</List.Description>
                        </Link>
                    </List.Content>
                </List.Item>
            ))
    )

    if (loading) {
        return (
            <Segment>
                <Dimmer active inverted>
                    <Loader size='large'>Loading</Loader>
                </Dimmer>
                <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
            </Segment>)
    }
    if (error) {
        return <h1>"An error occured"</h1>
    }
    return <>
        <h1> What you need ? ;)</h1>
        <Segment.Group horizontal className="filters">
            <Segment className="filter">
                <ItemSearchInput
                    value={search}
                    onChange={handleChange} />
            </Segment>
            <Segment className="filter">
                <RadioSelect
                    value={weather}
                    onChangeRadio={handleRadioChange}
                />
            </Segment>
            <Segment className="filter">
                <SelectType
                    value={type}
                    handleChangeType={handleTypeChange}
                />
            </Segment>
        </Segment.Group>
        <List divided>
            {list}
            <List.Item>
                <Link to="/item-add">
                    <Button fluid>Missing something? Add new item</Button>
                </Link>
            </List.Item>
        </List>
    </>
}
export default MainList;

