import React, { useContext } from 'react'
import { MyContext } from './Auth'
import { Login } from './LogIn'

 const AuthProtected = (props) => {

    const context = useContext(MyContext)

    return context.state.user ? { ...props.children } : <Login />
}

export default AuthProtected