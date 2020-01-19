import React from 'react'
export const MyContext = React.createContext(null);


export class AuthContext extends React.Component {
    state = {
        userList: [],
    }

    addToList = (e) => {
        this.setState({
            userList: [...this.state.userList, e]

        })

    }

    removeFromList = (e) => {
        const userlist = [...this.state.userList]
        const index = this.state.userList.indexOf(e);
        if (index > -1) {
            userlist.splice(index, 1);
        }
        this.setState({
            userList: userlist

        })
    }

    componentDidMount() {
        this.userData = JSON.parse(localStorage.getItem('userList'));

        if (localStorage.getItem('userList')) {
            this.setState({
                userList: this.userData,
            })
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('userList', JSON.stringify(nextState));
    }

    render() {
        return (
            <MyContext.Provider value={{
                state: this.state,
                addToList: this.addToList,
                removeFromList: this.removeFromList,
            }}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}