import React from 'react'
import firebase from "firebase";
import { Login } from './LogIn';
export const MyContext = React.createContext(null);


export class AuthContext extends React.Component {
    state = {
        user: null,
        userList: [],
    }

    componentDidMount() {
        const authRef = firebase.auth().onAuthStateChanged(user => {
            this.setState({
                user
            })
        })

        this.setState({
            ref: authRef
        })
    }

    componentWillUnmount() {
        if (this.state.ref) {
            this.state.ref();
        }
    }

    addToList = (e) => {

        this.setState({
            userList: [...this.state.userList, e]
        }, () => firebase.database().ref('user-items/' + this.state.user.uid).set({
            list: [...this.state.userList]
        }))

    }

    removeFromList = (e) => {
        const userlist = [...this.state.userList]
        const index = this.state.userList.indexOf(e);
        if (index > -1) {
            userlist.splice(index, 1);
        }
        this.setState({
            userList: userlist

        }, () => firebase.database().ref('user-items/' + this.state.user.uid).set({
            list: [...this.state.userList]
        }))
    }
    render() {
        return this.state.user
            ? <MyContext.Provider value={{
                state: this.state,
                addToList: this.addToList,
                removeFromList: this.removeFromList,
            }}>
                {this.props.children}
            </MyContext.Provider>
            : <>
                <Login />

            </>
    }
}