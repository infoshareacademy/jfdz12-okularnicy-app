import React from 'react';
import {Tab} from 'semantic-ui-react'


import {SignIn} from './SignIn'
import {SignUp} from './SignUp'

export function Login() {
    const panes = [
        { menuItem: 'Login',
        render: () => <Tab.Pane content={<SignIn/>} /> },
        { menuItem: 'Register',
        render: () => <Tab.Pane content={<SignUp/>} /> }
      ]
      
    return <Tab panes={panes} />
}



