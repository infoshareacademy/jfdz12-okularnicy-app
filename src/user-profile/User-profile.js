import React from 'react';
import { Icon, Button, Header, Image, Modal, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: [],
            isLoaded: false,
            open: false,
        };
    }

    handleclick = () => this.setState(prevState => ({ open: !prevState.open }))

    componentDidMount() {
        fetch('/user.json')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        userData: result[0],
                        isLoaded: true,

                    });
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    render() {
        const { error, isLoaded, open } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (<div>
                <Menu.Item
                    name='user'
                    onClick={this.handleclick}
                >
                    <Icon name='user circle' />
                    Your profile
            </Menu.Item>
                <Modal open={open} dimmer={"inverted"} >
                    <Modal.Header>User Panel <Button negative onClick={this.handleclick} compact floated='right'>Close</Button></Modal.Header>
                    <Modal.Content image>
                        <Image wrapped size='medium' src={this.state.userData.image} />
                        <Modal.Description >
                            <Header>Hello {this.state.userData.name}!</Header>
                            <p>{this.state.userData.description}</p>
                            <Button.Group vertical>
                                <Link to={'/user-list'}><Button icon labelPosition='left' primary onClick={this.handleclick} style={{ margin: "5px" }}><Icon fitted name='list' /> My list</Button></Link>
                                <Link to={'/dashboard'}><Button icon labelPosition='left' onClick={this.handleclick} style={{ margin: "5px" }}><Icon fitted name='chart pie' /> Dashboard</Button></Link>
                            </Button.Group>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
            )
        }
    }
}