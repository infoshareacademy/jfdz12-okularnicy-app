import React from 'react'
import firebase from "firebase";
export const MyContext = React.createContext(null);


export class AuthContext extends React.Component {
    state = {
        user: '',
        userList: [],
    }

    componentDidMount() {
        const authRef = firebase.auth().onAuthStateChanged(user => {
            this.setState({
                user
            }, () => this.fetchList())
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

    fetchList = () => {
        if (this.state.user) { 
        firebase.database().ref('user-items/' + this.state.user.uid + '/list')
            .on('value', (snapshot) => {
                let list = snapshot.val()
                list ? this.setState({ userList: list }) : this.setState({ userList: [] })
            })
    }
}

addToList = (e) => {
    const addedItem = e
    addedItem.done = false
    this.setState({
        userList: [...this.state.userList, addedItem]
    }, () => firebase.database().ref('user-items/' + this.state.user.uid).set({
        list: [...this.state.userList]
    }))
}

removeFromList = (e) => {
    const userlist = [...this.state.userList]
    const index = this.state.userList.map(item => item.id).indexOf(e);
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
    return <MyContext.Provider value={{
        state: this.state,
        addToList: this.addToList,
        removeFromList: this.removeFromList,
    }}>
        {this.props.children}
    </MyContext.Provider>
}
}