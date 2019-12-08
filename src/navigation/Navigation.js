import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'

export default class Navigation extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu compact icon='labeled' fluid widths={3} size='mini'>
        <Menu.Item
          name='list'
          active={activeItem === 'list'}
          onClick={this.handleItemClick}
        >
          <Icon name='list ul' />
          List
        </Menu.Item>

        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
          >
          <Icon name='home' />
          Homepage
        </Menu.Item>

        <Menu.Item
          name='user'
          active={activeItem === 'user'}
          onClick={this.handleItemClick}
        >
          <Icon name='user circle' />
          Your profile
        </Menu.Item>
      </Menu>
    )
  }
}
