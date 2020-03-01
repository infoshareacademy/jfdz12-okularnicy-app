import React, { useContext, useState } from 'react'
import { Icon, Menu, Button, Image, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import firebase from 'firebase'
import { MyContext } from '../auth/Auth';

const Navigation = () => {

  const [activeItem, setActiveItem] = useState("")
  const context = useContext(MyContext)

  const handleItemClick = (e, { name }) => setActiveItem(name)
  const handleLogout = () => context.logout()

  return (
    <Menu icon='labeled' size='mini' fixed='top'>
      <Link to="/user-list">
        <Menu.Item
          name='list'
          active={activeItem === 'list'}
          onClick={handleItemClick}
        >
          <Icon name='list ul' />
          {context.state.userList.length > 0 && <Label color='teal' corner size="mini">
            {context.state.userList.length}
          </Label>}
          My list
        </Menu.Item>
      </Link>
      <Link to="/">
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
        >
          <Icon name='home' />
          Home
        </Menu.Item>
      </Link>

      {context.state.user && <Menu.Menu position='right'>
        <Link to={'/userProfile'}>
          <Menu.Item
            name='user'
            active={activeItem === 'user'}
            onClick={handleItemClick}
          >
            <Image
              size="mini"
              avatar
              src={context.state.user.photoURL || '/assets/userPlaceholder.jpg'} />
          </Menu.Item>

        </Link>
        <Menu.Item>
          <Button onClick={handleLogout} content="Logout" />
        </Menu.Item>
      </Menu.Menu>}
    </Menu>

  )
}

export default Navigation