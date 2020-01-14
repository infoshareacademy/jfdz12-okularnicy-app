import React, { Component } from 'react'
import { Icon, Menu} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import UserProfile from '../user-profile/User-profile';

export default class Navigation extends Component {
  state = {
    activeItem: '',
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (

      <Menu icon='labeled' widths={3} size='mini' fixed='top'>
        <Link to="/user-list">
          <Menu.Item
            name='list'
            active={activeItem === 'list'}
          // onClick={this.handleItemClick}
          >
            <Icon name='list ul' />
            My list
        </Menu.Item>
        </Link>
        <Link to="/">
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
          // onClick={this.handleItemClick}
          >
            <Icon name='home' />
            Homepage
        </Menu.Item>
        </Link>
          <UserProfile/>
      </Menu>

    )
  }
}
