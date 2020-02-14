import React, { Component } from 'react'
import { Icon, Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import firebase from 'firebase'

export default class Navigation extends Component {
  state = {
    activeItem: '',
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleLogout = () => firebase.auth().signOut()

  render() {
    const { activeItem } = this.state

    return (
      <Menu icon='labeled' size='mini' fixed='top'>
        <Link to="/user-list">
          <Menu.Item
            name='list'
            active={activeItem === 'list'}
            onClick={this.handleItemClick}
          >
            <Icon name='list ul' />
            My list
        </Menu.Item>
        </Link> 
        <Link to="/">
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
            <Icon name='home' />
            Home
        </Menu.Item>
        </Link>

        <Menu.Menu position='right'>
          <Link to={'/userProfile'}>
            <Menu.Item
              name='user'
              onClick={this.handleclick}
            >
              <Icon name='user circle' />
              Your profile
            </Menu.Item>
          </Link>
          <Button onClick={this.handleLogout} content="Logout"/>
        </Menu.Menu>
      </Menu>

    )
  }
}
